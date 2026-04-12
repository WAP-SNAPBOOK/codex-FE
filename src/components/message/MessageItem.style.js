import styled from 'styled-components';
import theme from '../../styles/theme';

export const MessageRow = styled.div`
  display: flex;
  justify-content: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  align-items: flex-end;
  gap: 4px;
  margin-bottom: 8px;
`;

export const Bubble = styled.div`
  max-width: 70%;
  align-self: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
  background-color: ${({ $isMine }) =>
    $isMine ? theme.colors.primary : theme.colors.gray.dark[50]};
  color: ${({ $isMine }) => ($isMine ? theme.colors.white : theme.colors.black)};
  padding: 10px 14px;
  border-radius: 16px;
  border-top-right-radius: ${({ $isMine }) => ($isMine ? '4px' : '16px')};
  border-top-left-radius: ${({ $isMine }) => ($isMine ? '16px' : '4px')};
  word-break: break-word;
  font-size: 14px;
`;

export const ImageMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $isMine }) => ($isMine ? 'flex-end' : 'flex-start')};
`;

export const ImageBubble = styled.button`
  width: 220px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const MessageImage = styled.img`
  display: block;
  width: 100%;
  border-radius: 18px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
`;

export const CaptionBubble = styled(Bubble)`
  margin-top: 6px;
`;

export const Time = styled.span`
  font-size: 11px;
  color: ${theme.colors.black[50]};
`;
