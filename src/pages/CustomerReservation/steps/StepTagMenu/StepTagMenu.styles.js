import styled from 'styled-components';
import theme from '@/styles/theme';

export const Divider = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background-color: #e5e7eb;
  margin: 16px 0;
`;

/* 태그 버튼 영역 */
export const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  margin-bottom: 8px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const SelectButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 38px;
  padding: 12px 24px;
  border-radius: ${theme.radius.lg};
  border: 1.5px solid
    ${({ $selected }) => ($selected ? theme.colors.primary : theme.colors.gray.DEFAULT)};
  background-color: ${({ $selected }) => ($selected ? 'rgba(240, 128, 128, 0.1)' : '#fff')};
  color: ${({ $selected }) => ($selected ? theme.colors.primary : '#333')};
  font-size: 15px;
  white-space: nowrap;
  font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease,
    color 0.15s ease;
`;

/* 메뉴 카드 영역 */
export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 450px;
  height: 450px;
  gap: 10px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const MenuCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  width: 100%;
  padding: 14px 16px;
  border-bottom: 1px solid ${theme.colors.gray.DEFAULT};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const CountControl = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  background-color: #f1f3f5;
  border-radius: 14px;
  padding: 6px 8px;
  align-self: flex-end;
`;

export const CountNumber = styled.span`
  font-size: 15px;
  font-weight: 600;
  width: 24px;
  text-align: center;
`;

export const CountButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $primary }) => ($primary ? theme.colors.primary : '#ffffff')};
  color: ${({ $primary }) => ($primary ? '#ffffff' : '#374151')};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  &:active {
    transform: scale(0.95);
  }
`;

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  flex: 1;
`;

export const MenuName = styled.p`
  font-size: 18px;
  font-weight: 800;
  color: ${({ $disabled }) => ($disabled ? '#aaa' : '#000000')};
  margin: 0;
`;

export const MenuDescription = styled.p`
  font-size: 13px;
  color: ${({ $disabled }) => ($disabled ? '#ccc' : '#888')};
  margin: 0;
`;
