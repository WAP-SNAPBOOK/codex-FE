import React from 'react';
import * as S from './MessageItem.style';
import { formatTime } from '../../utils/formatTime';
import ReservationDecisionMessage from '../message/ReservationDecisionMessage';
import DecisionCard from '../message/DecisionCard';
import { useAuth } from '../../context/AuthContext';

export default function MessageItem({ msg, isMine }) {
  const authContext = useAuth();
  const auth = authContext?.auth;
  const isOwner = auth?.userType === 'OWNER'; //점주 여부

  if (!msg?.isReservationCard && !msg?.message?.trim()) {
    return null;
  }

  // 예약 상태 카드 처리
  if (msg.isReservationCard) {
    let CardComponent = null;

    switch (msg.type) {
      case 'RESERVATION_CREATED':
        // 점주 → 수락/거절 카드
        if (isOwner) {
          CardComponent = <ReservationDecisionMessage reservation={msg.payload} />;
        } else {
          //일반 고객
          CardComponent = <ReservationDecisionMessage reservation={msg.payload} readOnly />;
        }

        break;

      case 'RESERVATION_CONFIRMED':
        CardComponent = (
          <DecisionCard
            variant="approved"
            customerName={msg.payload.customerName}
            dateText={msg.payload.date}
            timeText={msg.payload.time}
            durationMinutes={msg.payload.durationMinutes}
            detailInfo={msg.payload}
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
            detailInfo={msg.payload}
          />
        );
        break;

      case 'RESERVATION_UPDATED':
        CardComponent = (
          <DecisionCard
            variant="updated"
            customerName={msg.payload.customerName}
            dateText={msg.payload.date}
            timeText={msg.payload.time}
            durationMinutes={msg.payload.durationMinutes}
            description={msg.message}
            reservationChange={msg.reservationChange}
            ownerMessage={msg.ownerMessage}
            detailInfo={msg.payload}
          />
        );
        break;

      case 'RESERVATION_CANCELED':
        CardComponent = (
          <DecisionCard
            variant="canceled"
            customerName={msg.payload.customerName}
            dateText={msg.payload.date}
            timeText={msg.payload.time}
            description={msg.message}
            detailInfo={msg.payload}
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
