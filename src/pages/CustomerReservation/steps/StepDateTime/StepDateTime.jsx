import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import CalendarMonthControl from '@/components/calendar/CalendarMonthControl';
import Calendar from '@/components/calendar/Calendar';
import TimeSlots from '@/components/time/TimeSlots';
import { formatKoreanDate } from '@/utils/dateTime';
import { useMonthlyAvailability, useDailyAvailability } from '@/query/scheduleQueries';
import * as S from '../steps.styles';

export default function StepDateTime({ shopId, staffId, initialData = {}, onChange }) {
  const [selectedDate, setSelectedDate] = useState(initialData.date ?? null); //선택된 날짜
  const [selectedTime, setSelectedTime] = useState(initialData.time ?? null); //선택된 시간  //선택된 날짜의 month, 없다면 현재 달
  const [currentMonth, setCurrentMonth] = useState(selectedDate ? dayjs(selectedDate) : dayjs());
  const yearMonth = currentMonth.format('YYYY-MM');
  const { data: monthlyData } = useMonthlyAvailability(shopId, staffId, yearMonth);
  const { data: dailyData } = useDailyAvailability(shopId, staffId, selectedDate);

  //이전 달 이동 헨들러
  const goPrevMonth = () => {
    setCurrentMonth((m) => {
      if (m.isSame(dayjs(), 'month')) return m; // 이동 불가
      // 실제 이동 시에만 초기화
      setSelectedDate(null);
      setSelectedTime(null);
      return m.subtract(1, 'month');
    });
  };

  //다음 달 이동 헨들러
  const goNextMonth = () => {
    setCurrentMonth((m) => m.add(1, 'month'));
    //달 이동시 선택 날짜, 시간 초기화
    setSelectedDate(null);
    setSelectedTime(null);
  };

  //다음 단계 진행 여부
  const isValid = Boolean(selectedDate && selectedTime);

  //부모 에약 폼 정보 변경
  useEffect(() => {
    onChange({
      date: selectedDate,
      time: selectedTime,
      isValid,
    });
  }, [selectedDate, selectedTime, isValid, onChange]);

  return (
    <>
      <S.SectionHeader>
        <S.SectionTitle>날짜 선택</S.SectionTitle>

        <CalendarMonthControl
          currentMonth={currentMonth}
          onPrev={goPrevMonth}
          onNext={goNextMonth}
        />
      </S.SectionHeader>

      <Calendar
        value={selectedDate}
        currentMonth={currentMonth}
        onSelect={(date) => {
          setSelectedDate(date);
          setSelectedTime(null);
        }}
        availabilityData={monthlyData}
      />
      <S.SectionTitle>
        시간 선택
        {selectedDate && <S.SelectedDateText>{formatKoreanDate(selectedDate)}</S.SelectedDateText>}
      </S.SectionTitle>

      <TimeSlots
        date={selectedDate}
        value={selectedTime}
        onSelect={setSelectedTime}
        slots={dailyData?.slots}
      />
    </>
  );
}
