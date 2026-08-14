import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Pretendard 폰트 */
  * {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', sans-serif;
  }

  /* box-sizing 초기화 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* 기본 여백 제거 */
  html, body {
    margin: 0;
    padding: 0;
    touch-action: manipulation;
    overscroll-behavior: none;
    width: 100%;
    min-height: 100%;
    background-color: #fff;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  button:focus-visible,
  a:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline: 3px solid rgba(240, 128, 128, 0.35);
    outline-offset: 2px;
  }

`;

export default GlobalStyle;
