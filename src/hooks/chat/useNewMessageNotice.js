import { useState, useEffect, useCallback } from 'react';

/**
 * 새 메시지 알림 카드 & 스크롤 동기화 훅
 * @param {Array} liveMessages - 현재 실시간 메시지 배열
 * @param {React.RefObject} messageListRef - 메시지 리스트 컨테이너 ref
 * @param {Function} scrollToBottom - 스크롤 이동 함수
 * @param {number} userId - 현재 사용자 ID
 * @returns {{
 *   showNewMessageCard: boolean,
 *   newMessagePreview: string,
 *   handleScroll: () => void,
 *   handleClickCard: () => void
 * }}
 */
export function useNewMessageNotice(liveMessages, messageListRef, scrollToBottom, userId) {
  const [showNewMessageCard, setShowNewMessageCard] = useState(false);
  const [newMessagePreview, setNewMessagePreview] = useState('');

  //스크롤 감지
  const handleScroll = useCallback(() => {
    const container = messageListRef.current;
    if (!container) return;

    //하단 주시 여부
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 30;

    //하단으로 스크롤 이동시 새 메시지 카드 X
    if (isAtBottom) setShowNewMessageCard(false);
  }, [messageListRef]);

  //새 메시지 수신 시 동작
  useEffect(() => {
    if (liveMessages.length === 0) return;

    const latest = liveMessages[liveMessages.length - 1];
    if (!latest || latest.senderId === userId) return; // 내가 보낸 건 제외

    // 내가 보낸 메시지 + silent 메시지 모두 제외
    if (latest.senderId === userId || latest?.isSilent) return;

    const container = messageListRef.current;
    if (!container) return;

    //현재 하단 주시 여부
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 15;

    if (isAtBottom) {
      scrollToBottom(true);
    } else {
      setShowNewMessageCard(true);
      setNewMessagePreview(
        latest.imageUrl ? latest.message?.trim() || '사진을 보냈습니다.' : latest.message ?? '예약 알림'
      );
    }
  }, [liveMessages, messageListRef, scrollToBottom, userId]);

  // 카드 클릭 핸들러
  const handleClickCard = useCallback(() => {
    scrollToBottom(true); //최하단 이동
    setShowNewMessageCard(false); //세 메시지 알림 카드 끄기
  }, [scrollToBottom]);

  return {
    showNewMessageCard,
    newMessagePreview,
    handleScroll,
    handleClickCard,
  };
}
