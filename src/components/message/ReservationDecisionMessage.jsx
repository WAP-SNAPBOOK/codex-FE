import React, { useState } from 'react';
import * as S from './ReservationDecisionMessage.style';
import { useConfirmReservation, useRejectReservation } from '../../query/reservationQueries';
import ReservationInfoView from '../reservation/ReservationInfoView';
import ReservationConfirmForm from '../reservation/ReservationConfirmForm';
import ReservationRejectForm from '../reservation/ReservationRejectForm';
import { formatReservationTotalPrice } from '../../utils/reservationPrice';

export default function ReservationDecisionMessage({ reservation, readOnly = false }) {
  const [localDecision, setLocalDecision] = useState(null); // CONFIRMED | REJECTED
  const [open, setOpen] = useState(false); //상세보기 토글
  const [mode, setMode] = useState('VIEW'); // 상세보기(VIEW) | 예약 확정(CONFIRM) | 예약거절(REJECT)

  //예약 확정 쿼리 훅
  const { mutate: confirm, isLoading: isConfirming } = useConfirmReservation();
  //예약 거절 쿼리 훅
  const { mutate: reject, isLoading: isRejecting } = useRejectReservation();

  //예약 결정 여부
  const reservationStatus = reservation?.status;
  const isAlreadyConfirmed =
    reservationStatus === 'CONFIRMED' || reservationStatus === 'RESERVATION_CONFIRMED';
  const isAlreadyRejected =
    reservationStatus === 'REJECTED' || reservationStatus === 'RESERVATION_REJECTED';
  const isDecisionDone = isAlreadyConfirmed || isAlreadyRejected || localDecision !== null;

  if (!reservation) return null;

  const { id, customerName, date, time } = reservation;
  const totalPrice = formatReservationTotalPrice(reservation);

  //예약 확정 헨들러
  const handleConfirm = ({ memo, date: confirmDate, startAt, durationMinutes }) => {
    const trimmedMemo = memo.trim();

    if (!trimmedMemo) {
      alert('전달 사항을 입력해주세요.');
      return;
    }

    confirm(
      {
        id,
        date: confirmDate,
        startAt,
        message: trimmedMemo,
        durationMinutes,
      },
      {
        onSuccess: () => {
          setLocalDecision('CONFIRMED');
          setMode('VIEW');
        },
      }
    );
  };

  //예약 거절 헨들러
  const handleReject = ({ reason }) => {
    reject(
      {
        id,
        reason,
      },
      {
        onSuccess: () => {
          setLocalDecision('REJECTED');
          setMode('VIEW');
        },
      }
    );
  };

  const handleCancelDecision = () => {
    setMode('VIEW');
  };

  return (
    <S.Card>
      <S.Title>예약 접수</S.Title>

      <S.InfoRow>
        <S.Label>고객명</S.Label>
        <S.Value>{customerName}</S.Value>
      </S.InfoRow>

      <S.InfoRow>
        <S.Label>예약 날짜</S.Label>
        <S.Value highlight>{date}</S.Value>
      </S.InfoRow>
      <S.InfoRow>
        <S.Label>예약 시간</S.Label>
        <S.Value highlight>{time}</S.Value>
      </S.InfoRow>
      <S.InfoRow>
        <S.Label>총 금액</S.Label>
        <S.Value>{totalPrice.text}</S.Value>
      </S.InfoRow>
      {totalPrice.missingText ? <S.PriceNote>{totalPrice.missingText}</S.PriceNote> : null}

      <S.Divider />

      <S.Toggle onClick={() => setOpen((v) => !v)}>
        상세 보기
        <span>{open ? '▲' : '▼'}</span>
      </S.Toggle>

      {/* 상세보기는 예약 상세 정보만 표시 */}
      {open ? (
        <S.DetailContent>
          <S.DetailTitle>예약 상세</S.DetailTitle>
          <ReservationInfoView info={reservation} showReservationStatus variant="messageCard" />
        </S.DetailContent>
      ) : null}

      {mode === 'CONFIRM' ? (
        <S.DecisionFormSection $separated={open}>
          <ReservationConfirmForm
            initialDate={date}
            initialStartAt={time}
            initialDurationMinutes={reservation.durationMinutes}
            onConfirm={handleConfirm}
            onCancel={handleCancelDecision}
            isConfirming={isConfirming}
            confirmed={isAlreadyConfirmed || localDecision === 'CONFIRMED'}
          />
        </S.DecisionFormSection>
      ) : null}

      {mode === 'REJECT' ? (
        <S.DecisionFormSection $separated={open}>
          <ReservationRejectForm
            onReject={handleReject}
            onCancel={handleCancelDecision}
            isRejecting={isRejecting}
            rejected={isAlreadyRejected || localDecision === 'REJECTED'}
          />
        </S.DecisionFormSection>
      ) : null}

      <S.Actions>
        {mode === 'VIEW' && !isDecisionDone && !readOnly ? (
          <>
            <S.RejectButton
              onClick={() => {
                setMode('REJECT');
              }}
            >
              거절
            </S.RejectButton>
            <S.ApproveButton
              onClick={() => {
                setMode('CONFIRM');
              }}
            >
              수락
            </S.ApproveButton>
          </>
        ) : null}
      </S.Actions>
    </S.Card>
  );
}
