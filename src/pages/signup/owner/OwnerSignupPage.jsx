import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupTitle } from '../../../components/title/SignupTitle';
import Container from '../../../components/common/Container';
import { NextButton } from '../../../components/common/NextButton';
import { useSignupOwner } from '../../../query/signupQueries';
import { validateMobile010 } from '../../../utils/phoneNumber';
import StepBasicInfo from './steps/StepBasicInfo/StepBasicInfo';
import * as S from './OwnerSignupPage.styles';

// 추후 단계 추가 시 STEPS 배열과 아래 step 렌더링 블록, validateStep, payload 조합을 함께 업데이트
const STEPS = [
  { label: '기본\n정보' },
  { label: '운영시간\n설정' },
  { label: '휴무일\n설정' },
  { label: '메뉴\n추가' },
];
const TOTAL_STEPS = STEPS.length;

function OwnerSignupPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // 각 단계의 입력값을 부모에서 관리 → 뒤로가기 시 입력값 유지
  const [formData, setFormData] = useState({
    step1: { name: '', phoneNumber: '', businessName: '', address: '' },
    // step2: { ... }, // 추후 단계 추가 시 확장
  });

  const signup = useSignupOwner();

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  // --- Step별 onChange ---
  const handleStep1Change = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, step1: { ...prev.step1, [name]: value } }));
  };
  // const handleStep2Change = (e) => { ... }; // 추후 추가

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
  const handleNextClick = () => {
    if (!validateStep(step)) return;

    if (step < TOTAL_STEPS) {
      next();
      return;
    }

    // 마지막 단계: 모든 step 데이터를 조합해서 API 호출
    const payload = {
      ...formData.step1,
      // ...formData.step2, // 추후 단계 추가 시 확장
    };

    signup.mutate(payload, {
      onSuccess: () => {
        // TODO: 모든 단계 완료 후 이동할 경로로 변경
        navigate('/');
      },
    });
  };

  const isLastStep = step === TOTAL_STEPS;

  return (
    <Container>
      <div className="w-[305px] flex flex-col items-center">
        {/* 단계 진행 바 */}
        <S.StepBar>
          {STEPS.map((s, i) => (
            <S.StepItemWrapper
              key={i}
              $first={i === 0}
              $last={i === STEPS.length - 1}
              $zIndex={STEPS.length - i}
            >
              <S.StepItem
                $active={step === i + 1}
                $last={i === STEPS.length - 1}
              >
                {s.label}
              </S.StepItem>
            </S.StepItemWrapper>
          ))}
        </S.StepBar>

        {step === 1 && <StepBasicInfo initialData={formData.step1} onChange={handleStep1Change} />}
        {/* Step 2 이후: 추후 추가 */}
        {/* {step === 2 && <StepXxx initialData={formData.step2} onChange={handleStep2Change} />} */}

        <NextButton disabled={signup.isPending} onClick={handleNextClick} className="mt-[30px]">
          {signup.isPending ? '처리중...' : isLastStep ? '가입하기' : '다음 단계로'}
        </NextButton>

        {signup.isError && <p style={{ color: 'red' }}>가입 실패: {signup.error?.message}</p>}
      </div>
    </Container>
  );
}

export default OwnerSignupPage;
