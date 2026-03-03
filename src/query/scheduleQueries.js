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
