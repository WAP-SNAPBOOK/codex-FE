import React, { useState } from 'react';
import * as S from './MessageItem.style';
import { formatTime } from '../../utils/formatTime';
import ReservationCompleteMessage from '../message/ReservationCompleteMessage';
import ReservationDecisionMessage from '../message/ReservationDecisionMessage';
import DecisionCard from '../message/DecisionCard';
import { useAuth } from '../../context/AuthContext';
import ImageModal from '../modal/ImageModal';

export default function MessageItem({ msg, isMine, reservationUpdates }) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const authContext = useAuth();
  const auth = authContext?.auth;
  const isOwner = auth?.userType === 'OWNER'; //점주 여부
  const reservationId = msg?.reservationId ?? msg?.payload?.id;
  const reservationUpdate = reservationId ? reservationUpdates?.get(reservationId) : null;
  const resolvedReservation =
    msg?.type === 'RESERVATION_CREATED' && reservationUpdate
      ? {
          ...msg.payload,
          ...reservationUpdate,
        }
      : msg.payload;

  if (!msg?.isReservationCard && !msg?.message?.trim() && !msg?.imageUrl) {
    return null;
  }

  // 예약 상태 카드 처리
  if (msg.isReservationCard) {
    let CardComponent = null;

    switch (msg.type) {
      case 'RESERVATION_CREATED':
        // 점주 → 수락/거절 카드
        if (isOwner) {
          CardComponent = <ReservationDecisionMessage reservation={resolvedReservation} />;
        } else {
          //일반 고객
          CardComponent = <ReservationCompleteMessage reservation={resolvedReservation} />;
        }

        break;

      case 'RESERVATION_CONFIRMED':
        CardComponent = (
          <DecisionCard
            variant="approved"
            customerName={msg.payload.customerName}
            dateText={msg.payload.date}
            timeText={msg.payload.time}
            noteText={msg.payload.confirmationMessage ?? msg.payload.message}
          />
        );
        break;

      case 'RESERVATION_REJECTED':
        CardComponent = (
          <DecisionCard
            variant="rejected"
            customerName={msg.payload.customerName}
            dateText={msg.payload.date}
            timeText={msg.payload.time}
            noteText={
              msg.payload.rejectionReason ??
              msg.payload.rejectReason ??
              '예약이 불가한 시간입니다.'
            }
          />
        );
        break;
    }

    return (
      <S.MessageRow $isMine={false}>
        <S.Bubble $isMine={false}>{CardComponent}</S.Bubble>
        <S.Time>{formatTime(msg.sentAt)}</S.Time>
      </S.MessageRow>
    );
  }

  if (msg.imageUrl) {
    return (
      <S.MessageRow $isMine={isMine}>
        {isMine ? (
          <>
            <S.Time>{formatTime(msg.sentAt)}</S.Time>
            <S.ImageMessage $isMine>
              <S.ImageBubble type="button" onClick={() => setIsImageOpen(true)}>
                <S.MessageImage src={msg.imageUrl} alt="chat attachment" />
              </S.ImageBubble>
              {msg.message?.trim() ? <S.CaptionBubble $isMine>{msg.message}</S.CaptionBubble> : null}
            </S.ImageMessage>
          </>
        ) : (
          <>
            <S.ImageMessage $isMine={false}>
              <S.ImageBubble type="button" onClick={() => setIsImageOpen(true)}>
                <S.MessageImage src={msg.imageUrl} alt="chat attachment" />
              </S.ImageBubble>
              {msg.message?.trim() ? (
                <S.CaptionBubble $isMine={false}>{msg.message}</S.CaptionBubble>
              ) : null}
            </S.ImageMessage>
            <S.Time>{formatTime(msg.sentAt)}</S.Time>
          </>
        )}
        {isImageOpen ? <ImageModal src={msg.imageUrl} onClose={() => setIsImageOpen(false)} /> : null}
      </S.MessageRow>
    );
  }

  //일반 메시지 처리
  return (
    <S.MessageRow $isMine={isMine}>
      {/*상대방, 본인 메시지에 따른 정렬 */}
      {isMine ? (
        <>
          <S.Time>{formatTime(msg.sentAt)}</S.Time>
          <S.Bubble $isMine>{msg.message}</S.Bubble>
        </>
      ) : (
        <>
          <S.Bubble $isMine={false}>{msg.message}</S.Bubble>
          <S.Time>{formatTime(msg.sentAt)}</S.Time>
        </>
      )}
    </S.MessageRow>
  );
}
