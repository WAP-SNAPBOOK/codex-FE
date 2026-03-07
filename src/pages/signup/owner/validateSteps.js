import { validateMobile010 } from '../../../utils/phoneNumber';

export const validateStep1 = ({ name, phoneNumber, businessName, address }) => {
  if (!name || !phoneNumber || !businessName || !address) {
    alert('모든 항목을 입력해주세요.');
    return false;
  }
  const { valid, reason } = validateMobile010(phoneNumber);
  if (!valid) {
    alert(
      reason === 'length'
        ? '전화번호는 숫자만 11자리여야 합니다.'
        : '정확한 휴대폰 번호(010으로 시작)를 입력해주세요.'
    );
    return false;
  }
  return true;
};
const ALL_DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

// "HH:MM" 문자열 비교로 두 시간 구간이 겹치는지 확인
const hasOverlap = (slots) => {
  for (let i = 0; i < slots.length; i++) {
    for (let j = i + 1; j < slots.length; j++) {
      if (slots[i].start < slots[j].end && slots[j].start < slots[i].end) return true;
    }
  }
  return false;
};

export const validateStep2 = ({ scheduleType, times, weekdayTimes, weekendTimes, dayTimes }) => {
  if (scheduleType === 'DAILY') {
    if (hasOverlap(times)) {
      alert('운영 시간이 겹치는 구간이 있습니다.');
      return false;
    }
  }

  if (scheduleType === 'WEEKDAY_WEEKEND') {
    const errors = [];
    if (hasOverlap(weekdayTimes)) errors.push('평일 운영 시간이 겹치는 구간이 있습니다.');
    if (hasOverlap(weekendTimes)) errors.push('주말 운영 시간이 겹치는 구간이 있습니다.');
    if (errors.length > 0) {
      alert(errors.join('\n'));
      return false;
    }
  }

  if (scheduleType === 'BY_DAY') {
    const assignedDays = Object.keys(dayTimes);
    const missing = ALL_DAYS.filter((d) => !assignedDays.includes(d));
    if (missing.length > 0) {
      alert('모든 요일의 운영 시간을 설정해주세요.');
      return false;
    }
    for (const slots of Object.values(dayTimes)) {
      if (hasOverlap(slots)) {
        alert('운영 시간이 겹치는 구간이 있습니다.');
        return false;
      }
    }
  }

  return true;
};

export const validateStep4 = ({ items }) => {
  if (items.length === 0) {
    alert('메뉴를 하나 이상 추가해주세요.');
    return false;
  }
  return true;
};
