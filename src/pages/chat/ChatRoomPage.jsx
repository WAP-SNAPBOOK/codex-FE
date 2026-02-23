import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { useSendMessage, useChatMessages } from '../../query/chatQueries';
import { chatSocketService } from '../../api/services/chatSocketService';
import Container from '../../components/common/Container';
import * as S from './ChatRoomPage.style';
import backIcon from '../../assets/icons/back-icon.svg';
import { ChatRoomTitle } from '../../components/title/SignupTitle';
import ReservationModal from '../../components/reservation/ReservationModal';
import { authStorage } from '../../utils/auth/authStorage';
import { useAuth } from '../../context/AuthContext';
import { usePreserveScrollPosition } from '../../hooks/chat/usePreserveScrollPosition';
import { useTopObserver } from '../../hooks/chat/useTopObserver';
import { useShopInfoByCode } from '../../query/linkQueries';
import AddMenuButton from '../../components/chat/AddMenuButton';
import ChatMenuPanel from '../../components/chat/ChatMenuPanel';
import ChatSumbitButton from '../../components/chat/chatSumbitButton';
import MessageList from '../../components/message/MessageList';
import { useOptimisticMessage } from '../../hooks/chat/useOptimisticMessage';
import { useQueryClient } from '@tanstack/react-query';
import { useNewMessageNotice } from '../../hooks/chat/useNewMessageNotice';
import NewMessageCard from '../../components/notification/NewMessageCard';
import InAppGuideBar from '../../components/common/InAppGuideBar';
import { useShopInfoById } from '../../query/shopQueries';
import { useInitFullReadyScroll } from '../../hooks/chat/useInitFullReadyScroll';
import { useNormalizedMessages } from '../../hooks/chat/useNormalizedMessages';
import { useReservationSocketHandler } from '../../hooks/chat/useReservationSocketHandler';

export default function ChatRoomPage() {
  const [input, setInput] = useState(''); //메시지 입력 상태
  const [liveMessages, setLiveMessages] = useState([]); //실시간 추가 메시지 상태
  const [readyToObserve, setReadyToObserve] = useState(false); //옵저버 등록 제어 상태

  //메뉴 표시 여부 상태
  const [showMenu, setShowMenu] = useState(false);

  //전역 상태 사용자 ID
  const { auth } = useAuth();
  const userId = auth?.userId;
  const userType = auth?.userType; // CUSTOMER / OWNER

  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();

  //점주 입장의 채팅방 이름(상대 고객명)
  const titleFromQuery = searchParams.get('title');

  //매장 식별 코드
  const slugOrCode = searchParams.get('slug');

  //매장 id
  const shopIdFromQuery = searchParams.get('shopId') ? Number(searchParams.get('shopId')) : null;

  //링크 유입시 가게 정보 조회
  const { data: shopInfoBySlug } = useShopInfoByCode(slugOrCode);

  //일반 유입시 가게 id조회
  const { data: shopInfoById } = useShopInfoById(shopIdFromQuery);

  //매장 정보 하나로 통합(같은 응답 구조)
  const shopInfo = shopInfoBySlug || shopInfoById;

  //유저 타입(고객, 점주)에 따른 채팅방 이름
  const headerTitle =
    userType === 'OWNER' ? titleFromQuery || '채팅방' : shopInfo?.shopName || '채팅방';

  const accessToken = authStorage.getAccessToken();

  //해당 채팅방 ID
  const { chatRoomId } = useParams();

  const queryClient = useQueryClient();

  //메세지 전송 관련 훅
  const { addOptimisticMessage, replaceWithServerMessage } = useOptimisticMessage(
    setLiveMessages,
    userId,
    chatRoomId
  );

  // 기존 메시지, cursor (HTTP GET 기반)
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useChatMessages(chatRoomId);

  const handleBack = () => {
    // 외부 링크 유입(slug), 홈으로 강제 이동
    if (slugOrCode) {
      navigate('/', { replace: true });
      return;
    }

    // 내부 유입(웹, PWA 내부에서 이동)
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  //버튼 토글 핸들러
  const handleToggleMenu = () => {
    // 메뉴 표시/숨김 토글
    setTimeout(() => {
      setShowMenu((prev) => !prev);
    }, 150);
  };

  //스크롤 위치 제어용 ref
  const messageListRef = useRef(null);
  //스크롤 감지용 ref
  const topObserverRef = useRef(null);
  //스크롤 제어 ref
  const bottomRef = useRef(null);

  //초기 메시지 조회 정보
  const rawOldMessages = useMemo(
    () => data?.pages.flatMap((p) => p.messages).reverse() ?? [],
    [data]
  );

  //각 예약 정보를 가져 올 수 있도록 정규화
  const normalizedOldMessages = useNormalizedMessages(rawOldMessages);

  //이전 메시지 preappend
  const mergedMessages = useMemo(() => {
    const map = new Map();

    //messageId를 키로 덮어 씌우기(중복 방지)
    [...normalizedOldMessages, ...liveMessages].forEach((m) => {
      if (!m.messageId) return;
      map.set(m.messageId, m);
    });

    return Array.from(map.values());
  }, [normalizedOldMessages, liveMessages]);

  //메시지 전송 훅
  const { mutate: sendMessage } = useSendMessage(chatRoomId, (message) => {
    //메시지 낙관적 업데이트
    addOptimisticMessage(message);
  });

  // React Query 캐시 초기화
  useEffect(() => {
    return () => {
      queryClient.removeQueries(['messages', chatRoomId]);
    };
  }, [chatRoomId]);

  //실시간 예약 상태 메시지 처리 훅
  const { handleReservationMessage } = useReservationSocketHandler(setLiveMessages);

  //WebSocket 연결
  useEffect(() => {
    chatSocketService.connect(accessToken, () => {
      chatSocketService.subscribe(chatRoomId, async (incoming) => {
        const handled = await handleReservationMessage(incoming);

        if (handled) return;

        // 예약 메시지가 아니면 일반 메시지 처리
        replaceWithServerMessage(incoming);
      });
    });

    return () => {
      chatSocketService.disconnect();
    };
  }, [chatRoomId, replaceWithServerMessage]);

  //스크롤 제어(새로운 메시지 추가시 추가된 매시지 보기)
  // 메시지 전송 후 호출, behavior를 선택 가능
  const scrollToBottom = (smooth = false) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  };

  // 실시간(내가 보낸 메시지)일 때만 하단 이동
  useEffect(() => {
    if (liveMessages.length === 0) return;

    const latest = liveMessages[liveMessages.length - 1];

    //내가 보낸 메시지일 때만 스크롤
    if (latest.senderId === userId) {
      scrollToBottom(true);
    }
  }, [liveMessages]);

  // 새 메시지 관련 스크롤 동기화 훅
  const { showNewMessageCard, newMessagePreview, handleScroll, handleClickCard } =
    useNewMessageNotice(liveMessages, messageListRef, scrollToBottom, userId);

  //메시지 prepend시 스크롤 제어
  usePreserveScrollPosition(messageListRef, isFetchingNextPage);

  //상단 스크롤 제어를 통한 fetch 훅
  useTopObserver(
    isSuccess,
    readyToObserve,
    topObserverRef,
    messageListRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  );

  // 메시지 전송 핸들러
  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput('');
  };

  //예약 생성 페이지 이동 헨들러
  const handleClickReservation = () => {
    if (!shopInfo?.shopId) return; //shopId 없을 시 예약 진행 X

    navigate(`/shops/${shopInfo.shopId}/reservations/create`, {
      state: {
        //돌아올 경로 확정(채팅방) - 현재 쿼리 파라미터 포함
        returnTo: `/chat/${chatRoomId}${location.search}`,
      },
    });
  };

  //페이지 첫 마운트 시 스크롤 하단 제어
  useInitFullReadyScroll(
    data,
    mergedMessages,
    isFetchingNextPage,
    readyToObserve,
    scrollToBottom,
    setReadyToObserve
  );

  return (
    <Container $start>
      <S.PageWrapper>
        <div className="absolute bottom-[80px] left-3 z-20">
          <InAppGuideBar />
        </div>
        <S.Header>
          <S.BackButton onClick={handleBack}>
            <img src={backIcon} alt="back" />
          </S.BackButton>
          <ChatRoomTitle>{headerTitle}</ChatRoomTitle>
          <S.BookButton onClick={handleClickReservation}>예약</S.BookButton>
        </S.Header>
        <S.Messages ref={messageListRef} onScroll={handleScroll}>
          {/*상단 스크롤 감지용 */}
          <div ref={topObserverRef} />
          <MessageList messages={mergedMessages} userId={userId} />
          {/* 하단 스크롤 고정용 */}
          <div ref={bottomRef} />
        </S.Messages>
        {/* 채팅 메뉴 패널 */}
        <ChatMenuPanel visible={showMenu} />
        {/*새 메시지 알림 카드 */}
        {
          <NewMessageCard
            preview={newMessagePreview}
            onClick={handleClickCard}
            visible={showNewMessageCard}
          />
        }

        <S.InputBar>
          {/* 채팅 메뉴 목록 버튼 */}
          <AddMenuButton onToggleMenu={handleToggleMenu} />
          {/* 채팅 입력 바 */}
          <S.ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            maxLength={300}
            onFocus={() => setShowMenu(false)} //키보드 열릴때 메뉴 닫기
          />
          {/*채팅 전송 버튼*/}
          <ChatSumbitButton onClick={handleSend} />
        </S.InputBar>
      </S.PageWrapper>
    </Container>
  );
}
