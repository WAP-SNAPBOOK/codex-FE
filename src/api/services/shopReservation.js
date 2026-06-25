import axiosClient from '../axiosClient';

export const shopReservationService = {
  /**
   * 상점 예약 목록 가져오기
   * GET /api/reservations/shop
   * @returns {Promise<Array>} 예약 배열
   */
  getShopReservations: async () => {
    const response = await axiosClient.get('/api/reservations/shop');
    return response.data;
  },

  /**
   * 예약 확정
   * PUT /api/reservations/{id}/confirm
   * @param {Object} payload
   * @param {number} payload.id - 예약 ID
   * @param {string} payload.message - 점주가 남기는 메시지
   * @param {number} payload.durationMinutes - 시술 시간(분)
   * @param {string} [payload.date] - 예약 날짜 변경 시 날짜(yyyy-MM-dd)
   * @param {string} [payload.startAt] - 예약 시간 변경 시 시작 시각(HH:mm)
   */
  confirmReservation: async ({ id, message, date, durationMinutes, startAt }) => {
    const payload = {
      message,
      durationMinutes,
    };

    if (date) {
      payload.date = date;
    }

    if (startAt) {
      payload.startAt = startAt;
    }

    const res = await axiosClient.put(`/api/reservations/${id}/confirm`, payload);
    return res.data;
  },

  /**
   * 예약 거절
   * PUT /api/reservations/{id}/reject
   * @param {number} id - 예약 ID
   * @param {string} reason - 거절 사유
   */
  rejectReservation: async (id, reason) => {
    const res = await axiosClient.put(`/api/reservations/${id}/reject`, {
      reason,
    });
    return res.data;
  },

  /** 확정 예약의 날짜, 시작 시간, 소요시간, 담당자, 메뉴, 전달 메시지 수정 */
  updateReservation: async ({
    id,
    date,
    startAt,
    durationMinutes,
    staffId,
    menuSelections,
    message,
  }) => {
    const res = await axiosClient.patch(`/api/reservations/${id}`, {
      date,
      startAt,
      durationMinutes,
      staffId,
      menuSelections,
      message,
    });
    return res.data;
  },

  /** 확정 예약 취소 */
  cancelReservation: async (id, reason) => {
    const res = await axiosClient.put(`/api/reservations/${id}/cancel`, { reason });
    return res.data;
  },
};
