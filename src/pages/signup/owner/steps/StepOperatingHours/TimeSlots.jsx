import * as S from './StepOperatingHours.styles';

/**
 * 운영 시간 슬롯 입력 컴포넌트
 * @param {{ start: string, end: string }[]} list - 시간 슬롯 배열
 * @param {(next: { start: string, end: string }[]) => void} onUpdate - 변경 시 전체 배열 콜백
 */
export default function TimeSlots({ list, onUpdate }) {
  const handleChange = (i, field, val) => {
    onUpdate(list.map((t, idx) => (idx === i ? { ...t, [field]: val } : t)));
  };

  return (
    <>
      <S.TimeSlotList>
        {list.map((slot, i) => (
          <S.TimeRow key={i}>
            <S.TimeInput
              type="time"
              value={slot.start}
              onChange={(e) => handleChange(i, 'start', e.target.value)}
            />
            <S.TimeSeparator>~</S.TimeSeparator>
            <S.TimeInput
              type="time"
              value={slot.end}
              onChange={(e) => handleChange(i, 'end', e.target.value)}
            />
            {list.length > 1 && (
              <S.RemoveButton
                type="button"
                onClick={() => onUpdate(list.filter((_, idx) => idx !== i))}
              >
                ×
              </S.RemoveButton>
            )}
          </S.TimeRow>
        ))}
      </S.TimeSlotList>
      <S.TimeFooter>
        <S.TimeNote>
          휴게시간은 제외하고,
          <br />
          실제로 운영하는 시간만 설정해주세요.
        </S.TimeNote>
        <S.AddTimeButton
          type="button"
          onClick={() => onUpdate([...list, { start: '09:00', end: '18:00' }])}
        >
          ⊕ 시간 추가하기
        </S.AddTimeButton>
      </S.TimeFooter>
    </>
  );
}
