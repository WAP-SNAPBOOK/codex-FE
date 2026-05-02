import styled from 'styled-components';
import { BaseButton } from '../../components/common/Button';
import theme from '../../styles/theme';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: ${theme.colors.white};
`;

export const Content = styled.div`
  flex: 1;
  padding: 24px 20px 110px;
`;

export const AccountCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 24px 20px;
  border: 1px solid ${theme.colors.gray.border};
  border-radius: 24px;
  background: ${theme.colors.gray[20]};
`;

export const Label = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.gray.dark.DEFAULT};
`;

export const Name = styled.strong`
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.black.DEFAULT};
`;

export const Meta = styled.span`
  font-size: 15px;
  color: ${theme.colors.gray.dark.DEFAULT};
`;

export const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 6px 12px;
  border-radius: 999px;
  background: ${theme.colors.white};
  color: ${theme.colors.black.DEFAULT};
  font-size: 13px;
  font-weight: 700;
`;

export const ShareLinkCard = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
  padding: 20px;
  border: 1px solid ${theme.colors.gray.border};
  border-radius: 20px;
  background: ${theme.colors.white};
`;

export const ShareLinkButton = styled.button`
  display: block;
  width: 100%;
  padding: 14px 16px;
  border: 0;
  border-radius: 14px;
  background: ${theme.colors.gray[20]};
  color: ${theme.colors.black.DEFAULT};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.45;
  overflow-wrap: anywhere;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
`;

export const LinkStatus = styled.p`
  margin: 0;
  padding: 14px 16px;
  border-radius: 14px;
  background: ${theme.colors.gray[20]};
  color: ${theme.colors.gray.dark.DEFAULT};
  font-size: 14px;
  line-height: 1.45;
`;

export const CopyStatus = styled.p`
  margin: 0;
  color: ${theme.colors.primary};
  font-size: 13px;
  font-weight: 700;
`;

export const MenuManageButton = styled(BaseButton).attrs({
  $fullWidth: true,
  $height: '52px',
  $radius: '16px',
})`
  margin-top: 16px;
  background: ${theme.colors.white};
  color: ${theme.colors.black.DEFAULT};
  border: 1px solid ${theme.colors.gray.border};
`;

export const LogoutButton = styled(BaseButton).attrs({
  $fullWidth: true,
  $height: '52px',
  $radius: '16px',
})`
  margin-top: 20px;
  background: ${theme.colors.black.DEFAULT};
  color: ${theme.colors.white};
`;
