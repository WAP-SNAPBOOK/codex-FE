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
   * 예약 슬롯 간격 설정
   * @param {number} shopId - 매장 ID (path param)
   * @param {number} intervalMinutes - 슬롯 간격 (분)
   */
  updateSlotInterval: async (shopId, intervalMinutes) => {
    const res = await axiosClient.put(`/api/v1/shops/${shopId}/schedule/interval`, {
      intervalMinutes,
    });
    return res.data;
  },

  /**
   * 공휴일 휴무 토글
   * @param {number} shopId - 매장 ID (path param)
   * @param {{ intervalMinutes: number, publicHolidayOff: boolean }} payload
   */
  updateScheduleSettings: async (shopId, payload) => {
    const res = await axiosClient.put(`/api/v1/shops/${shopId}/schedule/settings`, payload);
    return res.data;
  },

  /**
   * 정기 휴무일 생성
   * @param {number} shopId - 매장 ID (path param)
   * @param {Object} payload
   * @param {'WEEKLY'|'BIWEEKLY'|'MONTHLY'|'CUSTOM'} payload.holidayType
   *
   * WEEKLY:   { holidayType, dayOfWeek }
   * BIWEEKLY: { holidayType, dayOfWeek, referenceDate }  // referenceDate: 'YYYY-MM-DD'
   * MONTHLY:  { holidayType, dayOfWeek, weekOfMonth }    // weekOfMonth: 1~5
   * CUSTOM:   { holidayType, specificDate }              // specificDate: 'YYYY-MM-DD'
   *
   * @returns {Promise<{ holidayId, holidayType, dayOfWeek, weekOfMonth, referenceDate, specificDate }>}
   */
  createHoliday: async (shopId, payload) => {
    const res = await axiosClient.post(`/api/v1/shops/${shopId}/schedule/holidays`, payload);
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

  /**
   * 월별 예약 가능 캘린더 조회 (고객용)
   * @param {number} shopId - 매장 ID (path param)
   * @param {number} staffId - 스태프 ID (path param)
   * @param {string} yearMonth - 조회 월 (예: '2026-03')
   * @returns {Promise<{
   *   yearMonth: string,
   *   availableDates: number[],
   *   holidayDates: number[],
   *   closedDates: number[]
   * }>}
   */
  getMonthlyAvailability: async (shopId, staffId, yearMonth) => {
    const res = await axiosClient.get(
      `/api/v1/shops/${shopId}/staff/${staffId}/availability/monthly`,
      { params: { yearMonth } }
    );
    return res.data;
  },
};
