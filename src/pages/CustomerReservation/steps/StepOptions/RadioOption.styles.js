import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-bottom: 24px;
`;

export const TopRow = styled.div`
  display: flex;
  gap: 8px;

  ${({ $layout }) =>
    $layout === 'vertical'
      ? `
        flex-direction: column;
        align-items: flex-start;
      `
      : `
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      `}
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #111827;
`;

export const ButtonGroup = styled.div`
  ${({ $variant }) =>
    $variant === 'large'
      ? `
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        width: 100%;
      `
      : `
        display: flex;
        gap: 6px;
      `}
`;

export const RadioButton = styled.button`
  cursor: pointer;
  font-weight: 500;
  border-radius: ${({ $variant }) => ($variant === 'large' ? '14px' : '8px')};

  transition: all 0.2s ease;

  ${({ $variant }) =>
    $variant === 'large'
      ? `
        min-width: 120px;
        padding: 14px 0;
        font-size: 14px;
      `
      : `
        min-width: 36px;
        padding: 6px 10px;
        font-size: 12px;
      `}

  border: 1px solid
    ${({ $active }) => ($active ? '#f87171' : '#e5e7eb')};

  background-color: ${({ $active }) => ($active ? '#f87171' : '#ffffff')};

  color: ${({ $active }) => ($active ? '#ffffff' : '#6b7280')};

  &:active {
    transform: scale(0.95);
  }
`;

export const CountCard = styled.div`
  margin-top: 12px;
  padding: 14px 16px;
  border-radius: 14px;
  background-color: #f9fafb;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CountLabel = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

export const CountControl = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CountNumber = styled.div`
  font-size: 15px;
  font-weight: 600;
  width: 20px;
  text-align: center;
`;

export const CircleButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  font-size: 18px;
  cursor: pointer;

  background-color: ${({ $primary }) => ($primary ? '#f87171' : '#ffffff')};
  color: ${({ $primary }) => ($primary ? '#ffffff' : '#6b7280')};

  box-shadow: 0 0 0 1px #e5e7eb inset;

  &:active {
    transform: scale(0.95);
  }
`;
