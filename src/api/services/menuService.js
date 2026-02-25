import axiosClient from '../axiosClient';

export const menuService = {
  /**
   * 메뉴 생성
   * @param {number} shopId - 상점 ID (path param)
   * @param {Object} body - { name, description, sortOrder }
   * @returns {Promise<Object>} 생성된 메뉴 정보
   */
  createMenu: async (shopId, body) => {
    const res = await axiosClient.post(`/api/shops/${shopId}/menus`, body);
    return res.data;
  },

  /**
   * 메뉴 목록 조회
   * @param {number} shopId - 상점 ID (path param)
   * @returns {Promise<Array>} 메뉴 목록 [{id, shopId, name, description, isActive, sortOrder}, ...]
   */
  getMenus: async (shopId) => {
    const res = await axiosClient.get(`/api/shops/${shopId}/menus`);
    return res.data;
  },

  /**
   * 메뉴 수정
   * @param {number} shopId - 상점 ID (path param)
   * @param {number} menuId - 메뉴 ID (path param)
   * @param {Object} body - { name, description, sortOrder }
   * @returns {Promise<Object>} 수정된 메뉴 정보
   */
  updateMenu: async (shopId, menuId, body) => {
    const res = await axiosClient.patch(`/api/shops/${shopId}/menus/${menuId}`, body);
    return res.data;
  },

  /**
   * 메뉴 비활성화
   * @param {number} shopId - 상점 ID (path param)
   * @param {number} menuId - 메뉴 ID (path param)
   * @returns {Promise<void>}
   */
  deactivateMenu: async (shopId, menuId) => {
    await axiosClient.delete(`/api/shops/${shopId}/menus/${menuId}`);
  },

  /**
   * 메뉴에 태그 연결
   * @param {number} shopId - 상점 ID (path param)
   * @param {number} menuId - 메뉴 ID (path param)
   * @param {number} tagId - 태그 ID
   * @returns {Promise<void>}
   */
  linkMenuTag: async (shopId, menuId, tagId) => {
    await axiosClient.post(`/api/shops/${shopId}/menus/${menuId}/tags`, { tagId });
  },

  /**
   * 태그에서 메뉴 제거
   * @param {number} shopId - 상점 ID (path param)
   * @param {number} menuId - 메뉴 ID (path param)
   * @param {number} tagId - 태그 ID (path param)
   * @returns {Promise<void>}
   */
  unlinkMenuTag: async (shopId, menuId, tagId) => {
    await axiosClient.delete(`/api/shops/${shopId}/menus/${menuId}/tags/${tagId}`);
  },
};
