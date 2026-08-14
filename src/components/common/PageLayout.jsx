import styled from 'styled-components';
import theme from '../../styles/theme';

export const PageShell = styled.div`
  display: flex;
  width: min(100%, ${theme.layout.mobileMaxWidth});
  min-height: 100vh;
  margin: 0 auto;
  flex-direction: column;
  background: ${theme.colors.surface.DEFAULT};
  color: ${theme.colors.text.primary};
`;

export const PageContent = styled.main`
  flex: 1;
  padding-right: ${theme.layout.gutter};
  padding-bottom: calc(${theme.layout.bottomNavSpace} + env(safe-area-inset-bottom));
  padding-left: ${theme.layout.gutter};

  @media (max-width: 360px) {
    padding-right: ${theme.layout.compactGutter};
    padding-left: ${theme.layout.compactGutter};
  }
`;
