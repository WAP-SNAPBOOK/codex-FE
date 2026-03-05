import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '../../../components/common/Container';
import { NextButton } from '../../../components/common/NextButton';
import { useOwnerSignupFlow } from '../../../query/signupQueries';
import { validateMobile010 } from '../../../utils/phoneNumber';
import StepBasicInfo from './steps/StepBasicInfo/StepBasicInfo';
import StepOperatingHours from './steps/StepOperatingHours/StepOperatingHours';
import StepHolidays from './steps/StepHolidays/StepHolidays';
import StepMenuSetup from './steps/StepMenuSetup/StepMenuSetup';
import * as S from './OwnerSignupPage.styles';

// 추후 단계 추가 시 STEPS 배열과 아래 step 렌더링 블록, validateStep, payload 조합을 함께 업데이트
const STEPS = [
  { label: '기본\n정보' },
  { label: '운영시간\n설정' },
  { label: '휴무일\n설정' },
  { label: '메뉴\n추가' },
];
const TOTAL_STEPS = STEPS.length;
const SUBMIT_AT_STEP = TOTAL_STEPS;

function OwnerSignupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSignupRequired = location.state?.isSignupRequired;

  useEffect(() => {
    //비인가된 접근 시 홈으로
    if (!isSignupRequired) navigate('/');
  }, [navigate]);

  const [step, setStep] = useState(1);

  // 각 단계의 입력값을 부모에서 관리 → 뒤로가기 시 입력값 유지
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
      publicHolidayOff: false,
      holidays: [],
    },
    step4: {
      items: [],
    },
  });

  const ownerSignup = useOwnerSignupFlow();

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

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

  const handleStep4Change = (data) => {
    setFormData((prev) => ({ ...prev, step4: data }));
  };

  // --- Step별 유효성 검사 ---
  const validateStep = (stepNum) => {
    if (stepNum === 1) {
      const { name, phoneNumber, businessName, address } = formData.step1;
      if (!name || !phoneNumber || !businessName || !address) {
        alert('모든 항목을 입력해주세요.');
        return false;
      }
      const { valid, reason } = validateMobile010(phoneNumber);
      if (!valid) {
        alert(
          reason === 'length'
            ? '전화번호는 숫자만 11자리여야 합니다.'
            : '정확한 휴대폰 번호(010으로 시작)를 입력해주세요.'
        );
        return false;
      }
    }
    // if (stepNum === 2) { ... } // 추후 추가
    return true;
  };

  // 다음 단계 or 최종 제출
  const handleNextClick = async () => {
    if (!validateStep(step)) return;

    if (step < SUBMIT_AT_STEP) {
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
        formData.step3,
        formData.step4.items
      );
      navigate('/');
    } catch {
      // 에러는 ownerSignup.isError로 표시
    }
  };

  const isLastStep = step === SUBMIT_AT_STEP;
  const { isPending } = ownerSignup;

  return (
    <Container $start>
      <div className="w-[305px] flex flex-col items-center pt-[40px] flex-1 pb-[40px]">
        {/* 단계 진행 바 */}
        <S.StepBar>
          {STEPS.map((s, i) => (
            <S.StepItemWrapper
              key={i}
              $first={i === 0}
              $last={i === STEPS.length - 1}
              $zIndex={STEPS.length - i}
            >
              <S.StepItem $active={step === i + 1} $last={i === STEPS.length - 1}>
                {s.label}
              </S.StepItem>
            </S.StepItemWrapper>
          ))}
        </S.StepBar>

        {step === 1 && <StepBasicInfo initialData={formData.step1} onChange={handleStep1Change} />}
        {step === 2 && (
          <StepOperatingHours initialData={formData.step2} onChange={handleStep2Change} />
        )}
        {step === 3 && <StepHolidays initialData={formData.step3} onChange={handleStep3Change} />}
        {step === 4 && <StepMenuSetup initialData={formData.step4} onChange={handleStep4Change} />}

        <NextButton disabled={isPending} onClick={handleNextClick} className="mt-auto">
          {isPending ? '처리중...' : isLastStep ? '가입하기' : '다음 단계로'}
        </NextButton>
      </div>
    </Container>
  );
}

export default OwnerSignupPage;
