import styled from 'styled-components';
import { PageContent, PageShell } from '../../components/common/PageLayout';
import { CardSurface, GroupedSurface } from '../../components/common/Surface';
import theme from '../../styles/theme';

export const PageWrapper = styled(PageShell)``;

export const Content = styled(PageContent)`
  padding-top: 10px;
`;

export const ProfileCard = styled(CardSurface)`
  padding: 18px;
  background: linear-gradient(145deg, #fff 0%, #fff8f8 100%);
`;

export const ProfileLabel = styled.span`
  display: block;
  margin-bottom: 13px;
  color: ${theme.colors.text.tertiary};
  font-size: 12px;
  font-weight: 700;
`;

export const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

export const Avatar = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border: 1px solid rgba(240, 128, 128, 0.16);
  border-radius: 19px;
  background: rgba(240, 128, 128, 0.12);
  color: ${theme.colors.primary};
  font-size: 23px;
  font-weight: 800;
`;

export const ProfileInfo = styled.div`
  min-width: 0;
  flex: 1;
`;

export const ProfileHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Name = styled.h2`
  margin: 0;
  overflow: hidden;
  color: ${theme.colors.text.primary};
  font-size: 20px;
  font-weight: 800;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RoleBadge = styled.span`
  flex: 0 0 auto;
  padding: 4px 8px;
  border-radius: ${theme.radius.pill};
  background: rgba(240, 128, 128, 0.12);
  color: ${theme.colors.primary};
  font-size: 11px;
  font-weight: 800;
`;

export const PhoneNumber = styled.p`
  margin: 4px 0 0;
  color: ${theme.colors.text.secondary};
  font-size: 13px;
  line-height: 1.4;
`;

export const ShopMeta = styled.div`
  display: flex;
  min-height: 17px;
  align-items: center;
  margin-top: 3px;
  color: ${theme.colors.text.tertiary};
  font-size: 12px;
  font-weight: 600;
`;

export const Section = styled.section`
  margin-top: 28px;
`;

export const SectionHeading = styled.div`
  margin-bottom: 12px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 17px;
  font-weight: 800;
`;

export const SectionDescription = styled.p`
  margin: 5px 0 0;
  color: ${theme.colors.text.tertiary};
  font-size: 12px;
  line-height: 1.45;
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

export const ShopName = styled.strong`
  display: block;
  overflow: hidden;
  color: ${theme.colors.text.primary};
  font-size: 18px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ShopDescription = styled.span`
  display: block;
  margin-top: 5px;
  color: ${theme.colors.text.tertiary};
  font-size: 12px;
  line-height: 1.4;
`;

export const LinkPreview = styled.p`
  margin: 16px 0 0;
  padding: 12px 13px;
  overflow: hidden;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.surface.subtle};
  color: ${theme.colors.text.tertiary};
  font-size: 12px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ShopActions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 12px;
`;

const actionButtonStyles = `
  display: flex;
  min-width: 0;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
`;

export const PreviewLink = styled.a`
  ${actionButtonStyles}
  border: 1px solid ${theme.colors.border.DEFAULT};
  background: ${theme.colors.surface.DEFAULT};
  color: ${theme.colors.text.secondary};

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const CopyButton = styled.button`
  ${actionButtonStyles}
  border: 1px solid ${theme.colors.border.DEFAULT};
  background: ${theme.colors.surface.DEFAULT};
  color: ${theme.colors.text.primary};
`;

export const ShareButton = styled.button`
  ${actionButtonStyles}
  border: 1px solid ${theme.colors.primary};
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
`;

export const ShopLoading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const LinkError = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2px 0;

  strong {
    color: ${theme.colors.text.primary};
    font-size: 14px;
  }

  span {
    margin-top: 6px;
    color: ${theme.colors.text.tertiary};
    font-size: 12px;
    line-height: 1.5;
  }
`;

export const RetryButton = styled.button`
  min-height: 40px;
  margin-top: 14px;
  padding: 0 15px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.surface.DEFAULT};
  color: ${theme.colors.text.primary};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
`;

export const ServiceMenu = styled(GroupedSurface)``;

export const ServiceMenuButton = styled.button`
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  min-height: 74px;
  padding: 13px 15px;
  border: 0;
  border-bottom: 1px solid ${theme.colors.border.subtle};
  background: ${theme.colors.surface.DEFAULT};
  color: ${theme.colors.text.primary};
  text-align: left;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  &:active {
    background: ${theme.colors.surface.subtle};
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
    width: 23px;
    height: 23px;
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
    color: ${theme.colors.text.primary};
    font-size: 14px;
    font-weight: 800;
  }

  span {
    overflow: hidden;
    color: ${theme.colors.text.tertiary};
    font-size: 12px;
    line-height: 1.4;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const Chevron = styled.span`
  flex: 0 0 auto;
  color: #afb1b7;
  font-size: 23px;
  font-weight: 300;
  line-height: 1;
`;

export const AccountMenu = styled(GroupedSurface)``;

export const LogoutButton = styled(ServiceMenuButton)`
  color: ${theme.colors.text.secondary};
`;

export const AccountIcon = styled(ServiceIcon)`
  background: ${theme.colors.surface.subtle};
  color: ${theme.colors.text.secondary};
`;
