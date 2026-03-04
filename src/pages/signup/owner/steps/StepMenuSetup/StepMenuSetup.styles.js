import styled from 'styled-components';
import theme from '@/styles/theme';

export const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  border: 1.5px solid ${theme.colors.gray.border};
  border-radius: ${theme.radius.md};
  padding: 0 12px;
  font-size: 14px;
  color: ${theme.colors.black.DEFAULT};
  background: white;
  margin-bottom: 10px;

  &::placeholder {
    color: ${theme.colors.gray.dark.DEFAULT};
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

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;

export const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 12px;
  border: 1.5px solid ${theme.colors.gray.border};
  border-radius: ${theme.radius.md};
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
