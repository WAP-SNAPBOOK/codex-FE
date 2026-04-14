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
  gap: 16px;
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

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

export const InfoTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
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

export const LogoutButton = styled(BaseButton).attrs({
  $fullWidth: true,
  $height: '52px',
  $radius: '16px',
})`
  margin-top: 20px;
  background: ${theme.colors.black.DEFAULT};
  color: ${theme.colors.white};
`;
