import dayjs from 'dayjs';

export function getCalendarDays(month) {
  const startOfMonth = month.startOf('month');

  const startDay = startOfMonth.day(); // 0(SUN) ~ 6(SAT)
  const daysInMonth = month.daysInMonth();

  const days = [];

  // 이전 달 padding
  for (let i = 0; i < startDay; i++) {
    days.push({
      key: `prev-${i}`,
      label: '',
      disabled: true,
    });
  }

  // 현재 달 날짜
  for (let d = 1; d <= daysInMonth; d++) {
    const date = startOfMonth.date(d);
    const isPast = date.isBefore(dayjs(), 'day');

    days.push({
      key: date.format('YYYY-MM-DD'),
      label: d,
      date: date.format('YYYY-MM-DD'),
      disabled: isPast,
    });
  }

  return days;
}
