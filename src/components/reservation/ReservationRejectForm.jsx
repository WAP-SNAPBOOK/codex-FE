import React, { useState } from 'react';
import * as S from './ReservationRejectForm.style';

export default function ReservationRejectForm({ onReject, onCancel, isRejecting, rejected }) {
  const [reason, setReason] = useState('');
  const canReject = reason.trim().length > 0;

  return (
    <>
      <S.Textarea
        placeholder="거절 사유를 입력해 주세요."
        disabled={rejected}
        value={reason}
        maxLength={200}
        onChange={(e) => setReason(e.target.value)}
      />

      <S.ButtonRow>
        <S.CancelButton type="button" onClick={onCancel} disabled={isRejecting || rejected}>
          취소
        </S.CancelButton>
        <S.ConfirmButton
          type="button"
          disabled={isRejecting || rejected || !canReject}
          $rejected={rejected}
          onClick={() => onReject({ reason: reason.trim() })}
        >
          {isRejecting ? '처리 중...' : rejected ? '거절 완료' : '확인'}
        </S.ConfirmButton>
      </S.ButtonRow>
    </>
  );
}
