import styled from 'styled-components';

export const Header = styled.header`
  display: grid;
  grid-template-columns: 72px 1fr 72px;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid #eceef2;
`;

export const BackButton = styled.button`
  justify-self: start;
  border: 0;
  background: transparent;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 20px;
`;

export const ReadAllButton = styled.button`
  justify-self: end;
  border: 0;
  background: transparent;
  color: #f08080;
  font-size: 13px;
  cursor: pointer;

  &:disabled {
    color: #b8bbc2;
    cursor: default;
  }
`;

export const List = styled.main`
  width: 100%;
`;

export const NotificationItem = styled.button`
  display: block;
  width: 100%;
  padding: 18px 20px;
  border: 0;
  border-bottom: 1px solid #eceef2;
  background: ${({ $unread }) => ($unread ? '#fff7f7' : '#ffffff')};
  text-align: left;
  cursor: pointer;
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const ItemTitle = styled.strong`
  color: #23252a;
  font-size: 15px;
`;

export const UnreadDot = styled.span`
  width: 8px;
  height: 8px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: #f08080;
`;

export const Body = styled.p`
  margin: 8px 0 0;
  color: #5d6068;
  font-size: 14px;
  line-height: 1.5;
`;

export const Time = styled.time`
  display: block;
  margin-top: 10px;
  color: #9a9da5;
  font-size: 12px;
`;

export const Empty = styled.p`
  margin: 0;
  padding: 80px 20px;
  color: #8b8e96;
  text-align: center;
`;
