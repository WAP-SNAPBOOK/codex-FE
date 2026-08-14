import styled from 'styled-components';
import theme from '../../styles/theme';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: min(100%, 480px);
  background: white;
`;

export const HeaderBar = styled.header`
  padding: 38px 20px 24px;
`;

export const Header = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

export const Description = styled.p`
  margin: 7px 0 0;
  color: #777b84;
  font-size: 14px;
  line-height: 1.5;
`;

export const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px calc(108px + env(safe-area-inset-bottom));

  @media (max-width: 360px) {
    padding-right: 16px;
    padding-left: 16px;
  }
`;

export const StateBox = styled.div`
  display: flex;
  min-height: 55vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 24px calc(108px + env(safe-area-inset-bottom));
  box-sizing: border-box;
  text-align: center;
`;

export const StateIcon = styled.span`
  display: flex;
  width: 54px;
  height: 54px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border-radius: 18px;
  background: ${({ $error }) => ($error ? '#fff0f0' : 'rgba(240, 128, 128, 0.12)')};
  color: ${({ $error }) => ($error ? '#c94a4a' : theme.colors.primary)};
  font-size: 20px;
  font-weight: 800;
`;

export const StateTitle = styled.strong`
  color: #292b30;
  font-size: 16px;
  font-weight: 800;
`;

export const StateDescription = styled.p`
  max-width: 280px;
  margin: 7px 0 0;
  color: #8a8d95;
  font-size: 13px;
  line-height: 1.55;
`;

export const RetryButton = styled.button`
  min-height: 42px;
  margin-top: 18px;
  padding: 0 18px;
  border: 0;
  border-radius: 12px;
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;
