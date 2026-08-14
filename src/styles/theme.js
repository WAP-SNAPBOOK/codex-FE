const theme = {
  colors: {
    kakakoYellow: '#FEE500',
    kakaoTextBlack: 'rgba(0,0,0,0.85)',
    mainButtonGray: 'rgba(229, 231, 236, 0.25)',
    // 공통 색상
    white: '#FFFFFF',
    surface: {
      DEFAULT: '#FFFFFF',
      subtle: '#F6F7F9',
      muted: '#EFF0F2',
    },
    text: {
      primary: '#17181A',
      secondary: '#555960',
      tertiary: '#8A8D95',
      inverse: '#FFFFFF',
    },
    border: {
      subtle: '#EFF0F2',
      DEFAULT: '#E3E4E7',
      strong: '#D1D3D8',
    },
    black: {
      DEFAULT: '#000000',
      20: 'rgba(0 0, 0, 0.2)',
      30: 'rgba(0, 0, 0, 0.3)',
      50: 'rgba(0, 0, 0, 0.5)',
      75: 'rgba(0 0, 0, 0.75)',
    },
    gray: {
      DEFAULT: '#D1D3D8',
      border: '#D3D3D3',
      dark: {
        DEFAULT: '#5D5D5D',
        50: 'rgba(211, 211, 211, 0.5)',
      },
      20: 'rgba(209, 211, 216, 0.2)',
      25: 'rgba(209, 211, 216, 0.25)',
    },

    primary: '#F08080',
    highlight: { DEFAULT: '#F08080', 10: 'rgba(240, 128, 128, 0.1)' },

    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    status: {
      info: { background: '#EEF4FF', text: '#3566A8' },
      pending: { background: '#FFF4DF', text: '#9A6500' },
      success: { background: '#EDF8EF', text: '#318B42' },
      error: { background: '#FFF0F0', text: '#C94A4A' },
      neutral: { background: '#F2F3F5', text: '#666A72' },
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    xxl: '28px',
  },
  radius: {
    sm: '10px',
    md: '12px',
    lg: '18px',
    xl: '22px',
    pill: '999px',
  },
  shadow: {
    card: '0 8px 24px rgba(17, 24, 39, 0.05)',
    floating: '0 8px 28px rgba(17, 24, 39, 0.12)',
    modal: '0 20px 50px rgba(17, 24, 39, 0.18)',
  },
  layout: {
    mobileMaxWidth: '480px',
    gutter: '20px',
    compactGutter: '16px',
    bottomNavSpace: '108px',
  },
};

export default theme;
