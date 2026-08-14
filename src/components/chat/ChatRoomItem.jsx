import { useNavigate } from 'react-router-dom';
import { truncateByVisualLength } from '../../utils/truncateByVisualLength';
import { getChatRoomLastMessagePreview } from '../../utils/chatMessagePreview';
import * as S from './ChatRoomItem.styles';
import { useAuth } from '../../context/AuthContext';

//메시지 최대 길이
const MAX_LENGTH = 30;

const isSameDate = (left, right) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

const formatLastMessageAt = (value) => {
  if (!value) return '';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  if (isSameDate(date, new Date())) {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (isSameDate(date, yesterday)) return '어제';

  return date.toLocaleDateString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
  });
};

export default function ChatRoomItem({ room }) {
  const navigate = useNavigate();
  const { shopBusinessName, otherUserName, lastMessageAt, unreadCount } = room;
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
  const shortMessage = truncateByVisualLength(getChatRoomLastMessagePreview(room), MAX_LENGTH);

  return (
    <S.Container type="button" $unread={unreadCount > 0} onClick={handleClick}>
      <S.Avatar aria-hidden="true">
        {(userType === 'OWNER' ? otherUserName : shopBusinessName)?.trim()?.[0] || '?'}
      </S.Avatar>
      <S.InfoWrapper>
        <S.TopRow>
          <S.ShopName $unread={unreadCount > 0}>
            {userType === 'OWNER' ? otherUserName : shopBusinessName}
          </S.ShopName>
          <S.Time>{formatLastMessageAt(lastMessageAt)}</S.Time>
        </S.TopRow>
        <S.BottomRow>
          <S.LastMessage>{shortMessage}</S.LastMessage>
          {unreadCount > 0 && (
            <S.UnreadBadge aria-label={`읽지 않은 메시지 ${unreadCount}개`}>
              {unreadCount > 99 ? '99+' : unreadCount}
            </S.UnreadBadge>
          )}
        </S.BottomRow>
      </S.InfoWrapper>
    </S.Container>
  );
}
