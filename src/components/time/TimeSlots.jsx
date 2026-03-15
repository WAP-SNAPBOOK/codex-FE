import * as S from './TimeSlot.style';
import { isPastTime } from '@/utils/dateTime';

export default function TimeSlots({ date, value, onSelect, slots }) {
  if (!date || !slots?.length) {
    return;
  }

  return (
    <S.TimeGrid>
      {slots
        .filter((time) => !isPastTime(date, time))
        .map((time) => (
          <S.TimeButton key={time} $selected={value === time} onClick={() => onSelect(time)}>
            {time}
          </S.TimeButton>
        ))}
    </S.TimeGrid>
  );
}
