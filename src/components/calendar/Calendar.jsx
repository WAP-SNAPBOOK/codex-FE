import * as S from './Calendar.style';
import { getCalendarDays } from './calendar.utils';

export default function Calendar({ value, currentMonth, onSelect }) {
  const days = getCalendarDays(currentMonth);

  return (
    <S.Container>
      {/* 요일 */}
      <S.WeekRow>
        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d, idx) => (
          <S.Weekday key={d} $dayIndex={idx}>
            {d}
          </S.Weekday>
        ))}
      </S.WeekRow>

      {/* 날짜 그리드 */}
      <S.DayGrid>
        {days.map((day) => {
          const isSelected = value === day.date;

          return (
            <S.DayCell
              key={day.key}
              disabled={day.disabled}
              $selected={isSelected}
              onClick={() => !day.disabled && onSelect(day.date)}
            >
              {day.label}
            </S.DayCell>
          );
        })}
      </S.DayGrid>
    </S.Container>
  );
}
