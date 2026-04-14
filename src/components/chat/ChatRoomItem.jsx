import { useNavigate } from 'react-router-dom';
import { truncateByVisualLength } from '../../utils/truncateByVisualLength';
import * as S from './ChatRoomItem.styles';
import { useAuth } from '../../context/AuthContext';

//메시지 최대 길이
const MAX_LENGTH = 30;

export default function ChatRoomItem({ room }) {
  const navigate = useNavigate();
  const {
    shopBusinessName,
    otherUserName,
    lastMessageSenderId,
    lastMessageContent,
    lastMessageAt,
    unreadCount,
  } = room;
  //현재 유저 정보 전역 상태
  const { auth } = useAuth();
  const userType = auth?.userType;

  //해당 채팅방 이동 헨들러
  const handleClick = () => {
    if (userType === 'OWNER') {
      // 점주: URL에 customerId(otherUserId), otherUserName(고객명) 추가
      navigate(
        `/chat/${room.chatRoomId}?shopId=${room.shopId}&customerId=${room.otherUserId}&title=${encodeURIComponent(otherUserName)}`
      );
    } else {
      //고객
      navigate(`/chat/${room.chatRoomId}?shopId=${room.shopId}`);
    }
  };

  //일정 길이 이상일때 마지막 메시지 길이 줄이기
  const resolvedPreview =
    lastMessageContent?.trim() ||
    (lastMessageSenderId === 0 ? '예약 알림' : '메시지를 확인해 주세요');

  const shortMessage = truncateByVisualLength(resolvedPreview, MAX_LENGTH);

  return (
    <S.Container>
      <S.Avatar>{otherUserName[0]}</S.Avatar>
      <S.InfoWrapper onClick={handleClick}>
        <S.TopRow>
          <S.ShopName>{userType === 'OWNER' ? otherUserName : shopBusinessName}</S.ShopName>
          <S.Time>
            {new Date(lastMessageAt).toLocaleTimeString('ko-KR', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </S.Time>
        </S.TopRow>
        <S.BottomRow>
          <S.LastMessage>{shortMessage}</S.LastMessage>
          {unreadCount > 0 && <S.UnreadBadge>{unreadCount}</S.UnreadBadge>}
        </S.BottomRow>
      </S.InfoWrapper>
    </S.Container>
  );
}
