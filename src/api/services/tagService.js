import axiosClient from '../axiosClient';

export const tagService = {
  /**
   * 전역 태그(카테고리) 생성
   * @param {string} name - 태그 이름
   * @returns {Promise<Object>} 생성된 전역 태그 정보
   */
  createTag: async (name) => {
    const res = await axiosClient.post('/api/tags', { name });
    return res.data;
  },

  /**
   * 전역 태그(카테고리) 목록 조회
   * @returns {Promise<Array>} 전역 태그 목록 [{id, name}, ...]
   */
  getTags: async () => {
    const res = await axiosClient.get('/api/tags');
    return res.data;
  },

  /**
   * 상점별 태그(카테고리) 생성
   * @param {number} shopId - 상점 ID
   * @param {string} name - 태그 이름
   * @returns {Promise<Object>} 생성된 상점 태그 정보
   */
  createShopTag: async (shopId, name) => {
    const res = await axiosClient.post(`/api/shops/${shopId}/tags`, { name });
    return res.data;
  },

  /**
   * 상점별 태그(카테고리) 목록 조회
   * @param {number} shopId - 상점 ID
   * @returns {Promise<Array>} 상점 태그 목록 [{id, name}, ...]
   */
  getShopTags: async (shopId) => {
    const res = await axiosClient.get(`/api/shops/${shopId}/tags`);
    return res.data;
  },

  /**
   * 점주 관리용 상점별 태그(카테고리) 전체 조회
   * @param {number} shopId - 상점 ID
   * @returns {Promise<Array>} 상점 태그 목록 [{id, name}, ...]
   */
  getShopManageTags: async (shopId) => {
    const res = await axiosClient.get(`/api/shops/${shopId}/tags/manage`);
    return res.data;
  },

  /**
   * 상점별 태그(카테고리) 이름 수정
   * @param {number} shopId - 상점 ID
   * @param {number} tagId - 상점 태그 ID
   * @param {string} name - 태그 이름
   * @returns {Promise<Object>} 수정된 상점 태그 정보
   */
  updateShopTag: async (shopId, tagId, name) => {
    const res = await axiosClient.patch(`/api/shops/${shopId}/tags/${tagId}`, { name });
    return res.data;
  },

  /**
   * 상점별 태그(카테고리) 삭제
   * @param {number} shopId - 상점 ID
   * @param {number} tagId - 상점 태그 ID
   * @returns {Promise<void>}
   */
  deleteShopTag: async (shopId, tagId) => {
    await axiosClient.delete(`/api/shops/${shopId}/tags/${tagId}`);
  },
};
