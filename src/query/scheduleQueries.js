import { useMutation } from '@tanstack/react-query';
import { scheduleService } from '../api/services/scheduleService';

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
