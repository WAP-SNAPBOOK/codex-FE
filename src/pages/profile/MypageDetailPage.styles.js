import styled from 'styled-components';
import { PageContent, PageShell } from '../../components/common/PageLayout';
import { CardSurface } from '../../components/common/Surface';
import theme from '../../styles/theme';

export const Page = styled(PageShell)``;

export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: calc(14px + env(safe-area-inset-top)) 20px 14px;
  border-bottom: 1px solid ${theme.colors.border.subtle};
  background: ${theme.colors.surface.DEFAULT};
`;

export const BackButton = styled.button`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: -9px;
  border: 0;
  border-radius: ${theme.radius.md};
  background: transparent;
  color: ${theme.colors.text.primary};
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
`;

export const HeaderText = styled.div`
  min-width: 0;
  padding-top: 5px;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

export const Description = styled.p`
  margin: 6px 0 0;
  color: ${theme.colors.text.tertiary};
  font-size: 13px;
  line-height: 1.45;
`;

export const Content = styled(PageContent)`
  padding-top: 20px;
`;

export const Card = styled(CardSurface)`
  padding: 20px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 17px;
  font-weight: 800;
`;

export const InfoList = styled.dl`
  margin: 18px 0 0;
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 48px;
  border-bottom: 1px solid ${theme.colors.border.subtle};

  &:last-child {
    border-bottom: 0;
  }

  span {
    color: ${theme.colors.text.tertiary};
    font-size: 13px;
  }

  strong {
    color: ${theme.colors.text.primary};
    font-size: 14px;
    text-align: right;
  }
`;

export const InfoNote = styled.p`
  margin: 16px 0 0;
  padding: 14px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.status.info.background};
  color: ${theme.colors.status.info.text};
  font-size: 12px;
  line-height: 1.6;
`;

export const StatusList = styled.div`
  margin-top: 16px;
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid ${theme.colors.border.subtle};

  &:last-child {
    border-bottom: 0;
  }

  > span {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 5px;
  }

  strong {
    color: ${theme.colors.text.primary};
    font-size: 14px;
  }

  small {
    color: ${theme.colors.text.tertiary};
    font-size: 12px;
    line-height: 1.45;
  }
`;

export const EmptyCard = styled(CardSurface)`
  display: flex;
  min-height: 300px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 24px;
  border-color: ${({ $danger }) =>
    $danger ? theme.colors.status.error.background : theme.colors.border.DEFAULT};
  text-align: center;
`;

export const EmptyIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: ${theme.colors.surface.subtle};
  color: ${theme.colors.text.secondary};
  font-size: 18px;
  font-weight: 800;
`;

export const EmptyTitle = styled.h2`
  margin: 18px 0 0;
  color: ${theme.colors.text.primary};
  font-size: 17px;
  font-weight: 800;
`;

export const EmptyDescription = styled.p`
  max-width: 310px;
  margin: 9px 0 0;
  color: ${theme.colors.text.tertiary};
  font-size: 13px;
  line-height: 1.65;
`;

export const PrimaryButton = styled.button`
  min-height: 44px;
  margin-top: 22px;
  padding: 0 18px;
  border: 0;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
`;
