import styled, { keyframes } from 'styled-components';
import { BaseButton } from '../../components/common/Button';
import { BaseInput } from '../../components/common/BaseInput';
import theme from '../../styles/theme';

export const PageWrapper = styled.div`
  display: flex;
  width: min(100%, ${theme.layout.mobileMaxWidth});
  height: 100vh;
  height: 100dvh;
  margin: 0 auto;
  flex-direction: column;
  overflow: hidden;
  background: ${theme.colors.surface.subtle};
`;

export const Header = styled.header`
  position: relative;
  z-index: 10;
  display: grid;
  min-height: 68px;
  grid-template-columns: 64px minmax(0, 1fr) 64px;
  align-items: center;
  padding: calc(8px + env(safe-area-inset-top)) 12px 8px;
  border-bottom: 1px solid ${theme.colors.border.subtle};
  background: ${theme.colors.surface.DEFAULT};
`;

export const BackButton = styled(BaseButton).attrs({
  $height: '40px',
  $radius: '12px',
  $padding: '0px',
})`
  width: 40px;
  background: transparent;

  img {
    width: 22px;
    height: 22px;
  }
`;

export const RoomHeading = styled.div`
  min-width: 0;
  text-align: center;
`;

export const RoomTitle = styled.h1`
  margin: 0;
  overflow: hidden;
  color: ${theme.colors.text.primary};
  font-size: 16px;
  font-weight: 800;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RoomDescription = styled.span`
  display: block;
  margin-top: 3px;
  color: ${theme.colors.text.tertiary};
  font-size: 10px;
  font-weight: 600;
`;

export const BookButton = styled(BaseButton).attrs({
  $height: '36px',
  $radius: '12px',
  $padding: '0 10px',
})`
  justify-self: end;
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  font-size: 12px;
  font-weight: 800;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const HeaderSpacer = styled.span`
  width: 40px;
  justify-self: end;
`;

export const Messages = styled.main`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 18px 16px 20px;
  background: ${theme.colors.surface.subtle};
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.35; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1); }
`;

export const RoomState = styled.div`
  display: flex;
  min-height: 100%;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 24px;
  text-align: center;

  strong {
    color: ${theme.colors.text.primary};
    font-size: 15px;
    font-weight: 800;
  }

  span {
    max-width: 260px;
    margin-top: 7px;
    color: ${theme.colors.text.tertiary};
    font-size: 12px;
    line-height: 1.5;
  }
`;

export const LoadingDot = styled.span`
  width: 12px;
  height: 12px;
  margin: 0 0 14px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  animation: ${pulse} 1s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const RetryButton = styled.button`
  min-height: 40px;
  margin-top: 16px;
  padding: 0 16px;
  border: 0;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
`;

export const InputBar = styled.footer`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  padding: 10px 14px calc(10px + env(safe-area-inset-bottom));
  border-top: 1px solid ${theme.colors.border.subtle};
  background: ${theme.colors.surface.DEFAULT};
`;

export const ChatInput = styled(BaseInput).attrs({
  $fontSize: '14px',
  $border: `1px solid ${theme.colors.border.DEFAULT}`,
  $focusStyle: `border-color: ${theme.colors.highlight.DEFAULT}`,
  $height: '42px',
  $radius: '21px',
  $bg: theme.colors.surface.subtle,
})`
  min-width: 0;
  flex: 1;
  padding: 0 16px;
  color: ${theme.colors.text.primary};

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }
`;

export const GuideBarSlot = styled.div`
  position: fixed;
  bottom: calc(78px + env(safe-area-inset-bottom));
  left: 50%;
  z-index: 20;
  width: min(calc(100% - 24px), 456px);
  transform: translateX(-50%);
`;
