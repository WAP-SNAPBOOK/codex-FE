import styled from 'styled-components';
import theme from '../../styles/theme';

export const CardSurface = styled.div`
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.surface.DEFAULT};
  box-shadow: ${theme.shadow.card};
`;

export const GroupedSurface = styled.div`
  overflow: hidden;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface.DEFAULT};
`;
