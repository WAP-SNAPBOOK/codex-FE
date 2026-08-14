import styled from 'styled-components';
import theme from '../../styles/theme';

export default function AsyncState({
  variant = 'empty',
  title,
  description,
  actionLabel,
  onAction,
  withBottomNav = false,
  compact = false,
}) {
  const isError = variant === 'error';

  return (
    <StateBox
      role={isError ? 'alert' : 'status'}
      $withBottomNav={withBottomNav}
      $compact={compact}
      aria-live={isError ? 'assertive' : 'polite'}
    >
      <StateIcon $variant={variant} aria-hidden="true">
        {isError ? '!' : '···'}
      </StateIcon>
      <StateTitle>{title}</StateTitle>
      {description ? <StateDescription>{description}</StateDescription> : null}
      {actionLabel && onAction ? (
        <ActionButton type="button" onClick={onAction}>
          {actionLabel}
        </ActionButton>
      ) : null}
    </StateBox>
  );
}

const StateBox = styled.div`
  display: flex;
  min-height: ${({ $compact }) => ($compact ? '240px' : '55vh')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ $compact }) => ($compact ? '32px 24px' : '40px 24px')}
    ${({ $withBottomNav }) =>
      $withBottomNav
        ? `calc(${theme.layout.bottomNavSpace} + env(safe-area-inset-bottom))`
        : '40px'};
  box-sizing: border-box;
  text-align: center;
`;

const StateIcon = styled.span`
  display: flex;
  width: 54px;
  height: 54px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border-radius: ${theme.radius.lg};
  background: ${({ $variant }) =>
    $variant === 'error' ? theme.colors.status.error.background : theme.colors.highlight[10]};
  color: ${({ $variant }) =>
    $variant === 'error' ? theme.colors.status.error.text : theme.colors.primary};
  font-size: 20px;
  font-weight: 800;
`;

const StateTitle = styled.strong`
  color: ${theme.colors.text.primary};
  font-size: 16px;
  font-weight: 800;
`;

const StateDescription = styled.p`
  max-width: 280px;
  margin: 7px 0 0;
  color: ${theme.colors.text.tertiary};
  font-size: 13px;
  line-height: 1.55;
`;

const ActionButton = styled.button`
  min-height: 42px;
  margin-top: 18px;
  padding: 0 18px;
  border: 0;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;
