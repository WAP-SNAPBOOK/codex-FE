import { useQuery, useMutation } from '@tanstack/react-query';
import { scheduleService } from '../api/services/scheduleService';

/**
 * 운영시간 조회 훅
 */
export const useOperatingTimes = (shopId) => {
  return useQuery({
    queryKey: ['operating-times', shopId],
    queryFn: () => scheduleService.getOperatingTimes(shopId),
    enabled: !!shopId,
  });
};

/**
 * 운영시간 설정 훅
 * scheduleType: 'DAILY' | 'WEEKDAY_WEEKEND' | 'BY_DAY'
 */
export const useUpdateOperatingTimes = () => {
  return useMutation({
    mutationFn: ({ shopId, ...payload }) =>
      scheduleService.updateOperatingTimes(shopId, payload),
  });
};

/**
 * 예약 슬롯 간격 설정 훅
 */
export const useUpdateSlotInterval = () => {
  return useMutation({
    mutationFn: ({ shopId, intervalMinutes }) =>
      scheduleService.updateSlotInterval(shopId, intervalMinutes),
  });
};

/**
 * 공휴일 휴무 토글 훅
 */
export const useUpdateScheduleSettings = () => {
  return useMutation({
    mutationFn: ({ shopId, ...payload }) => scheduleService.updateScheduleSettings(shopId, payload),
  });
};

/**
 * 정기 휴무일 생성 훅
 * holidayType: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'CUSTOM'
 */
export const useCreateHoliday = () => {
  return useMutation({
    mutationFn: ({ shopId, ...payload }) => scheduleService.createHoliday(shopId, payload),
  });
};

/**
 * 월별 예약 가능 캘린더 조회 훅 (고객용)
 * @param {number} shopId
 * @param {number} staffId
 * @param {string} yearMonth - 'YYYY-MM'
 */
export const useMonthlyAvailability = (shopId, staffId, yearMonth) => {
  return useQuery({
    queryKey: ['monthly-availability', shopId, staffId, yearMonth],
    queryFn: () => scheduleService.getMonthlyAvailability(shopId, staffId, yearMonth),
    enabled: !!shopId && !!staffId && !!yearMonth,
  });
};

/**
 * 일별 예약 가능 시간 조회 훅 (고객용)
 * @param {number} shopId
 * @param {number} staffId
 * @param {string} date - 'YYYY-MM-DD'
 */
export const useDailyAvailability = (shopId, staffId, date) => {
  return useQuery({
    queryKey: ['daily-availability', shopId, staffId, date],
    queryFn: () => scheduleService.getDailyAvailability(shopId, staffId, date),
    enabled: !!shopId && !!staffId && !!date,
  });
};
