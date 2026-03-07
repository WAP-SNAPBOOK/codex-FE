import styled from 'styled-components';
import theme from '@/styles/theme';

// 안내 문구 (요일 선택 가이드)
export const ByDayNote = styled.p`
  font-size: 12px;
  color: ${theme.colors.primary};
  background: rgba(240, 128, 128, 0.08);
  border-radius: 8px;
  padding: 6px 10px;
  line-height: 1.5;
  text-align: center;
`;

// 시간 입력 행 (start ~ end [×])
export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

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

export const TimeSeparator = styled.span`
  color: ${theme.colors.gray.dark.DEFAULT};
  font-size: 16px;
`;

export const RemoveButton = styled.button`
  color: ${theme.colors.gray.dark.DEFAULT};
  font-size: 20px;
  line-height: 1;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

// 슬롯 하나 묶음 (안내 + 요일 + 시간)
export const ByDayGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
`;

// 하단 버튼 행 (그룹 삭제 + 시간 추가)
export const AddSlotRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GroupRemoveButton = styled.button`
  color: ${theme.colors.gray.dark.DEFAULT};
  font-size: 13px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const AddTimeButton = styled.button`
  color: ${theme.colors.primary};
  font-size: 13px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;
