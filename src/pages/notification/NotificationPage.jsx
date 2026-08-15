import { useNavigate } from 'react-router-dom';
import Container from '../../components/common/Container';
import {
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
} from '../../query/notificationQueries';
import * as S from './NotificationPage.styles';

export default function NotificationPage() {
  const navigate = useNavigate();
  const { data: notifications = [], isLoading } = useNotifications();
  const markAsRead = useMarkNotificationRead();
  const markAllAsRead = useMarkAllNotificationsRead();

  const handleNotificationClick = async (notification) => {
    if (!notification.read) {
      await markAsRead.mutateAsync(notification.notificationId);
    }

    if (notification.chatRoomId && notification.shopId) {
      navigate(`/chat/${notification.chatRoomId}?shopId=${notification.shopId}`);
      return;
    }

    if (notification.reservationId) {
      navigate(`/reservations/${notification.reservationId}`);
    }
  };

  return (
    <Container $start>
      <S.Header>
        <S.BackButton type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">
          ‹
        </S.BackButton>
        <S.Title>알림</S.Title>
        <S.ReadAllButton
          type="button"
          onClick={() => markAllAsRead.mutate()}
          disabled={!notifications.some((notification) => !notification.read)}
        >
          모두 읽음
        </S.ReadAllButton>
      </S.Header>

      <S.List aria-live="polite">
        {isLoading && <S.Empty>알림을 불러오는 중입니다.</S.Empty>}
        {!isLoading && notifications.length === 0 && <S.Empty>새로운 알림이 없습니다.</S.Empty>}
        {notifications.map((notification) => (
          <S.NotificationItem
            key={notification.notificationId}
            type="button"
            $unread={!notification.read}
            onClick={() => handleNotificationClick(notification)}
          >
            <S.ItemHeader>
              <S.ItemTitle>{notification.title}</S.ItemTitle>
              {!notification.read && <S.UnreadDot aria-label="읽지 않음" />}
            </S.ItemHeader>
            <S.Body>{notification.body}</S.Body>
            <S.Time>{new Date(notification.createdAt).toLocaleString('ko-KR')}</S.Time>
          </S.NotificationItem>
        ))}
      </S.List>
    </Container>
  );
}
