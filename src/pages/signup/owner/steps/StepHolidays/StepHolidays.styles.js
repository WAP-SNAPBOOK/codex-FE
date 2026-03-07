import styled from 'styled-components';
import theme from '@/styles/theme';

export const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px;
`;

export const ToggleButton = styled.button`
  flex: 1;
  height: 48px;
  border: 3px solid ${({ $active }) => ($active ? theme.colors.primary : theme.colors.gray.border)};
  border-radius: ${theme.radius.md};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.gray.dark.DEFAULT)};
  font-size: 13px;
  font-weight: 700;
  background: white;
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s;
  white-space: pre-line;
  line-height: 1.4;
`;

export const DateInput = styled.input`
  width: 100%;
  height: 44px;
  border: 1.5px solid ${theme.colors.gray.border};
  border-radius: ${theme.radius.md};
  padding: 0 12px;
  font-size: 14px;
  color: ${theme.colors.black.DEFAULT};
  background: white;
  margin-bottom: 12px;
`;

export const AddButton = styled.button`
  width: 100%;
  height: 44px;
  border: 2px dashed ${theme.colors.primary};
  border-radius: ${theme.radius.md};
  color: ${theme.colors.primary};
  font-size: 14px;
  font-weight: 600;
  background: none;
  cursor: pointer;
  margin-top: 8px;
`;

export const HolidayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

export const HolidayItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border: 1.5px solid ${theme.colors.gray.border};
  border-radius: ${theme.radius.md};
  font-size: 13px;
`;

export const RemoveButton = styled.button`
  color: ${theme.colors.gray.dark.DEFAULT};
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;
