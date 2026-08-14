import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query';
import { chatService } from '../api/services/chatService';
import { chatSocketService } from '../api/services/chatSocketService';

//채팅방 목록 조회 훅
export const useChatRooms = (options = {}) =>
  useQuery({
    queryKey: ['chatRooms'],
    queryFn: () => chatService.getChatRooms(),
    ...options,
    enabled: options.enabled ?? true,
  });

/**
 * 특정 채팅방의 과거 메시지 조회
 * @param {number} roomId - 채팅방 ID
 */
export const useChatMessages = (roomId) => {
  return useInfiniteQuery({
    queryKey: ['messages', roomId],
    queryFn: ({ pageParam = null }) => chatService.getMessages(roomId, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor, //다음 요청시 커서 값
    enabled: !!roomId, // roomId가 있을 때만 호출
  });
};

/**
 * 메시지 전송용 훅
 * @param {number} roomId - 채팅방 ID
 * @param {function} onOptimisticUpdate - 낙관적 UI 업데이트 콜백
 */
export const useSendMessage = (roomId, onOptimisticUpdate) => {
  return useMutation({
    mutationFn: (message) => chatSocketService.sendMessage(roomId, message),

    onMutate: async (message) => {
      if (onOptimisticUpdate) onOptimisticUpdate(message);
    },

    // 실패 시 롤백
    onError: (err) => {
      console.error('메시지 전송 실패:', err);
    },
  });
};
