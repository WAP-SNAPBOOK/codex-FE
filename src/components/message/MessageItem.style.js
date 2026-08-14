import styled from 'styled-components';
import theme from '../../styles/theme';

export const MessageRow = styled.div`
  display: flex;
  justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  align-items: flex-end;
  gap: 6px;
  margin-bottom: 6px;
`;

export const Bubble = styled.div`
  max-width: ${({ $isCard }) => ($isCard ? '100%' : '78%')};
  align-self: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  padding: ${({ $isCard }) => ($isCard ? '0' : '10px 13px')};
  border: ${({ $isCard, $isMine }) =>
    $isCard || $isMine ? '0' : `1px solid ${theme.colors.border.DEFAULT}`};
  border-radius: ${({ $isCard }) => ($isCard ? '0' : theme.radius.lg)};
  border-top-right-radius: ${({ $isMine, $isCard }) =>
    $isCard ? '0' : $isMine ? '5px' : theme.radius.lg};
  border-top-left-radius: ${({ $isMine, $isCard }) =>
    $isCard ? '0' : $isMine ? theme.radius.lg : '5px'};
  background: ${({ $isMine, $isCard }) =>
    $isCard ? 'transparent' : $isMine ? theme.colors.primary : theme.colors.surface.DEFAULT};
  color: ${({ $isMine }) => ($isMine ? theme.colors.text.inverse : theme.colors.text.primary)};
  word-break: break-word;
  font-size: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
`;

export const Time = styled.span`
  flex: 0 0 auto;
  font-size: 11px;
  color: ${theme.colors.text.tertiary};
`;
