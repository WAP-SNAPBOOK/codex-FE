import axiosClient from '../axiosClient';

export const notificationService = {
  getNotifications: async ({ cursor = null, size = 50 } = {}) => {
    const params = { size };
    if (cursor !== null && cursor !== undefined) params.cursor = cursor;

    const response = await axiosClient.get('/api/notifications', { params });
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await axiosClient.get('/api/notifications/unread-count');
    return response.data;
  },

  markAsRead: async (notificationId) => {
    await axiosClient.patch(`/api/notifications/${notificationId}/read`);
  },

  markAllAsRead: async () => {
    await axiosClient.patch('/api/notifications/read-all');
  },
};
