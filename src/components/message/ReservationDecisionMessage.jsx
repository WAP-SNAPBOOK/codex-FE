import React, { useState } from 'react';
import * as S from './ReservationDecisionMessage.style';
import { useConfirmReservation, useRejectReservation } from '../../query/reservationQueries';
import ReservationInfoView from '../reservation/ReservationInfoView';
import ReservationConfirmForm from '../reservation/ReservationConfirmForm';
import ReservationRejectForm from '../reservation/ReservationRejectForm';

export default function ReservationDecisionMessage({ reservation }) {
  const [confirmed, setConfirmed] = useState(false); //예약 완료 상태
  const [rejected, setRejected] = useState(false); //예약 거절 상태
  const [open, setOpen] = useState(false); //상세보기 토글
  const [mode, setMode] = useState('VIEW'); // 상세보기(VIEW) | 예약 확정(CONFIRM) | 예약거절(REJECT)

  //예약 확정 쿼리 훅
  const { mutate: confirm, isLoading: isConfirming } = useConfirmReservation();
  //예약 거절 쿼리 훅
  const { mutate: reject, isLoading: isRejecting } = useRejectReservation();

  //예약 결정 여부
  const isDecisionDone = confirmed || rejected;

  if (!reservation) return null;

  const { id, customerName, date, time } = reservation;

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
          setConfirmed(true); // 예약 확정 활성화
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
          setRejected(true); //예약 거절 활성화
        },
      }
    );
  };

  return (
    <S.Card>
      <S.Title>{customerName}</S.Title>

      <S.InfoRow>
        <S.Label>예약 날짜</S.Label>
        <S.Value highlight>{date}</S.Value>
      </S.InfoRow>
      <S.InfoRow>
        <S.Label>예약 시간</S.Label>
        <S.Value highlight>{time}</S.Value>
      </S.InfoRow>

      <S.Divider />

      <S.Toggle disabled={isDecisionDone} onClick={() => setOpen((v) => !v)}>
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
            confirmed={confirmed}
          />
        ) : (
          <ReservationRejectForm
            onReject={handleReject}
            isRejecting={isRejecting}
            rejected={rejected}
          />
        ))}

      <S.Actions>
        {mode === 'VIEW' ? (
          <>
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
          </>
        ) : null}
      </S.Actions>
    </S.Card>
  );
}
