import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SignupTitle } from '../../components/title/SignupTitle';
import { AuthInput } from '../../components/auth/AuthInput';
import Container from '../../components/common/Container';
import { NextButton } from '../../components/common/NextButton';
import { useRegisterShopInfo } from '../../query/signupQueries';
import { notify } from '../../utils/appFeedback';

function ShopInfoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignupRequired = location.state?.isSignupRequired;

  // 점주 가게정보 추가 회원가입 훅
  const registerShop = useRegisterShopInfo();

  // 입력폼 상태
  const [formData, setFormData] = useState({
    businessName: '',
    address: '',
    businessNumber: '',
  });

  ///비인가된 접근 시 홈으로
  useEffect(() => {
    if (!isSignupRequired) navigate('/');
  }, [navigate]);

  //가게 정보 입력 폼 헨들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //가게 정보 입력 폼 제출 헨들러
  const onSubmit = (e) => {
    e.preventDefault();

    const { businessName, address, businessNumber } = formData;
    if (!businessName || !address || !businessNumber) {
      notify('가게 정보를 모두 입력해주세요.');
      return;
    }

    registerShop.mutate(formData);
  };

  return (
    <Container>
      <div className="w-[305px] h-[530px] flex flex-col items-center">
        <SignupTitle>가게 정보 등록</SignupTitle>

        <form onSubmit={onSubmit} className="w-full flex flex-col items-center">
          <label className="w-full block mb-[15px]">
            <AuthInput
              name="businessName"
              value={formData.name}
              placeholder="상호명"
              onChange={handleChange}
            />
          </label>

          <label className="w-full block mb-[15px]">
            <AuthInput
              name="address"
              value={formData.phoneNumber}
              placeholder="주소"
              onChange={handleChange}
            />
          </label>

          <label className="w-full block mb-[15px]">
            <AuthInput
              name="businessNumber"
              value={formData.phoneNumber}
              placeholder="사업장 전화번호"
              onChange={handleChange}
            />
          </label>

          <NextButton type="submit" disabled={registerShop.isPending} className="mt-[30px]">
            {registerShop.isPending ? '가입중...' : '가입하기'}
          </NextButton>

          {registerShop.isError && (
            <p style={{ color: 'red' }}>가입 실패: {registerShop.error?.message}</p>
          )}
        </form>
      </div>
    </Container>
  );
}

export default ShopInfoPage;
