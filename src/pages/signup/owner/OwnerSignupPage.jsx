import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '../../../components/common/Container';
import { NextButton } from '../../../components/common/NextButton';
import { useOwnerSignupFlow } from '../../../query/signupQueries';
import { validateStep1, validateStep2, validateStep4 } from './validateSteps';
import StepBasicInfo from './steps/StepBasicInfo/StepBasicInfo';
import StepOperatingHours from './steps/StepOperatingHours/StepOperatingHours';
import StepMenuSetup from './steps/StepMenuSetup/StepMenuSetup';
import * as S from './OwnerSignupPage.styles';
import backIcon from '@/assets/icons/back-icon.svg';

const STEPS = [
  { label: '기본\n정보' },
  { label: '운영시간\n설정' },
  { label: '메뉴\n관리' },
];
const TOTAL_STEPS = STEPS.length;
const EMPTY_HOLIDAYS = { publicHolidayOff: false, holidays: [] };

function OwnerSignupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignupRequired = location.state?.isSignupRequired;

  useEffect(() => {
    //비인가된 접근 시 홈으로
    if (!isSignupRequired) navigate('/');
  }, [isSignupRequired, navigate]);

  const [step, setStep] = useState(1);

  // 각 단계의 입력값을 부모에서 관리(뒤로가기 시 입력값 유지)
  const [formData, setFormData] = useState({
    step1: { name: '', phoneNumber: '', businessName: '', address: '' },
    step2: {
      slotInterval: '30',
      scheduleType: 'DAILY',
      times: [{ start: '09:00', end: '20:00' }],
      weekdayTimes: [{ start: '09:00', end: '18:00' }],
      weekendTimes: [{ start: '10:00', end: '16:00' }],
      dayTimes: {},
    },
    step3: {
      items: [],
    },
  });

  const ownerSignup = useOwnerSignupFlow();

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));

  // --- Step별 onChange ---
  const handleStep1Change = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, step1: { ...prev.step1, [name]: value } }));
  };

  const handleStep2Change = (data) => {
    setFormData((prev) => ({ ...prev, step2: data }));
  };

  const handleStep3Change = (data) => {
    setFormData((prev) => ({ ...prev, step3: data }));
  };

  // 다음 단계 or 최종 제출
  const handleNextClick = async () => {
    if (step === 1 && !validateStep1(formData.step1)) return;
    if (step === 2 && !validateStep2(formData.step2)) return;
    if (step === 3 && !validateStep4(formData.step3)) return;

    if (step < TOTAL_STEPS) {
      next();
      return;
    }

    // scheduleType에 따라 관련 시간 필드만 포함
    const { slotInterval, scheduleType, times, weekdayTimes, weekendTimes, dayTimes } =
      formData.step2;
    const schedulePayload =
      scheduleType === 'DAILY'
        ? { slotInterval, scheduleType, times }
        : scheduleType === 'WEEKDAY_WEEKEND'
          ? { slotInterval, scheduleType, weekdayTimes, weekendTimes }
          : { slotInterval, scheduleType, dayTimes };

    try {
      await ownerSignup.submit(
        formData.step1,
        schedulePayload,
        EMPTY_HOLIDAYS,
        formData.step3.items
      );
      navigate('/');
    } catch {
      // submit 내부에서 alert + rollback 처리 완료
    }
  };

  const isLastStep = step === TOTAL_STEPS;
  const { isPending } = ownerSignup;

  return (
    <Container $start>
      <S.PageFrame>
        <S.Header>
          <S.BackButton
            type="button"
            aria-label="뒤로가기"
            onClick={() => (step === 1 ? navigate('/') : setStep((prev) => prev - 1))}
          >
            <img src={backIcon} alt="" />
          </S.BackButton>
        </S.Header>

        <S.StepNav>
          {STEPS.map((s, i) => (
            <React.Fragment key={s.label}>
              <S.StepTab
                type="button"
                $active={step === i + 1}
                $clickable={i + 1 < step}
                onClick={() => i + 1 < step && setStep(i + 1)}
              >
                {s.label}
              </S.StepTab>
              {i < STEPS.length - 1 && <S.StepDivider aria-hidden="true">›</S.StepDivider>}
            </React.Fragment>
          ))}
        </S.StepNav>

        <S.Content>
          {step === 1 && <StepBasicInfo initialData={formData.step1} onChange={handleStep1Change} />}
          {step === 2 && (
            <StepOperatingHours initialData={formData.step2} onChange={handleStep2Change} />
          )}
          {step === 3 && <StepMenuSetup initialData={formData.step3} onChange={handleStep3Change} />}
        </S.Content>

        <S.BottomArea>
          <NextButton disabled={isPending} onClick={handleNextClick}>
            {isPending ? '처리중...' : isLastStep ? '가입하기' : '다음'}
          </NextButton>
        </S.BottomArea>
      </S.PageFrame>
    </Container>
  );
}

export default OwnerSignupPage;
