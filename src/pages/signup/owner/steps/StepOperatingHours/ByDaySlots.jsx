import { useState } from 'react';
import * as S from './ByDaySlots.styles';
import { DayButton, DaysRow } from '../StepCommon.styles';

const DAYS = [
  { value: 'MONDAY', label: '월' },
  { value: 'TUESDAY', label: '화' },
  { value: 'WEDNESDAY', label: '수' },
  { value: 'THURSDAY', label: '목' },
  { value: 'FRIDAY', label: '금' },
  { value: 'SATURDAY', label: '토' },
  { value: 'SUNDAY', label: '일' },
];

// dayTimes → 그룹 배열 변환 (같은 시간 배열인 요일끼리 묶음)
const toGroups = (dayTimes) => {
  if (!dayTimes || Object.keys(dayTimes).length === 0) {
    return [{ days: [], times: [{ start: '09:00', end: '18:00' }] }];
  }
  const processed = new Set();
  const groups = [];
  Object.entries(dayTimes).forEach(([day, times]) => {
    if (processed.has(day)) return;
    const key = JSON.stringify(times);
    const sameDays = Object.entries(dayTimes)
      .filter(([d, t]) => !processed.has(d) && JSON.stringify(t) === key)
      .map(([d]) => d);
    sameDays.forEach((d) => processed.add(d));
    groups.push({ days: sameDays, times });
  });
  return groups;
};

// 그룹 배열 → dayTimes 변환
const toDayTimes = (groups) => {
  const result = {};
  groups.forEach((group) => {
    group.days.forEach((day) => {
      result[day] = group.times;
    });
  });
  return result;
};

/**
 * 요일별 운영 시간 설정 컴포넌트
 * @param {{ [day: string]: { start: string, end: string }[] }} dayTimes - API 형식
 * @param {(dayTimes: typeof dayTimes) => void} onUpdate
 */
export default function ByDaySlots({ dayTimes, onUpdate }) {
  const [groups, setGroups] = useState(() => toGroups(dayTimes));

  const update = (next) => {
    setGroups(next);
    onUpdate(toDayTimes(next));
  };

  // 요일 토글: 추가할 때만 다른 그룹에서 해당 요일 제거
  const toggleDay = (groupIdx, day) => {
    const isAdding = !groups[groupIdx].days.includes(day);

    update(
      groups.map((group, i) => {
        if (i === groupIdx) {
          const days = isAdding ? [...group.days, day] : group.days.filter((d) => d !== day);
          return { ...group, days };
        }
        if (isAdding) {
          return { ...group, days: group.days.filter((d) => d !== day) };
        }
        return group;
      })
    );
  };

  const changeTime = (groupIdx, timeIdx, field, val) => {
    update(
      groups.map((group, i) =>
        i === groupIdx
          ? {
              ...group,
              times: group.times.map((t, ti) => (ti === timeIdx ? { ...t, [field]: val } : t)),
            }
          : group
      )
    );
  };

  const addTime = (groupIdx) => {
    update(
      groups.map((group, i) =>
        i === groupIdx
          ? { ...group, times: [...group.times, { start: '09:00', end: '18:00' }] }
          : group
      )
    );
  };

  const removeTime = (groupIdx, timeIdx) => {
    update(
      groups.map((group, i) =>
        i === groupIdx ? { ...group, times: group.times.filter((_, ti) => ti !== timeIdx) } : group
      )
    );
  };

  const addGroup = () => {
    update([...groups, { days: [], times: [{ start: '09:00', end: '18:00' }] }]);
  };

  const removeGroup = (groupIdx) => {
    update(groups.filter((_, i) => i !== groupIdx));
  };

  return (
    <>
      {groups.map((group, groupIdx) => (
        <S.ByDayGroup key={groupIdx}>
          <S.ByDayNote>동일한 시간으로 운영되는 요일을 선택해 주세요!</S.ByDayNote>
          <DaysRow>
            {DAYS.map(({ value, label }) => (
              <DayButton
                key={value}
                type="button"
                $active={group.days.includes(value)}
                onClick={() => toggleDay(groupIdx, value)}
              >
                {label}
              </DayButton>
            ))}
          </DaysRow>
          {group.times.map((time, timeIdx) => (
            <S.TimeRow key={timeIdx}>
              <S.TimeInput
                type="time"
                value={time.start}
                onChange={(e) => changeTime(groupIdx, timeIdx, 'start', e.target.value)}
              />
              <S.TimeSeparator>~</S.TimeSeparator>
              <S.TimeInput
                type="time"
                value={time.end}
                onChange={(e) => changeTime(groupIdx, timeIdx, 'end', e.target.value)}
              />
              {group.times.length > 1 && (
                <S.RemoveButton type="button" onClick={() => removeTime(groupIdx, timeIdx)}>
                  ×
                </S.RemoveButton>
              )}
            </S.TimeRow>
          ))}
          <S.AddSlotRow>
            {groups.length > 1 ? (
              <S.GroupRemoveButton type="button" onClick={() => removeGroup(groupIdx)}>
                그룹 삭제
              </S.GroupRemoveButton>
            ) : (
              <span />
            )}
            <S.AddTimeButton type="button" onClick={() => addTime(groupIdx)}>
              + 시간 추가
            </S.AddTimeButton>
          </S.AddSlotRow>
        </S.ByDayGroup>
      ))}
      <S.AddSlotRow>
        <span />
        <S.AddTimeButton type="button" onClick={addGroup}>
          ⊕ 요일 그룹 추가
        </S.AddTimeButton>
      </S.AddSlotRow>
    </>
  );
}
