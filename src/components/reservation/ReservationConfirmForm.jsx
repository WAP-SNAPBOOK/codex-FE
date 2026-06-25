import React, { useState } from 'react';
import * as S from './ReservationConfirmForm.style';

//선택 시간
const LABEL_MAP = {
  30: '30분',
  60: '1시간',
  90: '1시간 30분',
  120: '2시간',
};

const formatClock = (value) => {
  const match = String(value ?? '').match(/(?:T)?(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : '';
};

export default function ReservationConfirmForm({
  initialDate = '',
  initialStartAt = '',
  initialDurationMinutes,
  onConfirm,
  onCancel,
  isConfirming,
  confirmed,
}) {
  const [date, setDate] = useState(initialDate || '');
  const [startAt, setStartAt] = useState(formatClock(initialStartAt));
  const [duration, setDuration] = useState(initialDurationMinutes || 60);
  const [memo, setMemo] = useState('');
  const canConfirm = date && startAt && memo.trim().length > 0;

  return (
    <>
      <S.FieldGroup>
        <S.FieldLabel>예약 일시</S.FieldLabel>
        <S.DateTimeGrid>
          <S.Input
            type="date"
            value={date}
            disabled={confirmed}
            onChange={(e) => setDate(e.target.value)}
          />
          <S.Input
            type="time"
            step="1800"
            value={startAt}
            disabled={confirmed}
            onChange={(e) => setStartAt(e.target.value)}
          />
        </S.DateTimeGrid>
      </S.FieldGroup>

      <S.FieldGroup>
        <S.FieldLabel>시술 소요시간</S.FieldLabel>
        <S.SelectWrapper>
          <S.Select
            value={duration}
            disabled={confirmed}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            {[30, 60, 90, 120].map((min) => (
              <option key={min} value={min}>
                {LABEL_MAP[min]}
              </option>
            ))}
          </S.Select>
        </S.SelectWrapper>
      </S.FieldGroup>

      <S.FieldGroup>
        <S.FieldLabel>전달사항</S.FieldLabel>
        <S.Textarea
          placeholder="전달 사항을 입력해 주세요."
          disabled={confirmed}
          value={memo}
          maxLength={200}
          onChange={(e) => setMemo(e.target.value)}
        />
      </S.FieldGroup>

      <S.ButtonRow>
        <S.CancelButton type="button" onClick={onCancel} disabled={isConfirming || confirmed}>
          취소
        </S.CancelButton>
        <S.ConfirmButton
          type="button"
          $confirmed={confirmed}
          onClick={() => onConfirm({ date, startAt, memo: memo.trim(), durationMinutes: duration })}
          disabled={isConfirming || confirmed || !canConfirm}
        >
          {isConfirming ? '예약 중...' : confirmed ? '예약 완료' : '확인'}
        </S.ConfirmButton>
      </S.ButtonRow>
    </>
  );
}
