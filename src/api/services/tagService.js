import axiosClient from '../axiosClient';

export const tagService = {
  /**
   * 태그(카테고리) 생성
   * @param {string} name - 태그 이름
   * @returns {Promise<Object>} 생성된 태그 정보
   */
  createTag: async (name) => {
    const res = await axiosClient.post('/api/tags', { name });
    return res.data;
  },

  /**
   * 태그(카테고리) 목록 조회
   * @returns {Promise<Array>} 태그 목록 [{id, name}, ...]
   */
  getTags: async () => {
    const res = await axiosClient.get('/api/tags');
    return res.data;
  },
};
