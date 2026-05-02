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
  getMenus: async (shopId, tagIds) => {
    const params = tagIds ? { tagIds } : undefined;
    const res = await axiosClient.get(`/api/shops/${shopId}/menus`, { params });
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
   * @param {number} shopTagId - /api/shops/{shopId}/tags 에서 받은 상점 태그 ID
   * @returns {Promise<void>}
   */
  linkMenuTag: async (shopId, menuId, shopTagId) => {
    await axiosClient.post(`/api/shops/${shopId}/menus/${menuId}/tags`, { tagId: shopTagId });
  },

  /**
   * 태그에서 메뉴 제거
   * @param {number} shopId - 상점 ID (path param)
   * @param {number} menuId - 메뉴 ID (path param)
   * @param {number} shopTagId - 상점 태그 ID (path param)
   * @returns {Promise<void>}
   */
  unlinkMenuTag: async (shopId, menuId, shopTagId) => {
    await axiosClient.delete(`/api/shops/${shopId}/menus/${menuId}/tags/${shopTagId}`);
  },

  /**
   * 메뉴 입력 필드 생성
   * @param {number} shopId - 상점 ID (path param)
   * @param {number} menuId - 메뉴 ID (path param)
   * @param {Object} body - { label, inputType, required, minValue, maxValue, stepValue, maxLength, placeholder, sortOrder }
   * @returns {Promise<Object>} 생성된 입력 필드 정보
   */
  createInputField: async (shopId, menuId, body) => {
    const res = await axiosClient.post(`/api/shops/${shopId}/menus/${menuId}/input-fields`, body);
    return res.data;
  },

  /**
   * 메뉴 입력 필드 조회
   * @param {number} shopId - 상점 ID (path param)
   * @param {number} menuId - 메뉴 ID (path param)
   * @returns {Promise<Array>} 입력 필드 목록
   */
  getInputFields: async (shopId, menuId) => {
    const res = await axiosClient.get(`/api/shops/${shopId}/menus/${menuId}/input-fields`);
    return res.data;
  },

  /**
   * 메뉴 입력 필드 수정
   * @param {number} shopId - 상점 ID (path param)
   * @param {number} menuId - 메뉴 ID (path param)
   * @param {number} fieldId - 입력 필드 ID (path param)
   * @param {Object} body - { label, minValue, maxValue, stepValue, maxLength, placeholder, sortOrder }
   * @returns {Promise<Object>} 수정된 입력 필드 정보
   */
  updateInputField: async (shopId, menuId, fieldId, body) => {
    const res = await axiosClient.patch(
      `/api/shops/${shopId}/menus/${menuId}/input-fields/${fieldId}`,
      body
    );
    return res.data;
  },

  /**
   * 메뉴 입력 필드 비활성화
   * @param {number} shopId - 상점 ID (path param)
   * @param {number} menuId - 메뉴 ID (path param)
   * @param {number} fieldId - 입력 필드 ID (path param)
   * @returns {Promise<void>}
   */
  deactivateInputField: async (shopId, menuId, fieldId) => {
    await axiosClient.delete(`/api/shops/${shopId}/menus/${menuId}/input-fields/${fieldId}`);
  },
};
