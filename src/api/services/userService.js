import axiosClient from '../axiosClient';

export const userService = {
  updateMyProfile: async (payload) => {
    const response = await axiosClient.patch('/user/me', payload);
    return response.data;
  },
};
