import styled from 'styled-components';
import theme from '@/styles/theme';

export const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 14px;
`;

export const TimeButton = styled.button`
  height: 44px;
  border-radius: 12px;
  border: 1px solid #eee;
  background: ${({ $selected }) => ($selected ? '#FF8A8A' : '#fff')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#333')};

  &:disabled {
    background: ${theme.colors.gray[20]};
    color: ${theme.colors.gray.DEFAULT};
    cursor: not-allowed;
  }
`;

export const HelperText = styled.p`
  margin-top: 12px;
  font-size: 13px;
  color: #999;
  text-align: center;
`;
