import styled from 'styled-components';
import theme from '@/styles/theme';

export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px;
`;

// 시간 간격 / 운영 유형 토글 버튼
export const ToggleButton = styled.button`
  flex: 1;
  height: ${({ $tall }) => ($tall ? '56px' : '48px')};
  border: 3px solid ${({ $active }) => ($active ? theme.colors.primary : theme.colors.gray.border)};
  border-radius: ${theme.radius.md};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.gray.dark.DEFAULT)};
  font-size: ${({ $tall }) => ($tall ? '13px' : '14px')};
  font-weight: 700;
  background: white;
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s;
  white-space: pre-line;
  line-height: 1.4;
`;

// 시간 입력 input (start / end 공통)
export const TimeInput = styled.input`
  flex: 1;
  height: 48px;
  border: 1.5px solid ${theme.colors.gray.border};
  border-radius: ${theme.radius.md};
  text-align: center;
  font-size: 15px;
  color: ${theme.colors.black.DEFAULT};
  background: white;
`;

// "~" 구분자
export const TimeSeparator = styled.span`
  color: ${theme.colors.gray.dark.DEFAULT};
  font-size: 16px;
`;

// 시간 슬롯 한 행 (input ~ input [×])
export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
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
  font-size: 12px;
  color: ${theme.colors.primary};
  background: rgba(240, 128, 128, 0.08);
  border-radius: 8px;
  padding: 6px 10px;
  flex: 1;
  line-height: 1.5;
`;

// "+ 시간 추가하기" 버튼
export const AddTimeButton = styled.button`
  color: ${theme.colors.primary};
  font-size: 13px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 12px;
`;

// "운영 시간" 소제목
export const SubLabel = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
`;

// 안내 + 추가 버튼 행
export const TimeFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
`;
