import styled from 'styled-components';

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 80px;
  color: #000;
  font-size: 13.25px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.025em;
`;

export const Input = styled.input`
  width: 100%;
  height: 56px;
  padding: 0 18px;
  border: 0;
  border-radius: 16px;
  background: #f7f7f9;
  color: #111;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.025em;

  &::placeholder {
    color: #c4c4c7;
    font-weight: 400;
  }

  &:focus {
    outline: 1px solid #f08080;
    background: #fff;
  }
`;

export const AddressWrapper = styled.div`
  position: relative;
`;

export const AddressIcon = styled.span`
  position: absolute;
  right: 18px;
  top: 50%;
  display: block;
  width: 14px;
  height: 14px;
  transform: translateY(-50%);

  &::before {
    content: '';
    position: absolute;
    left: 1px;
    top: 1px;
    width: 8px;
    height: 8px;
    border: 2px solid #c4c4c7;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    right: 1px;
    bottom: 2px;
    width: 6px;
    height: 2px;
    border-radius: 999px;
    background: #c4c4c7;
    transform: rotate(45deg);
    transform-origin: center;
  }
`;
