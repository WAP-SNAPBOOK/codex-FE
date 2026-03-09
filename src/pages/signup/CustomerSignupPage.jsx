import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignupTitle } from '../../components/title/SignupTitle';
import { AuthInput } from '../../components/auth/AuthInput';
import Container from '../../components/common/Container';
import { NextButton } from '../../components/common/NextButton';
import { useSignupCustomer } from '../../query/signupQueries';
import { validateMobile010 } from '../../utils/phoneNumber';

// CUSTOMER 전용 회원가입 페이지
function CustomerSignupPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const signup = useSignupCustomer();

  // 입력폼 상태
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  });

  const isSignupRequired = location.state?.isSignupRequired;

  // 비인가된 접근 시 홈으로
  useEffect(() => {
    if (!isSignupRequired) navigate('/');
  }, [navigate]);

  //회원가입 입력 폼 헨들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //회원가입 입력폼 제출 헨들러
  const onSubmit = (e) => {
    e.preventDefault();

    const { name, phoneNumber } = formData;
    if (!name || !phoneNumber) {
      alert('이름과 전화번호를 모두 입력해주세요.');
      return;
    }

    // 전화번호 유효성 검사
    const { valid, reason } = validateMobile010(phoneNumber);

    if (!valid) {
      if (reason === 'length') {
        alert('전화번호는 숫자만 11자리여야 합니다.');
      } else if (reason === 'format') {
        alert('정확한 휴대폰 번호(010으로 시작)를 입력해주세요.');
      }
      return;
    }

    //회원가입 폼 전달
    signup.mutate(formData);
  };

  return (
    <Container>
      <div className="w-[305px] h-[530px] flex flex-col items-center">
        <SignupTitle>고객 회원가입</SignupTitle>

        <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
          <label className="w-full block mb-[15px]">
            <AuthInput
              name="name"
              value={formData.name}
              placeholder="이름"
              maxLength={5}
              onChange={handleChange}
            />
          </label>

          <label className="w-full block mb-[15px]">
            <AuthInput
              name="phoneNumber"
              value={formData.phoneNumber}
              placeholder="전화번호"
              onChange={handleChange}
            />
          </label>

          <NextButton type="submit" disabled={signup.isPending} className="mt-[30px]">
            {signup.isPending ? '가입중...' : '가입하기'}
          </NextButton>

          {signup.isError && <p style={{ color: 'red' }}>가입 실패: {signup.error?.message}</p>}
        </form>
      </div>
    </Container>
  );
}

export default CustomerSignupPage;
