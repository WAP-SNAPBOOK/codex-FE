import React from 'react';
import ChatRoomItem from '../../components/chat/ChatRoomItem';
import * as S from './ChatListPage.Style';
import Container from '../../components/common/Container';
import { useChatRooms } from '../../query/chatQueries';
import BottomNav from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/common/Header';
import AsyncState from '../../components/common/AsyncState';
import { ListSkeleton } from '../../components/common/Skeleton';

export default function ChatListPage() {
  const { auth } = useAuth();
  const isOwner = auth?.userType === 'OWNER';
  const { data: rooms = [], isLoading, isError, refetch } = useChatRooms();

  return (
    <Container $start>
      <S.PageWrapper>
        <Header
          title="채팅"
          description={
            isOwner ? '고객 문의와 상담을 확인하세요.' : '매장과 나눈 대화를 확인하세요.'
          }
        />
        {isLoading && (
          <S.RoomList>
            <ListSkeleton label="대화를 불러오는 중" />
          </S.RoomList>
        )}
        {!isLoading && isError && (
          <AsyncState
            variant="error"
            title="대화를 불러오지 못했어요"
            description="잠시 후 다시 시도해 주세요."
            actionLabel="다시 시도"
            onAction={refetch}
            withBottomNav
          />
        )}
        {!isLoading && !isError && rooms.length === 0 && (
          <AsyncState
            title="아직 대화가 없어요"
            description={
              isOwner
                ? '고객이 문의를 시작하면 이곳에서 바로 확인할 수 있어요.'
                : '매장에 문의를 시작하면 이곳에서 대화를 이어갈 수 있어요.'
            }
            withBottomNav
          />
        )}
        {!isLoading && !isError && rooms.length > 0 && (
          <S.RoomList aria-label="채팅방 목록">
            {rooms.map((room) => (
              <ChatRoomItem key={room.chatRoomId} room={room} />
            ))}
          </S.RoomList>
        )}
        <BottomNav />
      </S.PageWrapper>
    </Container>
  );
}
