import React, { useState } from 'react';
import * as S from './ReservationConfirmForm.style';

//선택 시간
const LABEL_MAP = {
  30: '30분',
  60: '1시간',
  90: '1시간 30분',
  120: '2시간',
};

export default function ReservationConfirmForm({ onConfirm, isConfirming, confirmed }) {
  const [duration, setDuration] = useState(60);
  const [memo, setMemo] = useState('');
  const canConfirm = memo.trim().length > 0;

  const hour = Math.floor(duration / 60);
  const min = duration % 60;

  return (
    <>
      <S.DurationPreset>
        {[30, 60, 90, 120].map((min) => (
          <S.PresetButton
            key={min}
            disabled={confirmed}
            $active={duration === min}
            onClick={() => setDuration(min)}
          >
            {LABEL_MAP[min]}
          </S.PresetButton>
        ))}
      </S.DurationPreset>
      <S.Stepper>
        <button onClick={() => setDuration((d) => Math.max(30, d - 30))} disabled={confirmed}>
          −
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs">
            {String(hour).padStart(2, '0')}:{String(min).padStart(2, '0')}
          </span>
          <S.SubText>
            {hour ? `${hour}시간` : ''} {min ? `${min}분` : ''}
          </S.SubText>
        </div>
        {/*시간 증가는 2시간이 최대 */}
        <button onClick={() => setDuration((d) => Math.min(120, d + 30))} disabled={confirmed}>
          +
        </button>
      </S.Stepper>

      <S.Textarea
        placeholder="전달 사항을 입력해 주세요."
        disabled={confirmed}
        value={memo}
        maxLength={200}
        onChange={(e) => setMemo(e.target.value)}
      />
      <div className="flex justify-end">
        <S.ConfirmButton
          $confirmed={confirmed}
          onClick={() => onConfirm({ memo: memo.trim(), durationMinutes: duration })}
          disabled={isConfirming || confirmed || !canConfirm}
        >
          {isConfirming ? '예약 중...' : confirmed ? '예약 완료' : '확인'}
        </S.ConfirmButton>
      </div>
    </>
  );
}
