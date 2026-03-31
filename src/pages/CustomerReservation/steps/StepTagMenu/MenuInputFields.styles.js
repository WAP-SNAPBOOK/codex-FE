import styled from 'styled-components';
import theme from '@/styles/theme';

export const InputFieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid ${theme.colors.gray.DEFAULT};
`;

export const InputFieldRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InputFieldLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.colors.black.DEFAULT};
`;

export const RequiredMark = styled.span`
  color: ${theme.colors.primary};
  margin-left: 2px;
`;
