import styled from 'styled-components';
import theme from '@/styles/theme';

export const PageFrame = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: min(100%, 402px);
  min-height: 100dvh;
  padding: 104px 24px 58px;
  background: #fff;
`;

export const TitleSection = styled.div`
  margin-bottom: 48px;
`;

export const Title = styled.h1`
  margin: 0;
  color: #111;
  font-size: 25px;
  font-weight: 800;
  line-height: 32px;
  letter-spacing: 0;
`;

export const Form = styled.form`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
`;

export const Fields = styled.div`
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
  letter-spacing: 0;
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
  letter-spacing: 0;

  &::placeholder {
    color: #c4c4c7;
    font-weight: 400;
  }

  &:focus {
    outline: 1px solid ${theme.colors.primary};
    background: #fff;
  }
`;

export const BottomArea = styled.div`
  width: 100%;
  margin-top: auto;
  padding-top: 24px;

  button {
    width: 100%;
    height: 56px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
    background: ${theme.colors.primary};
  }
`;

export const ErrorText = styled.p`
  margin: 12px 0 0;
  color: ${theme.colors.error};
  font-size: 13px;
  line-height: 18px;
`;
