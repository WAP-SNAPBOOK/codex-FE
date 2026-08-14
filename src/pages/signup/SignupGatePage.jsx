// pages/SignupGate.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Container from '../../components/common/Container';
import { SignupButton } from '../../components/auth/SignupButton';
import { NextButton } from '../../components/common/NextButton';
import { SignupTitle } from '../../components/title/SignupTitle';
import { notify } from '../../utils/appFeedback';

//회원가입 분기 페이지
function SignupGatePage() {
  const [selectedRole, setSelectedRole] = useState(null); //회원 유형
  const navigate = useNavigate();
  const location = useLocation();

  const isSignupRequired = location.state?.isSignupRequired;
  const slug = new URLSearchParams(location.search).get('slug');
  const handleNext = () => {
    if (!selectedRole) return notify('회원 유형을 선택해주세요');
    // slug 값이 있을 땐 고객만 허용
    if (slug && selectedRole !== 'customer') {
      return notify('링크를 통한 회원가입은 고객만 가능합니다.');
    }

    //회원 분기에 따라 분기
    //slug 값을 다음 페이지로 그대로 전달
    navigate(`/signup/${selectedRole}?slug=${slug || ''}`, {
      state: { isSignupRequired: true },
    });
  };

  useEffect(() => {
    if (!isSignupRequired) {
      //비인가된 접근 시 홈으로
      navigate('/');
    }
  }, [navigate]);

  return (
    <Container>
      <div className="w-[305px] h-[530px] flex flex-col items-center">
        <SignupTitle>회원가입</SignupTitle>
        <div className="w-full flex justify-between mb-[300px]">
          <SignupButton.Customer
            $isSelected={selectedRole === 'customer'}
            onClick={() => setSelectedRole('customer')}
          >
            고객
          </SignupButton.Customer>
          <SignupButton.Owner
            $isSelected={selectedRole === 'owner'}
            onClick={() => setSelectedRole('owner')}
          >
            점주
          </SignupButton.Owner>
        </div>
        <NextButton onClick={handleNext}>다음</NextButton>
      </div>
    </Container>
  );
}

export default SignupGatePage;
