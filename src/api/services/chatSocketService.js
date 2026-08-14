import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

class ChatSocketService {
  constructor() {
    this.client = null;
  }

  /**
   * 소켓 연결
   * @param {string} accessToken JWT 토큰
   * @param {object} handlers 연결 상태 콜백
   */
  connect(accessToken, { onConnect, onDisconnect, onError } = {}) {
    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 5000,
      onConnect: (frame) => onConnect?.(frame),
      onStompError: (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
        console.error('Additional details:', frame.body);
        onError?.(frame);
      },
      onWebSocketError: (event) => onError?.(event),
      onWebSocketClose: (event) => onDisconnect?.(event),
    });

    this.client.activate();
  }

  /**
   * 특정 채팅방 구독
   * @param {number} chatRoomId 현재 채팅방 ID
   * @param {function} onMessage 수신 콜백
   */
  subscribe(chatRoomId, onMessage) {
    if (!this.client || !this.client.connected) return;

    const destination = `/topic/chat/${chatRoomId}`;

    this.client.subscribe(destination, (message) => {
      const body = JSON.parse(message.body);
      onMessage(body);
    });
  }

  /**
   * 메시지 전송
   * @param {number} chatRoomId
   * @param {string} message
   */
  sendMessage(chatRoomId, message) {
    if (!this.client || !this.client.connected) return;

    const destination = `/pub/chat/${chatRoomId}`;
    const payload = { message };

    this.client.publish({
      destination,
      body: JSON.stringify(payload),
    });
  }

  /**
   * 연결 종료
   */
  disconnect() {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
      console.log('[DISCONNECTED]');
    }
  }
}

export const chatSocketService = new ChatSocketService();
