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
   * @param {function} onConnect 연결 완료 콜백
   * @param {function} onError onError 에러 콜백
   */
  connect(accessToken, onConnect, onError) {
    this.client = new Client({
      webSocketFactory: () => new SockJS(SOCKET_URL),
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      reconnectDelay: 5000,
      onConnect,
      onStompError: (frame) => {
        console.log('Broker reported error: ', +frame.headers['message']);
        console.log('Additional details' + frame.body);
        if (onError) onError(frame);
      },
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
   * @param {string|Object} messageOrPayload
   */
  sendMessage(chatRoomId, messageOrPayload) {
    if (!this.client || !this.client.connected) return;

    const destination = `/pub/chat/${chatRoomId}`;
    const payload =
      typeof messageOrPayload === 'string' ? { message: messageOrPayload } : messageOrPayload;

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
