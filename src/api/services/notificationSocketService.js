import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

class NotificationSocketService {
  constructor() {
    this.client = null;
    this.subscription = null;
  }

  connect(accessToken, { onNotification, onConnect, onDisconnect, onError } = {}) {
    this.disconnect();

    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 5000,
      onConnect: (frame) => {
        this.subscription = this.client.subscribe('/user/queue/notifications', (message) => {
          onNotification?.(JSON.parse(message.body));
        });
        onConnect?.(frame);
      },
      onStompError: (frame) => onError?.(frame),
      onWebSocketError: (event) => onError?.(event),
      onWebSocketClose: (event) => onDisconnect?.(event),
    });

    this.client.activate();
  }

  disconnect() {
    this.subscription?.unsubscribe();
    this.subscription = null;

    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
  }
}

export const notificationSocketService = new NotificationSocketService();
