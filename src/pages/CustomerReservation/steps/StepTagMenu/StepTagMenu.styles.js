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
