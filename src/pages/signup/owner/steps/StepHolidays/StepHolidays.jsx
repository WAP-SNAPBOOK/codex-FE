import { useState } from 'react';
import * as S from './StepHolidays.styles';
import { DayButton, DaysRow } from '../StepCommon.styles';

const HOLIDAY_TYPES = [
  { value: 'WEEKLY', label: '매주' },
  { value: 'BIWEEKLY', label: '격주' },
  { value: 'MONTHLY', label: '매달' },
  { value: 'CUSTOM', label: '특정 날짜' },
];

const DAYS = [
  { value: 'MONDAY', label: '월' },
  { value: 'TUESDAY', label: '화' },
  { value: 'WEDNESDAY', label: '수' },
  { value: 'THURSDAY', label: '목' },
  { value: 'FRIDAY', label: '금' },
  { value: 'SATURDAY', label: '토' },
  { value: 'SUNDAY', label: '일' },
];

const DAY_LABEL = Object.fromEntries(DAYS.map(({ value, label }) => [value, label]));

const DEFAULT_FORM = {
  holidayType: 'WEEKLY',
  dayOfWeek: 'SUNDAY',
  weekOfMonth: 1,
  referenceDate: '',
  specificDate: '',
};

const holidayLabel = (h) => {
  if (h.holidayType === 'WEEKLY') return `매주 ${DAY_LABEL[h.dayOfWeek]}요일`;
  if (h.holidayType === 'BIWEEKLY') return `격주 ${DAY_LABEL[h.dayOfWeek]}요일 (기준: ${h.referenceDate})`;
  if (h.holidayType === 'MONTHLY') return `매달 ${h.weekOfMonth}째주 ${DAY_LABEL[h.dayOfWeek]}요일`;
  return h.specificDate;
};

export default function StepHolidays({ initialData, onChange }) {
  const [publicHolidayOff, setPublicHolidayOff] = useState(initialData.publicHolidayOff ?? false);
  const [holidays, setHolidays] = useState(initialData.holidays ?? []);
  const [form, setForm] = useState(DEFAULT_FORM);

  const notify = (patch) => onChange({ publicHolidayOff, holidays, ...patch });

  const handlePublicHolidayOff = (val) => {
    setPublicHolidayOff(val);
    notify({ publicHolidayOff: val });
  };

  const addHoliday = () => {
    const { holidayType, dayOfWeek, weekOfMonth, referenceDate, specificDate } = form;
    let entry;
    if (holidayType === 'WEEKLY') entry = { holidayType, dayOfWeek };
    else if (holidayType === 'BIWEEKLY') entry = { holidayType, dayOfWeek, referenceDate };
    else if (holidayType === 'MONTHLY') entry = { holidayType, dayOfWeek, weekOfMonth };
    else entry = { holidayType, specificDate };

    const next = [...holidays, entry];
    setHolidays(next);
    notify({ holidays: next });
  };

  const removeHoliday = (idx) => {
    const next = holidays.filter((_, i) => i !== idx);
    setHolidays(next);
    notify({ holidays: next });
  };

  return (
    <div className="w-full mb-[30px]">
      {/* 공휴일 휴무 토글 */}
      <S.SectionTitle>공휴일에 쉬나요?</S.SectionTitle>
      <div className="flex gap-[10px] mb-[24px]">
        <S.ToggleButton type="button" $active={publicHolidayOff} onClick={() => handlePublicHolidayOff(true)}>
          예
        </S.ToggleButton>
        <S.ToggleButton type="button" $active={!publicHolidayOff} onClick={() => handlePublicHolidayOff(false)}>
          아니오
        </S.ToggleButton>
      </div>

      {/* 정기 휴무일 */}
      <S.SectionTitle>정기 휴무일 추가</S.SectionTitle>

      {/* 타입 선택 */}
      <div className="flex gap-[8px] mb-[16px]">
        {HOLIDAY_TYPES.map(({ value, label }) => (
          <S.ToggleButton
            key={value}
            type="button"
            $active={form.holidayType === value}
            onClick={() => setForm((f) => ({ ...f, holidayType: value }))}
          >
            {label}
          </S.ToggleButton>
        ))}
      </div>

      {/* 요일 선택 (WEEKLY / BIWEEKLY / MONTHLY) */}
      {form.holidayType !== 'CUSTOM' && (
        <DaysRow className="mb-[12px]">
          {DAYS.map(({ value, label }) => (
            <DayButton
              key={value}
              type="button"
              $active={form.dayOfWeek === value}
              onClick={() => setForm((f) => ({ ...f, dayOfWeek: value }))}
            >
              {label}
            </DayButton>
          ))}
        </DaysRow>
      )}

      {/* BIWEEKLY: 기준 날짜 */}
      {form.holidayType === 'BIWEEKLY' && (
        <S.DateInput
          type="date"
          value={form.referenceDate}
          onChange={(e) => setForm((f) => ({ ...f, referenceDate: e.target.value }))}
        />
      )}

      {/* MONTHLY: 몇째주 */}
      {form.holidayType === 'MONTHLY' && (
        <DaysRow className="mb-[12px]">
          {[1, 2, 3, 4, 5].map((w) => (
            <DayButton
              key={w}
              type="button"
              $active={form.weekOfMonth === w}
              onClick={() => setForm((f) => ({ ...f, weekOfMonth: w }))}
            >
              {w}째
            </DayButton>
          ))}
        </DaysRow>
      )}

      {/* CUSTOM: 특정 날짜 */}
      {form.holidayType === 'CUSTOM' && (
        <S.DateInput
          type="date"
          value={form.specificDate}
          onChange={(e) => setForm((f) => ({ ...f, specificDate: e.target.value }))}
        />
      )}

      <S.AddButton type="button" onClick={addHoliday}>
        + 휴무일 추가
      </S.AddButton>

      {/* 추가된 휴무일 목록 */}
      {holidays.length > 0 && (
        <S.HolidayList>
          {holidays.map((h, i) => (
            <S.HolidayItem key={i}>
              <span>{holidayLabel(h)}</span>
              <S.RemoveButton type="button" onClick={() => removeHoliday(i)}>
                ×
              </S.RemoveButton>
            </S.HolidayItem>
          ))}
        </S.HolidayList>
      )}
    </div>
  );
}
