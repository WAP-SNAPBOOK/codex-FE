import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '../api/services/notificationService';

export const notificationKeys = {
  all: ['notifications'],
  list: () => [...notificationKeys.all, 'list'],
  unreadCount: () => [...notificationKeys.all, 'unread-count'],
};

export const useNotifications = () =>
  useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => notificationService.getNotifications({ size: 50 }),
  });

export const useUnreadNotificationCount = ({ enabled = true } = {}) =>
  useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: notificationService.getUnreadCount,
    enabled,
  });

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  });
};
