import styled from 'styled-components';
import theme from '@/styles/theme';

export const PageFrame = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: min(100%, 402px);
  min-height: 100dvh;
  padding: 70px 24px 58px;
  background: #fff;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 26px;
  margin-bottom: 40px;
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  background: transparent;

  img {
    width: 22px;
    height: 22px;
    display: block;
  }
`;

export const StepNav = styled.nav`
  display: grid;
  grid-template-columns: minmax(56px, 1fr) 26px minmax(82px, 1fr) 26px minmax(56px, 1fr);
  align-items: center;
  column-gap: 6px;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 48px;
`;

export const StepTab = styled.button`
  min-width: 0;
  justify-self: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ $active }) => ($active ? theme.colors.primary : '#787a80')};
  font-size: 18.5px;
  font-weight: 700;
  line-height: 22px;
  text-align: center;
  letter-spacing: -0.025em;
  white-space: pre-line;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`;

export const StepDivider = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #d1d3d8;
  font-size: 22px;
  font-weight: 500;
`;

export const Content = styled.main`
  flex: 1;
  width: 100%;
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
