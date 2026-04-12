import { useCallback } from 'react';

const resolveMessageType = (payload = {}) => {
  if (payload.messageType) return payload.messageType;
  if (payload.imageUrl && payload.message) return 'TEXT_IMAGE';
  if (payload.imageUrl) return 'IMAGE';
  return 'TEXT';
};

/**
 * 낙관적 메시지 전송 훅
 * @param {Function} setLiveMessages - 이전 상태를 받아 새 메시지를 추가할 때 사용.
 * @param {string|number} userId - 현재 로그인한 사용자 ID
 * @param {string|number} chatRoomId - 현재 채팅방 ID
 * @returns {{
 *   addOptimisticMessage: (message: string) => void,
 *   replaceWithServerMessage: (incoming: object) => void
 * }}
 *
 */
export function useOptimisticMessage(setLiveMessages, userId, chatRoomId) {
  const addOptimisticMessage = useCallback(
    (messageOrPayload) => {
      const now = new Date();
      const tempId = `temp-${Date.now()}`;
      const payload =
        typeof messageOrPayload === 'string' ? { message: messageOrPayload } : messageOrPayload;

      // 서버와 동일한 구조로 임시 메시지 반영
      const optimisticMsg = {
        clientId: tempId,
        messageId: Date.now(), //임시 ID
        senderId: userId, //사용자 본인 ID
        senderName: 'me', // TODO: 백앤드에서 보낸 실제 사용자 본인 이름으로 교체
        message: payload.message ?? '',
        imageUrl: payload.imageUrl ?? null,
        messageType: resolveMessageType(payload),
        sentAt: now.toISOString(),
        pending: true,
        roomId: Number(chatRoomId),
      };

      setLiveMessages((prev) => [...prev, optimisticMsg]);
    },
    [setLiveMessages, userId, chatRoomId]
  );

  const replaceWithServerMessage = useCallback(
    (incoming) => {
      setLiveMessages((prev) => {
        // 1. 같은 메시지(내가 낙관적으로 추가한 메시지)인지 확인
        const idx = prev.findIndex(
          (m) =>
            m.pending &&
            m.clientId &&
            (m.message ?? '') === (incoming.message ?? '') &&
            (m.imageUrl ?? '') === (incoming.imageUrl ?? '')
        );

        if (idx >= 0) {
          // 2. 낙관적 메시지를 서버 메시지로 교체
          const updated = [...prev];
          updated[idx] = { ...incoming, pending: false };
          return updated;
        }
        // 3. 새로운 메시지면 그냥 추가
        return [...prev, incoming];
      });
    },
    [userId]
  );

  return { addOptimisticMessage, replaceWithServerMessage };
}
