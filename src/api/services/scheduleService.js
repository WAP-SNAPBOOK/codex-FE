import axiosClient from '../axiosClient';

export const scheduleService = {
  /**
   * 운영시간 설정
   * @param {number} shopId - 매장 ID (path param)
   * @param {Object} payload - 운영시간 데이터
   * @param {'DAILY'|'WEEKDAY_WEEKEND'|'BY_DAY'} payload.scheduleType - 운영시간 타입
   *
   * DAILY:
   * @param {{ start: string, end: string }[]} payload.times
   *
   * WEEKDAY_WEEKEND:
   * @param {{ start: string, end: string }[]} payload.weekdayTimes
   * @param {{ start: string, end: string }[]} payload.weekendTimes
   *
   * BY_DAY:
   * @param {Record<string, { start: string, end: string }[]>} payload.dayTimes
   *   키: 'MONDAY'|'TUESDAY'|'WEDNESDAY'|'THURSDAY'|'FRIDAY'|'SATURDAY'|'SUNDAY'
   *
   * @returns {Promise<void>}
   */
  updateOperatingTimes: async (shopId, payload) => {
    const res = await axiosClient.put(
      `/api/v1/shops/${shopId}/schedule/operating-times`,
      payload
    );
    return res.data;
  },

  /**
   * 운영시간 조회
   * @param {number} shopId - 매장 ID (path param)
   * @returns {Promise<Object>} 운영시간 데이터
   *   scheduleType: 'DAILY' | 'WEEKDAY_WEEKEND' | 'BY_DAY'
   *   + scheduleType에 따라 times / weekdayTimes+weekendTimes / dayTimes 포함
   */
  getOperatingTimes: async (shopId) => {
    const res = await axiosClient.get(
      `/api/v1/shops/${shopId}/schedule/operating-times`
    );
    return res.data;
  },
};
