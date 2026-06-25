import styled from 'styled-components';

export const Textarea = styled.textarea`
  box-sizing: border-box;
  width: 100%;
  min-height: 96px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ededed;
  resize: none;
  font-size: 13px;
  margin-bottom: 16px;

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
  background: ${({ $rejected }) => ($rejected ? '#9e9e9e' : '#ec6060')};
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;
