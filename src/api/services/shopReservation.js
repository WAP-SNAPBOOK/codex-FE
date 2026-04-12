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
   * @param {string} [payload.startAt] - 예약 시간 변경 시 시작 시각(HH:mm)
   */
  confirmReservation: async ({ id, message, durationMinutes, startAt }) => {
    const payload = {
      message,
      durationMinutes,
    };

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
};
