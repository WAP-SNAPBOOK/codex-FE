import styled from 'styled-components';

export const FieldGroup = styled.div`
  margin-bottom: 14px;
`;

export const FieldLabel = styled.div`
  margin-bottom: 8px;
  color: #777;
  font-size: 13px;
  font-weight: 600;
`;

export const SelectWrapper = styled.div`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 14px;
    width: 8px;
    height: 8px;
    border-right: 2px solid #555;
    border-bottom: 2px solid #555;
    pointer-events: none;
    transform: translateY(-65%) rotate(45deg);
  }
`;

export const Select = styled.select`
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  padding: 0 40px 0 12px;
  border-radius: 10px;
  border: 1px solid #ededed;
  background: #fff;
  color: #333;
  font-size: 13px;
  font-weight: 600;
`;

export const DateTimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

export const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 42px;
  min-width: 0;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #ededed;
  background: #fff;
  color: #333;
  font-size: 12px;
  font-weight: 600;
`;

export const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  min-height: 96px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ededed;
  resize: none;
  font-size: 13px;

  &::placeholder {
    color: #c0c0c0;
  }
`;

export const ButtonRow = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

export const CancelButton = styled.button`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  background: #fff;
  color: #777;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

export const ConfirmButton = styled.button`
  box-sizing: border-box;
  flex: 1;
  min-width: 0;
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  background: ${({ $confirmed }) => ($confirmed ? '#4CAF50' : '#ec6060')};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;
