import React from 'react';
import { chatRoomsMockData } from '../../data/chatRoomsMockData';
import ChatRoomItem from '../../components/chat/ChatRoomItem';
import * as S from './ChatListPage.Style';
import Container from '../../components/common/Container';
import MenuIcon from '../../assets/menus/chatMenu-icon.svg';
import { useChatRooms } from '../../query/chatQueries';
import { useNavigate } from 'react-router-dom';
import backIcon from '../../assets/icons/back-icon.svg';

export default function ChatListPage() {
  const navigate = useNavigate();
  const { data: rooms } = useChatRooms();

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  return (
    <Container $start>
      <S.PageWrapper>
        <S.HeaderBar>
          <S.BackButton type="button" aria-label="뒤로가기" onClick={handleBack}>
            <img src={backIcon} alt="back" />
          </S.BackButton>
          <S.Header>채팅</S.Header>
          <S.MenuButton>
            <img src={MenuIcon} alt="menu" />
          </S.MenuButton>
        </S.HeaderBar>
        <S.RoomList>
          {rooms?.map((room) => (
            <ChatRoomItem key={room.chatRoomId} room={room} />
          ))}
        </S.RoomList>
      </S.PageWrapper>
    </Container>
  );
}
