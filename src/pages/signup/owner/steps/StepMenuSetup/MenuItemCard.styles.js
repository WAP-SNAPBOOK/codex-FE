import styled from 'styled-components';
import theme from '@/styles/theme';

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 12px;
  border: 1.5px solid ${theme.colors.gray.border};
  border-radius: ${theme.radius.md};
`;

export const MenuItemContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MenuItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const TagBadge = styled.span`
  display: inline-block;
  background: ${theme.colors.primary}22;
  color: ${theme.colors.primary};
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 100px;
  margin-bottom: 4px;
`;

export const MenuName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const Description = styled.div`
  font-size: 12px;
  color: ${theme.colors.gray.dark.DEFAULT};
  margin-top: 2px;
`;

export const RemoveButton = styled.button`
  color: ${theme.colors.gray.dark.DEFAULT};
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  margin-left: 8px;
`;

export const FieldToggle = styled.button`
  margin-top: 8px;
  font-size: 12px;
  color: ${theme.colors.primary};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
`;

export const FieldSection = styled.div`
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid ${theme.colors.gray.border};
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: ${theme.colors.gray.dark.DEFAULT};
  padding: 4px 0;
`;

export const SmallInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 36px;
  border: 1.5px solid ${theme.colors.gray.border};
  border-radius: ${theme.radius.md};
  padding: 0 10px;
  font-size: 12px;
  color: ${theme.colors.black.DEFAULT};
  background: white;

  &::placeholder {
    color: ${theme.colors.gray.dark.DEFAULT};
  }
`;

export const FieldRow = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;

export const TypeButton = styled.button`
  height: 32px;
  padding: 0 10px;
  border-radius: ${theme.radius.md};
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border: 1.5px solid ${({ $active }) => ($active ? theme.colors.primary : theme.colors.gray.border)};
  background: ${({ $active }) => ($active ? `${theme.colors.primary}22` : 'white')};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.gray.dark.DEFAULT)};
`;

export const RequiredLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  white-space: nowrap;
  color: ${theme.colors.gray.dark.DEFAULT};

  label {
    cursor: pointer;
  }
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
  margin-top: 4px;
`;
