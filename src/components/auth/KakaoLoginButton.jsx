import React from 'react';
import { kakaoAuthService } from '../../api/services/kakaoAuthService';
import { BaseButton } from '../common/Button';
import styled from 'styled-components';
import theme from '../../styles/theme';
import kakaoIcon from '../../assets/icons/kakao-icon.svg';

const KakaoButton = styled(BaseButton).attrs({
  type: 'button',
  $align: 'flex-start',
  $gap: '50px',
  $height: '48px',
})`
  background: ${theme.colors.kakakoYellow};
  color: ${theme.colors.kakaoTextBlack};
  border-radius: ${theme.radius.md};

  width: min(100%, 320px);

  /* 호버 시 살짝 더 진하게 */
  &:hover {
    background: #fdd835;
  }
`;

function KakaoLoginButton({ slug }) {
  //카카오 로그인 URL변경
  const handleLogin = () => {
    // slug(매장 식별코드) 있으면 카카오 인가 URL 뒤에 붙여 전달
    window.location.href = kakaoAuthService.getAuthUrl(slug);
  };

  return (
    <>
      <KakaoButton onClick={handleLogin}>
        <img src={kakaoIcon} alt="" />
        <span>카카오로 계속하기</span>
      </KakaoButton>
    </>
  );
}

export default KakaoLoginButton;
