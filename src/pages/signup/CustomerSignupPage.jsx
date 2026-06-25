import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../../components/common/Container';
import { NextButton } from '../../components/common/NextButton';
import { useSignupCustomer } from '../../query/signupQueries';
import { validateMobile010 } from '../../utils/phoneNumber';
import * as S from './CustomerSignupPage.styles';

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
  }, [isSignupRequired, navigate]);

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
    <Container $start>
      <S.PageFrame>
        <S.TitleSection>
          <S.Title>고객 회원가입</S.Title>
        </S.TitleSection>

        <S.Form onSubmit={onSubmit}>
          <S.Fields>
            <S.Field>
              이름
              <S.Input
                name="name"
                value={formData.name}
                placeholder="이름을 입력해 주세요."
                maxLength={5}
                onChange={handleChange}
              />
            </S.Field>

            <S.Field>
              전화번호
              <S.Input
                name="phoneNumber"
                value={formData.phoneNumber}
                placeholder="전화번호를 입력해 주세요."
                onChange={handleChange}
              />
            </S.Field>
          </S.Fields>

          <S.BottomArea>
            <NextButton type="submit" disabled={signup.isPending}>
              {signup.isPending ? '가입중...' : '가입하기'}
            </NextButton>

            {signup.isError ? <S.ErrorText>가입 실패: {signup.error?.message}</S.ErrorText> : null}
          </S.BottomArea>
        </S.Form>
      </S.PageFrame>
    </Container>
  );
}

export default CustomerSignupPage;
