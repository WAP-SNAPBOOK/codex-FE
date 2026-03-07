import styled from 'styled-components';
import theme from '@/styles/theme';

// 원형 요일 / 째주 토글 버튼 (ByDaySlots, StepHolidays 공통)
export const DayButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid ${({ $active }) => ($active ? theme.colors.primary : theme.colors.gray.border)};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.gray.dark.DEFAULT)};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  background: white;
  transition:
    border-color 0.15s,
    color 0.15s;
`;

// 요일 버튼 행 (ByDaySlots, StepHolidays 공통)
export const DaysRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
