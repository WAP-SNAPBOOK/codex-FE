import styled from 'styled-components';
import theme from '../../styles/theme';
import { PageContent, PageShell } from '../../components/common/PageLayout';
import { CardSurface, GroupedSurface } from '../../components/common/Surface';

export const PageWrapper = styled(PageShell)``;

export const Content = styled(PageContent)`
  padding-top: 20px;
`;

export const ProfileSection = styled.section`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 4px 28px;
  border-bottom: 1px solid #f0f1f3;
`;

export const Avatar = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 20px;
  background: rgba(240, 128, 128, 0.12);
  color: ${theme.colors.primary};
  font-size: 24px;
  font-weight: 800;
`;

export const ProfileInfo = styled.div`
  min-width: 0;
`;

export const ProfileHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

export const Name = styled.h2`
  margin: 0;
  overflow: hidden;
  color: ${theme.colors.black.DEFAULT};
  font-size: 22px;
  font-weight: 800;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RoleBadge = styled.span`
  flex: 0 0 auto;
  padding: 4px 9px;
  border-radius: 999px;
  background: rgba(240, 128, 128, 0.12);
  color: ${theme.colors.primary};
  font-size: 12px;
  font-weight: 800;
`;

export const PhoneNumber = styled.p`
  margin: 5px 0 0;
  color: #777b84;
  font-size: 14px;
  line-height: 1.4;
`;

export const Section = styled.section`
  margin-top: 28px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 12px;
  color: #17181a;
  font-size: 17px;
  font-weight: 800;
`;

export const ShopCard = styled(CardSurface)`
  padding: 18px;
`;

export const ShopCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const ShopSummary = styled.div`
  min-width: 0;
`;

export const ShopLabel = styled.span`
  display: block;
  margin-bottom: 5px;
  color: #8a8d95;
  font-size: 12px;
  font-weight: 600;
`;

export const ShopName = styled.strong`
  display: block;
  overflow: hidden;
  color: #17181a;
  font-size: 18px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PublicBadge = styled.span`
  flex: 0 0 auto;
  padding: 5px 9px;
  border-radius: 999px;
  background: #edf8ef;
  color: #318b42;
  font-size: 11px;
  font-weight: 800;
`;

export const LinkPreview = styled.p`
  margin: 16px 0 0;
  padding: 11px 12px;
  overflow: hidden;
  border-radius: 10px;
  background: #f6f7f9;
  color: #777b84;
  font-size: 12px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ShopActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
  margin-top: 12px;

  @media (max-width: 360px) {
    grid-template-columns: 1fr;
  }
`;

const actionButtonStyles = `
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
`;

export const CopyButton = styled.button`
  ${actionButtonStyles}
  border: 1px solid #dedfe3;
  background: #fff;
  color: #292b30;
`;

export const ShareButton = styled.button`
  ${actionButtonStyles}
  border: 1px solid ${theme.colors.primary};
  background: ${theme.colors.primary};
  color: #fff;
`;

export const LinkStatus = styled.p`
  margin: 16px 0 0;
  padding: 13px 14px;
  border-radius: 12px;
  background: ${({ $error }) => ($error ? '#fff3f3' : '#f6f7f9')};
  color: ${({ $error }) => ($error ? '#c94a4a' : '#777b84')};
  font-size: 13px;
  line-height: 1.5;
`;

export const ServiceMenu = styled(GroupedSurface)``;

export const ServiceMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  min-height: 76px;
  padding: 13px 16px;
  border: 0;
  border-bottom: 1px solid #eff0f2;
  background: #fff;
  color: #17181a;
  text-align: left;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  &:active {
    background: #fafafa;
  }

  &:focus-visible {
    position: relative;
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px;
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const ServiceIcon = styled.span`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 13px;
  background: rgba(240, 128, 128, 0.12);
  color: ${theme.colors.primary};

  svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

export const ServiceText = styled.span`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 4px;

  strong {
    color: #24262a;
    font-size: 15px;
    font-weight: 800;
  }

  span {
    overflow: hidden;
    color: #8a8d95;
    font-size: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Chevron = styled.span`
  flex: 0 0 auto;
  color: #afb1b7;
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
`;

export const AccountMenu = styled(GroupedSurface)``;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 54px;
  padding: 0 16px;
  border: 0;
  background: #fff;
  color: #555960;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;

  &:active {
    background: #fafafa;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px;
  }
`;
