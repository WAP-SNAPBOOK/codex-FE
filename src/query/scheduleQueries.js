import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export const useScheduleSettings = (shopId) => {
  return useQuery({
    queryKey: ['schedule-settings', shopId],
    queryFn: () => scheduleService.getScheduleSettings(shopId),
    enabled: !!shopId,
  });
};

export const useHolidays = (shopId) => {
  return useQuery({
    queryKey: ['schedule-holidays', shopId],
    queryFn: () => scheduleService.getHolidays(shopId),
    enabled: !!shopId,
  });
};

export const useStaffOperatingTimes = (shopId, staffId) => {
  return useQuery({
    queryKey: ['staff-operating-times', shopId, staffId],
    queryFn: () => scheduleService.getStaffOperatingTimes(shopId, staffId),
    enabled: !!shopId && !!staffId,
  });
};

/**
 * 운영시간 설정 훅
 * scheduleType: 'DAILY' | 'WEEKDAY_WEEKEND' | 'BY_DAY'
 */
export const useUpdateOperatingTimes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, ...payload }) => scheduleService.updateOperatingTimes(shopId, payload),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['operating-times', shopId] });
      queryClient.invalidateQueries({ queryKey: ['schedule-settings', shopId] });
    },
  });
};

/**
 * 예약 슬롯 간격 설정 훅
 */
export const useUpdateSlotInterval = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, intervalMinutes }) =>
      scheduleService.updateSlotInterval(shopId, intervalMinutes),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['schedule-settings', shopId] });
    },
  });
};

/**
 * 정기 휴무일 생성 훅
 * holidayType: 'WEEKLY' | 'BIWEEKLY' | 'MONTHLY' | 'CUSTOM'
 */
export const useCreateHoliday = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, ...payload }) => scheduleService.createHoliday(shopId, payload),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['schedule-holidays', shopId] });
    },
  });
};

export const useDeleteHoliday = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, holidayId }) => scheduleService.deleteHoliday(shopId, holidayId),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['schedule-holidays', shopId] });
    },
  });
};

export const useUpdateStaffOperatingTimes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ shopId, staffId, overrides }) =>
      scheduleService.updateStaffOperatingTimes(shopId, staffId, overrides),
    onSuccess: (_, { shopId, staffId }) => {
      queryClient.invalidateQueries({
        queryKey: ['staff-operating-times', shopId, staffId],
      });
    },
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
