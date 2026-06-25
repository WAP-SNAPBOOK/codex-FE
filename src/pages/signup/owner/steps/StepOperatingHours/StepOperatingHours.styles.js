import styled from 'styled-components';
import theme from '@/styles/theme';

export const Root = styled.div`
  width: min(100%, 344px);
  margin: 0 auto;
  padding-top: 9px;
  margin-bottom: 34px;
`;

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.025em;
  margin: 0 0 24px;
`;

export const IntervalGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 56px;
`;

export const ScheduleTypeGroup = styled.div`
  display: flex;
  gap: 13px;
  margin-bottom: 56px;
`;

// 시간 간격 / 운영 유형 토글 버튼
export const ToggleButton = styled.button`
  flex: 1;
  height: ${({ $tall }) => ($tall ? '84px' : '56px')};
  border: 1px solid ${({ $active }) => ($active ? theme.colors.primary : 'transparent')};
  border-radius: 16px;
  color: ${({ $active }) => ($active ? theme.colors.primary : '#c7c7cc')};
  font-size: 16px;
  font-weight: 700;
  background: ${({ $active }) => ($active ? '#fff7f7' : '#f7f7f9')};
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s,
    background-color 0.15s;
  white-space: pre-line;
  line-height: 160%;
  letter-spacing: -0.025em;
`;

// 시간 입력 input (start / end 공통)
export const TimeInput = styled.input`
  flex: 1;
  height: 56px;
  min-width: 0;
  border: 0;
  border-radius: 16px;
  text-align: center;
  font-size: 20.25px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: -0.025em;
  color: ${theme.colors.black.DEFAULT};
  background: #f7f7f9;
`;

export const TimeSelect = styled.select`
  width: 100%;
  height: 56px;
  min-width: 0;
  border: 0;
  border-radius: 16px;
  text-align: center;
  font-size: 20.25px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: -0.025em;
  color: ${theme.colors.black.DEFAULT};
  background: #f7f7f9;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
`;

export const SelectChevron = styled.span`
  position: absolute;
  right: 14px;
  top: 50%;
  width: 10px;
  height: 6px;
  transform: translateY(-50%);

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    width: 6px;
    height: 1.5px;
    background: #c4c4c7;
  }

  &::before {
    left: 0;
    transform: rotate(45deg);
  }

  &::after {
    right: 0;
    transform: rotate(-45deg);
  }
`;

// "~" 구분자
export const TimeSeparator = styled.span`
  display: block;
  flex: 0 0 12px;
  width: 12px;
  height: 2px;
  overflow: hidden;
  color: transparent;
  background: #c4c4c7;
`;

// 시간 슬롯 한 행 (input ~ input [×])
export const TimeRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0;
`;

export const TimeField = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
`;

// 시간 슬롯 목록 컨테이너
export const TimeSlotList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

// × 제거 버튼
export const RemoveButton = styled.button`
  color: ${theme.colors.gray.dark.DEFAULT};
  font-size: 20px;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

// "휴게시간은 제외하고..." 안내 문구
export const TimeNote = styled.p`
  margin: 0;
  font-size: 12.25px;
  color: #8a8a8e;
  background: transparent;
  border-radius: 0;
  padding: 0;
  flex: 1;
  line-height: 13px;
  letter-spacing: -0.025em;
`;

// "+ 시간 추가하기" 버튼
export const AddTimeButton = styled.button`
  color: ${theme.colors.primary};
  font-size: 12.25px;
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
`;

export const LastTimeHint = styled.span`
  position: absolute;
  left: 50%;
  top: -26px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 183px;
  height: 24px;
  padding: 0 12px;
  border: 0.5px solid rgba(138, 138, 142, 0.55);
  border-radius: 999px;
  background: #fff;
  color: #ff3b30;
  font-size: 12.25px;
  font-weight: 400;
  line-height: 12px;
  letter-spacing: -0.025em;
  white-space: nowrap;
  z-index: 1;
  transform: translateX(-50%);

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 8px;
    height: 8px;
    background: #fff;
    clip-path: polygon(50% 100%, 0 0, 100% 0);
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 8px;
    height: 8px;
    background: rgba(138, 138, 142, 0.55);
    clip-path: polygon(50% 100%, 0 0, 100% 0);
    z-index: -1;
    transform: translateX(-50%);
  }
`;

// "운영 시간" 소제목
export const SubLabel = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.025em;
  margin: 0 0 24px;
`;

// 안내 + 추가 버튼 행
export const TimeFooter = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 16px;
`;
