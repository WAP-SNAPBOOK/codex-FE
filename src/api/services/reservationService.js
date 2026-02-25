import axiosClient from '../axiosClient';

export const reservationService = {
  /**
   * 상점별 예약 폼 구성 가져오기
   * @param {number} shopId - 상점 ID (path param)
   * @returns {Promise<Array>} 예약 폼 필드 배열
   */
  getFormConfig: async (shopId) => {
    const res = await axiosClient.get(`/api/v1/form/${shopId}`, {
      params: {
        shopId,
      },
    });
    return res.data;
  },

  /**
   * 예약 생성 API
   * @param {Object} payload - 예약 데이터 (shopId, formData)
   * @returns {Promise<Object>} 생성된 예약 정보
   */
  createReservation: async (payload) => {
    const res = await axiosClient.post(`/api/reservations`, payload);
    return res.data;
  },

  /**
   * 채팅방 내 고객 예약 조회 (고객이 보는 채팅 예약 목록)
   * @param {number} shopId - 상점 ID (query)
   * @returns {Promise<Array>} 예약 목록
   */
  getCustomerChatReservations: async (shopId) => {
    const res = await axiosClient.get('/api/reservations/chat/customer', {
      params: { shopId },
    });

    return res.data;
  },

  /**
   * 채팅방 내 고객 예약 조회 (점주가 보는 채팅 예약 목록)
   * @param {number} shopId
   * @param {number} customerId
   * @returns {Promise<Array>}
   */
  getOwnerChatReservations: async (shopId, customerId) => {
    const res = await axiosClient.get('/api/reservations/chat/owner', {
      params: { shopId, customerId },
    });
    return res.data;
  },

  /**
   * 예약 단건 상세 조회
   * @param {number} reservationId
   * @returns {Promise<Object>}
   */
  getReservationById: async (reservationId) => {
    const res = await axiosClient.get(`/api/reservations/${reservationId}`);
    return res.data;
  },

  /**
   * 상점별 태그(카테고리) 목록 조회
   * @param {number} shopId - 상점 ID (path param)
   * @returns {Promise<Array>} 태그 목록 [{id, name}, ...]
   */
  getShopTags: async (shopId) => {
    const res = await axiosClient.get(`/api/shops/${shopId}/tags`);
    return res.data;
  },

  /**
   * 태그(카테고리)별 메뉴 목록 조회
   * @param {number} shopId - 상점 ID (path param)
   * @param {number} tagId - 태그 ID (query param)
   * @returns {Promise<Array>} 메뉴 목록 [{id, shopId, name, description, isActive, sortOrder}, ...]
   */
  getMenusByTag: async (shopId, tagId) => {
    const res = await axiosClient.get(`/api/shops/${shopId}/menus`, {
      params: { tagIds: tagId },
    });
    return res.data;
  },
};
