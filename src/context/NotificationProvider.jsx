import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { notificationSocketService } from '../api/services/notificationSocketService';
import { notificationKeys } from '../query/notificationQueries';
import { authStorage } from '../utils/auth/authStorage';
import { useAuth } from './AuthContext';

export default function NotificationProvider({ children }) {
  const { auth } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!auth?.userId) return undefined;

    const accessToken = authStorage.getAccessToken();
    if (!accessToken) return undefined;

    const synchronizeNotifications = () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    };

    notificationSocketService.connect(accessToken, {
      onConnect: synchronizeNotifications,
      onNotification: synchronizeNotifications,
    });
    window.addEventListener('focus', synchronizeNotifications);

    return () => {
      window.removeEventListener('focus', synchronizeNotifications);
      notificationSocketService.disconnect();
    };
  }, [auth?.userId, queryClient]);

  return children;
}
