import styled, { keyframes } from 'styled-components';
import theme from '@/styles/theme';

const dropIn = keyframes`
  0% { transform: scale(0); opacity: 0.6; }
  60% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

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
  transform: scale(${({ $checked }) => ($checked ? 1 : 0)});
  animation: ${({ $checked }) => ($checked ? dropIn : 'none')} 0.3s ease forwards;
`;

export default function RadioButton({ checked, onChange }) {
  return (
    <Outer $checked={checked} onClick={onChange}>
      <Inner $checked={checked} />
    </Outer>
  );
}
