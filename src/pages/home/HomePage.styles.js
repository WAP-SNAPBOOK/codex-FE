import styled from 'styled-components';
import theme from '../../styles/theme';
import { PageContent, PageShell } from '../../components/common/PageLayout';
import { CardSurface } from '../../components/common/Surface';

export const PageWrapper = styled(PageShell)``;

export const HomeHeader = styled.header`
  display: flex;
  align-items: center;
  min-height: 68px;
  padding: 12px 20px;
`;

export const Brand = styled.h1`
  margin: 0;
  color: #17181a;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

export const Content = styled(PageContent)`
  padding-top: 18px;
`;

export const WelcomeSection = styled.section`
  padding: 8px 2px 28px;
`;

export const Greeting = styled.h2`
  margin: 0;
  color: #17181a;
  font-size: clamp(24px, 7vw, 30px);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.035em;
  word-break: keep-all;
`;

export const Introduction = styled.p`
  margin: 10px 0 0;
  color: #777b84;
  font-size: 15px;
  line-height: 1.55;
  word-break: keep-all;
`;

export const ActionSection = styled.section`
  margin-top: 28px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 13px;
  color: #383b40;
  font-size: 15px;
  font-weight: 800;
`;

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DashboardSection = styled.section``;

export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`;

const summaryTone = {
  default: theme.colors.surface.subtle,
  pending: theme.colors.status.pending.background,
  info: theme.colors.status.info.background,
};

export const SummaryCard = styled.div`
  min-width: 0;
  min-height: 104px;
  padding: 14px 12px;
  border-radius: ${theme.radius.lg};
  background: ${({ $tone }) => summaryTone[$tone] || summaryTone.default};
`;

export const SummaryLabel = styled.span`
  display: block;
  min-height: 32px;
  color: ${theme.colors.text.secondary};
  font-size: 11px;
  font-weight: 700;
  line-height: 1.4;
  word-break: keep-all;
`;

export const SummaryValue = styled.strong`
  display: inline-block;
  margin-top: 6px;
  color: ${theme.colors.text.primary};
  font-size: 28px;
  font-weight: 900;
  line-height: 1;
`;

export const SummaryUnit = styled.span`
  margin-left: 3px;
  color: ${theme.colors.text.tertiary};
  font-size: 11px;
  font-weight: 700;
`;

export const InlineNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  padding: 11px 12px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.status.error.background};
  color: ${theme.colors.status.error.text};
  font-size: 12px;
  font-weight: 700;

  button {
    flex: 0 0 auto;
    padding: 5px 8px;
    border: 0;
    border-radius: ${theme.radius.sm};
    background: transparent;
    color: inherit;
    font: inherit;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const QuickSection = styled.section`
  margin-top: 28px;
`;

export const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`;

export const QuickActionButton = styled.button`
  display: flex;
  min-width: 0;
  min-height: 86px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 6px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface.DEFAULT};
  color: ${theme.colors.text.secondary};
  font-size: 11px;
  font-weight: 800;
  cursor: pointer;

  &:active {
    background: ${theme.colors.surface.subtle};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const QuickIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};

  svg {
    width: 25px;
    height: 25px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

export const UpcomingCard = styled(CardSurface)`
  display: flex;
  flex-direction: column;
  gap: 13px;
  padding: 18px;
`;

export const UpcomingHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const UpcomingShop = styled.strong`
  min-width: 0;
  overflow: hidden;
  color: ${theme.colors.text.primary};
  font-size: 18px;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UpcomingDate = styled.p`
  margin: 0;
  color: ${theme.colors.text.secondary};
  font-size: 14px;
  font-weight: 700;
  line-height: 1.5;
`;

export const CardAction = styled.button`
  display: flex;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  border: 0;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;

  span {
    font-size: 21px;
    font-weight: 400;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const EmptyUpcomingCard = styled(CardSurface)`
  display: flex;
  min-height: 190px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 22px 18px;
  text-align: center;
`;

export const EmptyIcon = styled.span`
  display: flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  margin-bottom: 13px;
  border-radius: 16px;
  background: ${theme.colors.highlight[10]};
  color: ${theme.colors.primary};

  svg {
    width: 27px;
    height: 27px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

export const EmptyTitle = styled.strong`
  color: ${theme.colors.text.primary};
  font-size: 16px;
  font-weight: 800;
`;

export const EmptyDescription = styled.p`
  max-width: 280px;
  margin: 7px 0 0;
  color: ${theme.colors.text.tertiary};
  font-size: 13px;
  line-height: 1.55;
  word-break: keep-all;
`;

export const InlineButton = styled.button`
  min-height: 38px;
  margin-top: 15px;
  padding: 0 15px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.surface.DEFAULT};
  color: ${theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;
