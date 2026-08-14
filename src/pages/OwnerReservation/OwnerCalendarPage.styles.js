import styled from 'styled-components';
import theme from '@/styles/theme';

export const Page = styled.div`
  width: min(100%, 480px);
  min-height: 100vh;
  margin: 0 auto;
  background: #fff;
  padding-bottom: calc(${theme.layout.bottomNavSpace} + env(safe-area-inset-bottom));
  color: ${theme.colors.text.primary};
  font-family: Pretendard, sans-serif;
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  padding: calc(18px + env(safe-area-inset-top)) 20px 0;
  border-bottom: 1px solid ${theme.colors.border.subtle};
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(12px);
`;

export const PageHeading = styled.div`
  margin-bottom: 18px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

export const PageDescription = styled.p`
  margin: 7px 0 0;
  color: ${theme.colors.text.tertiary};
  font-size: 13px;
  line-height: 1.45;
`;

export const MonthBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 38px;
`;

export const MonthButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  color: ${theme.colors.text.primary};
  font-size: 18px;
  font-weight: 800;
  padding: 0;
`;

export const MonthControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TodayButton = styled.button`
  height: 32px;
  padding: 0 12px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.radius.pill};
  background: ${theme.colors.surface.DEFAULT};
  color: ${theme.colors.text.primary};
  font-size: 12px;
  font-weight: 700;
`;

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: ${theme.colors.surface.subtle};
  color: ${theme.colors.text.primary};
  font-size: 18px;
`;

export const StaffFilter = styled.div`
  display: flex;
  gap: 8px;
  margin: 10px -20px 0;
  padding: 0 20px 12px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StaffChip = styled.button`
  flex: 0 0 auto;
  height: 32px;
  padding: 0 12px;
  border: 1px solid
    ${({ $selected }) => ($selected ? theme.colors.primary : theme.colors.border.DEFAULT)};
  border-radius: ${theme.radius.pill};
  background: ${({ $selected }) =>
    $selected ? theme.colors.primary : theme.colors.surface.DEFAULT};
  color: ${({ $selected }) => ($selected ? theme.colors.text.inverse : theme.colors.text.primary)};
  font-size: 12px;
  font-weight: 700;
`;

export const WeekStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 10px 0 12px;
`;

export const DayButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 52px;
  border: 0;
  border-radius: ${theme.radius.md};
  background: ${({ $selected }) => ($selected ? theme.colors.primary : 'transparent')};
  color: ${({ $selected }) => ($selected ? theme.colors.text.inverse : theme.colors.text.primary)};
  font-weight: ${({ $selected }) => ($selected ? 800 : 600)};
`;

export const DayLabel = styled.span`
  font-size: 11px;
`;

export const DayNumber = styled.span`
  font-size: 14px;
`;

export const DayBadge = styled.span`
  position: absolute;
  bottom: 4px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${({ $pending }) =>
    $pending ? theme.colors.status.pending.text : theme.colors.status.success.text};
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.7);
`;

export const MonthPickerOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.38);
`;

export const MonthPickerSheet = styled.div`
  width: min(100%, 480px);
  padding: 10px 20px calc(28px + env(safe-area-inset-bottom));
  border-radius: 20px 20px 0 0;
  background: #fff;
`;

export const MonthPickerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const YearSelect = styled.select`
  width: 100%;
  height: 44px;
  margin-bottom: 16px;
  padding: 0 14px;
  border: 1px solid #e1e2e4;
  border-radius: 10px;
  background: #fff;
  color: #111;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
`;

export const MonthGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;

export const MonthOption = styled.button`
  height: 46px;
  border: 1px solid ${({ $selected }) => ($selected ? theme.colors.primary : '#e1e2e4')};
  border-radius: 10px;
  background: ${({ $selected }) => ($selected ? theme.colors.primary : '#fff')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#111')};
  font-size: 15px;
  font-weight: 700;
`;

export const Body = styled.main`
  overflow-x: auto;
  padding: 18px 0 0;
`;

export const CalendarLoading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

export const TimelineGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 48px repeat(${({ $columns }) => Math.max($columns, 1)}, minmax(228px, 1fr));
  min-width: ${({ $columns }) => 48 + Math.max($columns, 1) * 228}px;
`;

export const StaffHeader = styled.div`
  grid-row: 1;
  z-index: 5;
  grid-column: 2 / -1;
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => Math.max($columns, 1)}, minmax(228px, 1fr));
  gap: 4px;
  padding-bottom: 8px;
`;

export const StaffHeaderCell = styled.div`
  padding: 8px 10px;
  border-radius: 8px 8px 0 0;
  background: ${({ $background }) => $background};
  color: #333;
  font-size: 12px;
  font-weight: 800;
`;

export const TimeAxis = styled.div`
  grid-column: 1;
  grid-row: 2;
  position: relative;
`;

export const TimeLabel = styled.div`
  position: absolute;
  left: 8px;
  top: ${({ $top }) => $top}px;
  transform: translateY(-8px);
  color: #8a8a8e;
  font-size: 12px;
`;

export const Columns = styled.div`
  grid-column: 2 / -1;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => Math.max($columns, 1)}, minmax(228px, 1fr));
`;

export const StaffColumn = styled.div`
  position: relative;
  min-height: ${({ $height }) => $height}px;
  border-left: 1px solid #f0f0f0;
`;

export const HourLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({ $top }) => $top}px;
  height: 1px;
  background: ${({ $half }) => ($half ? '#f5f5f5' : '#e9e9e9')};
`;

export const UnavailableRange = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: ${({ $top }) => $top}px;
  height: ${({ $height }) => $height}px;
  background: repeating-linear-gradient(
    -45deg,
    rgba(209, 211, 216, 0.18),
    rgba(209, 211, 216, 0.18) 8px,
    rgba(209, 211, 216, 0.08) 8px,
    rgba(209, 211, 216, 0.08) 16px
  );
`;

export const ReservationBlock = styled.button`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: ${({ $left }) => $left}%;
  width: calc(${({ $width }) => $width}% - 8px);
  min-height: 48px;
  height: ${({ $height }) => $height}px;
  padding: 10px 12px;
  border: 0;
  border: 1px solid
    ${({ $status }) =>
      $status === 'PENDING'
        ? theme.colors.status.pending.background
        : theme.colors.status.success.background};
  border-radius: ${theme.radius.md};
  background: ${({ $status }) =>
    $status === 'PENDING'
      ? theme.colors.status.pending.background
      : theme.colors.status.success.background};
  color: ${theme.colors.text.primary};
  text-align: left;
  overflow: hidden;
`;

export const ReservationName = styled.div`
  font-size: 12px;
  font-weight: 900;
  line-height: 1.25;
`;

export const ReservationMeta = styled.div`
  margin-top: 4px;
  color: ${theme.colors.text.secondary};
  font-size: 11px;
  line-height: 1.35;
`;

export const StatusLabel = styled.span`
  display: inline-flex;
  align-items: center;
  height: 18px;
  margin-top: 6px;
  padding: 0 6px;
  border-radius: 999px;
  background: ${({ $status }) =>
    $status === 'PENDING'
      ? theme.colors.status.pending.background
      : theme.colors.status.success.background};
  color: ${({ $status }) =>
    $status === 'PENDING' ? theme.colors.status.pending.text : theme.colors.status.success.text};
  font-size: 11px;
  font-weight: 800;
`;

export const EmptyState = styled.div`
  padding: 84px 24px;
  color: ${theme.colors.text.tertiary};
  text-align: center;
  font-size: 14px;
`;

export const SheetOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 40;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.28);
`;

export const Sheet = styled.section`
  width: min(100%, 430px);
  max-height: 86vh;
  overflow-y: auto;
  padding: 22px 18px 26px;
  border-radius: 18px 18px 0 0;
  background: #fff;
`;

export const SheetHandle = styled.div`
  width: 38px;
  height: 4px;
  margin: 0 auto 18px;
  border-radius: 999px;
  background: #d9d9d9;
`;

export const SheetHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
`;

export const SheetTitle = styled.h2`
  margin: 0;
  color: #111;
  font-size: 20px;
  font-weight: 900;
`;

export const SheetClose = styled.button`
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: #f2f4f6;
  color: #111;
  font-size: 18px;
`;

export const DetailGrid = styled.div`
  display: grid;
  gap: 8px;
  margin-bottom: 16px;
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  color: #111;
  font-size: 13px;
`;

export const DetailKey = styled.span`
  color: #8a8a8e;
  font-weight: 700;
`;

export const DetailValue = styled.span`
  min-width: 0;
  text-align: right;
  font-weight: 700;
  overflow-wrap: anywhere;
`;

export const TotalBox = styled.div`
  margin-top: 12px;
  padding: 12px;
  border-radius: 10px;
  background: #f7f7f9;
`;
