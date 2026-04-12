import React, { useState } from 'react';
import * as S from './ReservationDecisionMessage.style';
import { useConfirmReservation, useRejectReservation } from '../../query/reservationQueries';
import ReservationInfoView from '../reservation/ReservationInfoView';
import ReservationConfirmForm from '../reservation/ReservationConfirmForm';
import ReservationRejectForm from '../reservation/ReservationRejectForm';

export default function ReservationDecisionMessage({ reservation }) {
  const [localDecisionStatus, setLocalDecisionStatus] = useState(null);
  const [open, setOpen] = useState(false); //상세보기 토글
  const [mode, setMode] = useState('VIEW'); // 상세보기(VIEW) | 예약 확정(CONFIRM) | 예약거절(REJECT)

  //예약 확정 쿼리 훅
  const { mutate: confirm, isLoading: isConfirming } = useConfirmReservation();
  //예약 거절 쿼리 훅
  const { mutate: reject, isLoading: isRejecting } = useRejectReservation();

  //예약 결정 여부
  if (!reservation) return null;

  const resolvedStatus = localDecisionStatus ?? reservation.status ?? 'PENDING';
  const isConfirmed = resolvedStatus === 'CONFIRMED';
  const isRejected = resolvedStatus === 'REJECTED';
  const isDecisionDone = isConfirmed || isRejected;
  const { id, customerName, date, time } = reservation;
  const statusLabel =
    resolvedStatus === 'CONFIRMED'
      ? '확정된 예약 접수'
      : resolvedStatus === 'REJECTED'
        ? '거절된 예약 접수'
        : '예약 접수 중';

  //예약 확정 헨들러
  const handleConfirm = ({ memo, durationMinutes }) => {
    const trimmedMemo = memo.trim();

    if (!trimmedMemo) {
      alert('전달 사항을 입력해주세요.');
      return;
    }

    confirm(
      {
        id,
        message: trimmedMemo,
        durationMinutes,
      },
      {
        onSuccess: () => {
          setLocalDecisionStatus('CONFIRMED');
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
          setLocalDecisionStatus('REJECTED');
          setMode('VIEW');
        },
      }
    );
  };

  return (
    <S.Card>
      <S.Header>
        <S.Title>{customerName}</S.Title>
        <S.StatusBadge $status={resolvedStatus}>{statusLabel}</S.StatusBadge>
      </S.Header>

      <S.InfoRow>
        <S.Label>예약 날짜</S.Label>
        <S.Value highlight>{date}</S.Value>
      </S.InfoRow>
      <S.InfoRow>
        <S.Label>예약 시간</S.Label>
        <S.Value highlight>{time}</S.Value>
      </S.InfoRow>

      <S.Divider />

      <S.Toggle onClick={() => setOpen((v) => !v)}>
        상세 보기
        <span>{open ? '▲' : '▼'}</span>
      </S.Toggle>

      {/*상세보기 영역(예약 거절, 예약 확정에 따른 폼 구성*/}
      {open &&
        (mode === 'VIEW' ? (
          <ReservationInfoView info={reservation} />
        ) : mode === 'CONFIRM' ? (
          <ReservationConfirmForm
            onConfirm={handleConfirm}
            isConfirming={isConfirming}
            confirmed={isConfirmed}
          />
        ) : (
          <ReservationRejectForm
            onReject={handleReject}
            isRejecting={isRejecting}
            rejected={isRejected}
          />
        ))}

      {mode === 'VIEW' && !isDecisionDone ? (
        <S.Actions>
          <S.RejectButton
            onClick={() => {
              setMode('REJECT');
              setOpen(true);
            }}
          >
            거절
          </S.RejectButton>
          <S.ApproveButton
            onClick={() => {
              setMode('CONFIRM');
              setOpen(true);
            }}
          >
            수락
          </S.ApproveButton>
        </S.Actions>
      ) : null}
    </S.Card>
  );
}
