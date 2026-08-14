import React from 'react';
import ChatRoomItem from '../../components/chat/ChatRoomItem';
import * as S from './ChatListPage.Style';
import Container from '../../components/common/Container';
import { useChatRooms } from '../../query/chatQueries';
import BottomNav from '../../components/common/BottomNav';
import { useAuth } from '../../context/AuthContext';

export default function ChatListPage() {
  const { auth } = useAuth();
  const isOwner = auth?.userType === 'OWNER';
  const { data: rooms = [], isLoading, isError, refetch } = useChatRooms();

  return (
    <Container $start>
      <S.PageWrapper>
        <S.HeaderBar>
          <S.Header>채팅</S.Header>
          <S.Description>
            {isOwner ? '고객 문의와 상담을 확인하세요.' : '매장과 나눈 대화를 확인하세요.'}
          </S.Description>
        </S.HeaderBar>
        {isLoading && <ChatListState title="대화를 불러오고 있어요" />}
        {!isLoading && isError && (
          <ChatListState
            title="대화를 불러오지 못했어요"
            description="잠시 후 다시 시도해 주세요."
            actionLabel="다시 시도"
            onAction={refetch}
            isError
          />
        )}
        {!isLoading && !isError && rooms.length === 0 && (
          <ChatListState
            title="아직 대화가 없어요"
            description={
              isOwner
                ? '고객이 문의를 시작하면 이곳에서 바로 확인할 수 있어요.'
                : '매장에 문의를 시작하면 이곳에서 대화를 이어갈 수 있어요.'
            }
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

function ChatListState({ title, description, actionLabel, onAction, isError = false }) {
  return (
    <S.StateBox role={isError ? 'alert' : 'status'}>
      <S.StateIcon $error={isError} aria-hidden="true">
        {isError ? '!' : '···'}
      </S.StateIcon>
      <S.StateTitle>{title}</S.StateTitle>
      {description && <S.StateDescription>{description}</S.StateDescription>}
      {actionLabel && (
        <S.RetryButton type="button" onClick={onAction}>
          {actionLabel}
        </S.RetryButton>
      )}
    </S.StateBox>
  );
}
