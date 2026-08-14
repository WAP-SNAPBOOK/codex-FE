import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useShopLink } from '../../query/linkQueries';
import { useShopInfoById } from '../../query/shopQueries';
import { useChatRooms } from '../../query/chatQueries';
import { useMyReservations, useOwnerReservationCalendar } from '../../query/reservationQueries';
import { getShopProfileLink } from '../../utils/shopProfileLink';
import * as S from './HomePage.styles';
import Container from '../../components/common/Container';
import MainActionButton from '../../components/home/MainActionButton ';
import BottomNav from '../../components/common/BottomNav';
import StatusBadge from '../../components/common/StatusBadge';
import { SkeletonBlock } from '../../components/common/Skeleton';
import { useToast } from '../../components/common/ToastProvider';

const ACTIVE_RESERVATION_STATUSES = new Set(['PENDING', 'CONFIRMED']);

const STATUS_LABELS = {
  PENDING: '확인 대기',
  CONFIRMED: '예약 확정',
};

const STATUS_TONES = {
  PENDING: 'pending',
  CONFIRMED: 'success',
};

const CalendarIcon = () => (
  <svg viewBox="0 0 32 32">
    <rect x="5" y="7" width="22" height="20" rx="3" />
    <path d="M10 4.5v5M22 4.5v5M5 12h22M10 17h4M10 22h8" />
  </svg>
);

const ReservationIcon = () => (
  <svg viewBox="0 0 32 32">
    <path d="M8 5h13l4 4v18H8z" />
    <path d="M21 5v5h5M12 15h9M12 20h6" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 32 32">
    <path d="M27 15.3c0 5.7-4.9 10.2-11 10.2-1.5 0-3-.3-4.3-.8l-6.1 2.1 2-5.3A9.7 9.7 0 0 1 5 15.3C5 9.7 9.9 5.2 16 5.2s11 4.5 11 10.1Z" />
    <path d="M10.5 15.5h.1M15.9 15.5h.1M21.3 15.5h.1" />
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="4" width="4" height="4" rx="1" />
    <rect x="3" y="10" width="4" height="4" rx="1" />
    <rect x="3" y="16" width="4" height="4" rx="1" />
    <path d="M11 6h10M11 12h10M11 18h10" />
  </svg>
);

const LinkIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M9.5 14.5 14.5 9.5M8 17H6.5a4.5 4.5 0 0 1 0-9H10M16 7h1.5a4.5 4.5 0 1 1 0 9H14" />
  </svg>
);

const toReservationDateTime = (reservation) =>
  dayjs(`${reservation?.date}T${reservation?.time || '00:00'}`);

const getNextReservation = (reservations) => {
  const now = dayjs();

  return [...(Array.isArray(reservations) ? reservations : [])]
    .filter((reservation) => ACTIVE_RESERVATION_STATUSES.has(reservation.status))
    .map((reservation) => ({ reservation, dateTime: toReservationDateTime(reservation) }))
    .filter(({ dateTime }) => dateTime.isValid() && !dateTime.isBefore(now))
    .sort((left, right) => left.dateTime.valueOf() - right.dateTime.valueOf())[0]?.reservation;
};

const formatReservationDateTime = (reservation) => {
  const dateTime = toReservationDateTime(reservation);
  if (!dateTime.isValid()) return '예약 일시 확인 필요';

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateTime.toDate());
};

const getCalendarReservations = (calendar) =>
  (calendar?.timeline?.staffColumns ?? []).flatMap((column) => column.reservations ?? []);

export default function HomePage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { showToast } = useToast();
  const isOwner = auth?.userType === 'OWNER';
  const today = dayjs().format('YYYY-MM-DD');

  const {
    data: customerReservations = [],
    isLoading: isCustomerReservationsLoading,
    isError: isCustomerReservationsError,
    refetch: refetchCustomerReservations,
  } = useMyReservations({ enabled: !isOwner });

  const {
    data: shopLink,
    isLoading: isShopLinkLoading,
    isError: isShopLinkError,
    refetch: refetchShopLink,
  } = useShopLink({ enabled: isOwner });
  const shopId = isOwner ? shopLink?.shopId : null;
  const { data: shopInfo } = useShopInfoById(shopId);
  const {
    data: ownerCalendar,
    isLoading: isOwnerCalendarLoading,
    isError: isOwnerCalendarError,
    refetch: refetchOwnerCalendar,
  } = useOwnerReservationCalendar(shopId, { date: today });
  const {
    data: chatRooms = [],
    isLoading: isChatRoomsLoading,
    isError: isChatRoomsError,
    refetch: refetchChatRooms,
  } = useChatRooms({ enabled: isOwner });

  const nextReservation = useMemo(
    () => getNextReservation(customerReservations),
    [customerReservations]
  );
  const ownerReservations = useMemo(() => getCalendarReservations(ownerCalendar), [ownerCalendar]);
  const todayReservationCount = ownerReservations.length;
  const pendingReservationCount = ownerReservations.filter(
    (reservation) => reservation.status === 'PENDING'
  ).length;
  const unreadChatCount = chatRooms.reduce(
    (total, room) => total + Math.max(Number(room.unreadCount) || 0, 0),
    0
  );

  const isOwnerSummaryLoading = isShopLinkLoading || isOwnerCalendarLoading || isChatRoomsLoading;
  const isOwnerSummaryError = isShopLinkError || isOwnerCalendarError || isChatRoomsError;

  const retryOwnerSummary = () => {
    if (isShopLinkError) refetchShopLink();
    if (isOwnerCalendarError && shopId) refetchOwnerCalendar();
    if (isChatRoomsError) refetchChatRooms();
  };

  const shareShopLink = async () => {
    const shopProfileLink = getShopProfileLink(shopLink);
    if (!shopProfileLink) {
      showToast('공유할 매장 링크를 불러오지 못했어요.', { tone: 'error' });
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${shopInfo?.shopName || 'SNAPBOOK 매장'} 예약 링크`,
          text: '아래 링크에서 예약과 상담을 시작해보세요.',
          url: shopProfileLink,
        });
        showToast('공유가 완료되었습니다.', { tone: 'success' });
        return;
      }

      await navigator.clipboard.writeText(shopProfileLink);
      showToast('예약 링크가 복사되었습니다.', { tone: 'success' });
    } catch (error) {
      if (error?.name === 'AbortError') return;
      showToast('공유하지 못했습니다. 잠시 후 다시 시도해주세요.', { tone: 'error' });
    }
  };

  return (
    <Container $start>
      <S.PageWrapper>
        <S.HomeHeader>
          <S.Brand>SNAPBOOK</S.Brand>
        </S.HomeHeader>

        <S.Content>
          <S.WelcomeSection>
            <S.Greeting>
              {isOwner
                ? `${shopInfo?.shopName || auth?.name || '매장'} 사장님, 안녕하세요.`
                : `${auth?.name || '고객'}님, 반가워요.`}
            </S.Greeting>
            <S.Introduction>
              {isOwner
                ? '오늘 매장 현황과 확인할 업무를 바로 살펴보세요.'
                : '가장 가까운 예약과 매장 문의를 한곳에서 확인하세요.'}
            </S.Introduction>
          </S.WelcomeSection>

          {isOwner ? (
            <OwnerDashboard
              isLoading={isOwnerSummaryLoading}
              isError={isOwnerSummaryError}
              todayReservationCount={todayReservationCount}
              pendingReservationCount={pendingReservationCount}
              unreadChatCount={unreadChatCount}
              shopReady={!!shopId}
              onRetry={retryOwnerSummary}
              onNavigate={navigate}
              onShare={shareShopLink}
            />
          ) : (
            <CustomerDashboard
              isLoading={isCustomerReservationsLoading}
              isError={isCustomerReservationsError}
              nextReservation={nextReservation}
              onRetry={refetchCustomerReservations}
              onNavigate={navigate}
            />
          )}
        </S.Content>

        <BottomNav />
      </S.PageWrapper>
    </Container>
  );
}

function OwnerDashboard({
  isLoading,
  isError,
  todayReservationCount,
  pendingReservationCount,
  unreadChatCount,
  shopReady,
  onRetry,
  onNavigate,
  onShare,
}) {
  return (
    <>
      <S.DashboardSection>
        <S.SectionTitle>오늘 매장 현황</S.SectionTitle>
        <S.SummaryGrid aria-busy={isLoading}>
          <SummaryCard label="오늘 예약" value={todayReservationCount} isLoading={isLoading} />
          <SummaryCard
            label="확인 대기"
            value={pendingReservationCount}
            isLoading={isLoading}
            tone="pending"
          />
          <SummaryCard
            label="읽지 않은 채팅"
            value={unreadChatCount}
            isLoading={isLoading}
            tone="info"
          />
        </S.SummaryGrid>
        {isError ? (
          <S.InlineNotice role="alert">
            <span>일부 현황을 불러오지 못했어요.</span>
            <button type="button" onClick={onRetry}>
              다시 시도
            </button>
          </S.InlineNotice>
        ) : null}
      </S.DashboardSection>

      <S.ActionSection>
        <S.SectionTitle>지금 확인할 업무</S.SectionTitle>
        <S.ActionList>
          <MainActionButton
            onClick={() => onNavigate('/reservations')}
            icon={<CalendarIcon />}
            label="오늘 예약 확인"
            description={
              isLoading ? '예약 현황을 불러오고 있어요' : `오늘 예약 ${todayReservationCount}건`
            }
          />
          <MainActionButton
            onClick={() => onNavigate('/chat')}
            icon={<ChatIcon />}
            label="채팅 확인"
            description={
              isLoading
                ? '채팅 현황을 불러오고 있어요'
                : unreadChatCount > 0
                  ? `읽지 않은 메시지 ${unreadChatCount}개`
                  : '새로운 문의가 없어요'
            }
          />
        </S.ActionList>
      </S.ActionSection>

      <S.QuickSection>
        <S.SectionTitle>매장 관리</S.SectionTitle>
        <S.QuickGrid>
          <QuickAction
            label="예약 캘린더"
            icon={<CalendarIcon />}
            onClick={() => onNavigate('/reservations')}
          />
          <QuickAction
            label="메뉴 관리"
            icon={<MenuIcon />}
            disabled={!shopReady}
            onClick={() => onNavigate('/mypage/menus')}
          />
          <QuickAction
            label="링크 공유"
            icon={<LinkIcon />}
            disabled={!shopReady}
            onClick={onShare}
          />
        </S.QuickGrid>
      </S.QuickSection>
    </>
  );
}

function CustomerDashboard({ isLoading, isError, nextReservation, onRetry, onNavigate }) {
  return (
    <>
      <S.DashboardSection>
        <S.SectionTitle>다가오는 예약</S.SectionTitle>
        {isLoading ? (
          <S.UpcomingCard aria-label="다가오는 예약을 불러오는 중">
            <SkeletonBlock $width="44%" $height="16px" />
            <SkeletonBlock $width="72%" $height="13px" />
            <SkeletonBlock $width="100%" $height="44px" $radius="12px" />
          </S.UpcomingCard>
        ) : isError ? (
          <S.EmptyUpcomingCard role="alert">
            <S.EmptyTitle>예약을 불러오지 못했어요</S.EmptyTitle>
            <S.EmptyDescription>주요 메뉴는 계속 이용할 수 있습니다.</S.EmptyDescription>
            <S.InlineButton type="button" onClick={onRetry}>
              다시 시도
            </S.InlineButton>
          </S.EmptyUpcomingCard>
        ) : nextReservation ? (
          <S.UpcomingCard>
            <S.UpcomingHeader>
              <S.UpcomingShop>{nextReservation.shopName || '예약 매장'}</S.UpcomingShop>
              <StatusBadge tone={STATUS_TONES[nextReservation.status] || 'neutral'}>
                {STATUS_LABELS[nextReservation.status] || '상태 확인'}
              </StatusBadge>
            </S.UpcomingHeader>
            <S.UpcomingDate>{formatReservationDateTime(nextReservation)}</S.UpcomingDate>
            <S.CardAction type="button" onClick={() => onNavigate('/reservations')}>
              예약 확인하기
              <span aria-hidden="true">›</span>
            </S.CardAction>
          </S.UpcomingCard>
        ) : (
          <S.EmptyUpcomingCard>
            <S.EmptyIcon aria-hidden="true">
              <ReservationIcon />
            </S.EmptyIcon>
            <S.EmptyTitle>예정된 예약이 없어요</S.EmptyTitle>
            <S.EmptyDescription>
              예약한 매장과 채팅을 시작하면 문의를 이어갈 수 있어요.
            </S.EmptyDescription>
            <S.InlineButton type="button" onClick={() => onNavigate('/chat')}>
              채팅 보기
            </S.InlineButton>
          </S.EmptyUpcomingCard>
        )}
      </S.DashboardSection>

      <S.ActionSection>
        <S.SectionTitle>바로가기</S.SectionTitle>
        <S.ActionList>
          <MainActionButton
            onClick={() => onNavigate('/reservations')}
            icon={<ReservationIcon />}
            label="내 예약"
            description="신청한 예약과 진행 상태를 확인해요"
          />
          <MainActionButton
            onClick={() => onNavigate('/chat')}
            icon={<ChatIcon />}
            label="채팅"
            description="매장과 나눈 대화를 확인해요"
          />
        </S.ActionList>
      </S.ActionSection>
    </>
  );
}

function SummaryCard({ label, value, isLoading, tone = 'default' }) {
  return (
    <S.SummaryCard $tone={tone}>
      <S.SummaryLabel>{label}</S.SummaryLabel>
      <S.SummaryValue>{isLoading ? '—' : value}</S.SummaryValue>
      {isLoading ? null : <S.SummaryUnit>건</S.SummaryUnit>}
    </S.SummaryCard>
  );
}

function QuickAction({ label, icon, onClick, disabled = false }) {
  return (
    <S.QuickActionButton type="button" disabled={disabled} onClick={onClick}>
      <S.QuickIcon aria-hidden="true">{icon}</S.QuickIcon>
      <span>{label}</span>
    </S.QuickActionButton>
  );
}
