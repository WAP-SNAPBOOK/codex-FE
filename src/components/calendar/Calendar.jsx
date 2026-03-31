import * as S from './Calendar.style';
import { getCalendarDays } from './calendar.utils';

export default function Calendar({ value, currentMonth, onSelect, availabilityData }) {
  const days = getCalendarDays(currentMonth);
  const availableDates = availabilityData?.availableDates ?? null;

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
          //이전 달의 패딩 셀, 과거 날짜, api 데이터로 unavailable 한 날짜 비활성화
          const isUnavailable =
            !day.date || (availableDates !== null && !availableDates.includes(day.label));
          return (
            <S.DayCell
              key={day.key}
              disabled={day.disabled || isUnavailable}
              $selected={isSelected}
              onClick={() => onSelect(day.date)}
            >
              {day.label}
            </S.DayCell>
          );
        })}
      </S.DayGrid>
    </S.Container>
  );
}
