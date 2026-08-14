import styled from 'styled-components';
import theme from '@/styles/theme';

// 안내 문구 (요일 선택 가이드)
export const ByDayNote = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${theme.colors.primary};
  background: transparent;
  border-radius: 0;
  padding: 0;
  line-height: 1.5;
  text-align: center;
`;

// 시간 입력 행 (start ~ end [×])
export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: 18px;
`;

export const TimeInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 45px;
  border: 0;
  border-radius: 12px;
  text-align: center;
  font-size: 16px;
  font-weight: 900;
  color: ${theme.colors.black.DEFAULT};
  background: #f7f7f9;
`;

export const TimeSeparator = styled.span`
  color: #d1d3d8;
  font-size: 16px;
  width: 10px;
  text-align: center;
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
  gap: 22px;
  margin-bottom: 18px;
`;

// 하단 버튼 행 (그룹 삭제 + 시간 추가)
export const AddSlotRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GroupRemoveButton = styled.button`
  color: #8a8a8e;
  min-height: 36px;
  font-size: 12px;
  font-weight: 800;
  background: none;
  border: none;
  cursor: pointer;
`;

export const AddTimeButton = styled.button`
  color: ${theme.colors.primary};
  min-height: 36px;
  font-size: 12px;
  font-weight: 800;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;
