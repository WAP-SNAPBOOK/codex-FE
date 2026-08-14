import * as S from './Calendar.style';

export default function CalendarMonthControl({ currentMonth, onPrev, onNext }) {
  return (
    <S.MonthControl>
      <S.MonthButton type="button" aria-label="이전 달" onClick={onPrev}>
        ‹
      </S.MonthButton>
      <S.MonthText>{currentMonth.format('YYYY. MM')}</S.MonthText>
      <S.MonthButton type="button" aria-label="다음 달" onClick={onNext}>
        ›
      </S.MonthButton>
    </S.MonthControl>
  );
}
