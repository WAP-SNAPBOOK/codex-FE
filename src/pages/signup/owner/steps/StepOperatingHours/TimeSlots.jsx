import * as S from './StepOperatingHours.styles';

const TIME_OPTIONS = Array.from({ length: 24 }, (_, index) => {
  const minutes = index * 60;
  const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
  const mins = String(minutes % 60).padStart(2, '0');
  const value = `${hours}:${mins}`;
  return { value, label: value };
});

/**
 * 운영 시간 슬롯 입력 컴포넌트
 * @param {{ start: string, end: string }[]} list - 시간 슬롯 배열
 * @param {(next: { start: string, end: string }[]) => void} onUpdate - 변경 시 전체 배열 콜백
 */
export default function TimeSlots({ list, onUpdate, showAddButton = true, showLastTimeHint = false }) {
  const handleChange = (i, field, val) => {
    onUpdate(list.map((t, idx) => (idx === i ? { ...t, [field]: val } : t)));
  };

  return (
    <>
      <S.TimeSlotList>
        {list.map((slot, i) => (
          <S.TimeRow key={i}>
            <S.TimeField>
              <S.TimeSelect
                value={slot.start}
                onChange={(e) => handleChange(i, 'start', e.target.value)}
              >
                {TIME_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </S.TimeSelect>
              <S.SelectChevron aria-hidden="true" />
            </S.TimeField>
            <S.TimeSeparator>~</S.TimeSeparator>
            <S.TimeField>
              {showLastTimeHint && i === 0 ? (
                <S.LastTimeHint>고객이 선택할 수 있는 마지막 시간</S.LastTimeHint>
              ) : null}
              <S.TimeSelect
                value={slot.end}
                onChange={(e) => handleChange(i, 'end', e.target.value)}
              >
                {TIME_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </S.TimeSelect>
              <S.SelectChevron aria-hidden="true" />
            </S.TimeField>
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
          휴게 시간은 제외하고, 실제로 운영하는 시간만 알려주세요.
        </S.TimeNote>
        {showAddButton ? (
          <S.AddTimeButton
            type="button"
            onClick={() => onUpdate([...list, { start: '09:00', end: '18:00' }])}
          >
            ⊕ 시간 추가하기
          </S.AddTimeButton>
        ) : null}
      </S.TimeFooter>
    </>
  );
}
