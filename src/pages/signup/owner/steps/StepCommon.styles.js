import styled from 'styled-components';
import theme from '@/styles/theme';

// 원형 요일 / 째주 토글 버튼 (ByDaySlots, StepHolidays 공통)
export const DayButton = styled.button`
  width: 41px;
  height: 41px;
  border-radius: 50%;
  border: 1px solid ${({ $active }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active }) => ($active ? theme.colors.primary : '#c7c7cc')};
  font-size: 15.98px;
  font-weight: 900;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#fff' : '#f7f7f9')};
  transition:
    border-color 0.15s,
    color 0.15s,
    background-color 0.15s;
`;

// 요일 버튼 행 (ByDaySlots, StepHolidays 공통)
export const DaysRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;
