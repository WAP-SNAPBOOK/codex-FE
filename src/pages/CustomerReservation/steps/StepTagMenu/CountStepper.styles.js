import styled from 'styled-components';
import theme from '@/styles/theme';

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
