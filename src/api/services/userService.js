import axiosClient from '../axiosClient';

export const userService = {
  getMe: async () => {
    const res = await axiosClient.get('/user/me');

    return res.data;
  },
};
