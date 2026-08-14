import styled from 'styled-components';
import theme from '../../styles/theme';

export default function StatusBadge({ tone = 'neutral', children, showDot = true }) {
  return (
    <Badge $tone={tone}>
      {showDot ? <Dot aria-hidden="true" /> : null}
      {children}
    </Badge>
  );
}

const getTone = (tone) => theme.colors.status[tone] || theme.colors.status.neutral;

const Badge = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  min-height: 28px;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 10px;
  border-radius: ${theme.radius.pill};
  background: ${({ $tone }) => getTone($tone).background};
  color: ${({ $tone }) => getTone($tone).text};
  font-size: 11px;
  font-weight: 800;
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
`;
