import axiosClient from '../axiosClient';

export const shopManageService = {
  /**
   * 태그(카테고리) 생성
   * @param {string} name - 태그 이름
   * @returns {Promise<Object>} 생성된 태그 정보
   */
  createTag: async (name) => {
    const res = await axiosClient.post('/api/tags', { name });
    return res.data;
  },
};
