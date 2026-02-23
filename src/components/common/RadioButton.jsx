import styled from 'styled-components';
import theme from '@/styles/theme';

const Outer = styled.div`
  flex-shrink: 0;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid
    ${({ $checked }) => ($checked ? theme.colors.primary : theme.colors.gray.DEFAULT)};
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.15s ease;
`;

const Inner = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  opacity: ${({ $checked }) => ($checked ? 1 : 0)};
  transition: opacity 0.15s ease;
`;

export default function RadioButton({ checked, onChange }) {
  return (
    <Outer $checked={checked} onClick={onChange}>
      <Inner $checked={checked} />
    </Outer>
  );
}
