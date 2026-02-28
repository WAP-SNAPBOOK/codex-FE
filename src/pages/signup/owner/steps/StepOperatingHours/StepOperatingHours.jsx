import { useState } from 'react';
import TimeSlots from './TimeSlots';
import * as S from './StepOperatingHours.styles';

const SLOT_INTERVALS = [
  { value: '30', label: '30분 단위로' },
  { value: '60', label: '1시간 단위로' },
];

const SCHEDULE_TYPES = [
  { value: 'DAILY', label: '모든 영업일\n같아요' },
  { value: 'WEEKDAY_WEEKEND', label: '평일/주말\n달라요' },
  { value: 'BY_DAY', label: '요일별로\n달라요' },
];

export default function StepOperatingHours({ initialData, onChange }) {
  const [slotInterval, setSlotInterval] = useState(initialData.slotInterval ?? '30');
  const [scheduleType, setScheduleType] = useState(initialData.scheduleType ?? 'DAILY');
  const [times, setTimes] = useState(initialData.times ?? [{ start: '09:00', end: '20:00' }]);
  const [weekdayTimes, setWeekdayTimes] = useState(
    initialData.weekdayTimes ?? [{ start: '09:00', end: '18:00' }]
  );
  const [weekendTimes, setWeekendTimes] = useState(
    initialData.weekendTimes ?? [{ start: '10:00', end: '16:00' }]
  );

  // 현재 전체 state를 parent에 전달 (patch로 최신값 덮어쓰기)
  const notify = (patch) =>
    onChange({ slotInterval, scheduleType, times, weekdayTimes, weekendTimes, ...patch });

  const handleSlotInterval = (val) => {
    setSlotInterval(val);
    notify({ slotInterval: val });
  };

  const handleScheduleType = (val) => {
    setScheduleType(val);
    notify({ scheduleType: val });
  };

  return (
    <div className="w-full mb-[30px]">
      {/* 시간 간격 */}
      <S.SectionTitle>
        예약 받는 시간 간격은
        <br /> 어떻게 되나요?
      </S.SectionTitle>
      <div className="flex gap-[10px] mb-[20px]">
        {SLOT_INTERVALS.map(({ value, label }) => (
          <S.ToggleButton
            key={value}
            type="button"
            $active={slotInterval === value}
            onClick={() => handleSlotInterval(value)}
          >
            {label}
          </S.ToggleButton>
        ))}
      </div>

      {/* 운영 유형 */}
      <S.SectionTitle>예약 운영 시간을 알려주세요.</S.SectionTitle>
      <div className="flex gap-[8px] mb-[20px]">
        {SCHEDULE_TYPES.map(({ value, label }) => (
          <S.ToggleButton
            key={value}
            type="button"
            $active={scheduleType === value}
            $tall
            onClick={() => handleScheduleType(value)}
          >
            {label}
          </S.ToggleButton>
        ))}
      </div>

      {/* 시간 입력 */}
      {scheduleType === 'DAILY' && (
        <>
          <S.SubLabel>운영 시간</S.SubLabel>
          <TimeSlots
            list={times}
            onUpdate={(next) => {
              setTimes(next);
              notify({ times: next });
            }}
          />
        </>
      )}

      {scheduleType === 'WEEKDAY_WEEKEND' && (
        <>
          <S.SubLabel>평일 운영 시간</S.SubLabel>
          <TimeSlots
            list={weekdayTimes}
            onUpdate={(next) => {
              setWeekdayTimes(next);
              notify({ weekdayTimes: next });
            }}
          />
          <S.SubLabel style={{ marginTop: '24px' }}>주말 운영 시간</S.SubLabel>
          <TimeSlots
            list={weekendTimes}
            onUpdate={(next) => {
              setWeekendTimes(next);
              notify({ weekendTimes: next });
            }}
          />
        </>
      )}

      {scheduleType === 'BY_DAY' && (
        <p className="text-center text-gray-400 text-[14px] py-[20px]">
          요일별 설정은 추후 구현 예정입니다.
        </p>
      )}
    </div>
  );
}
