import { useCallback } from 'react';
import { reservationService } from '../../api/services/reservationService';
import { normalizeReservationPayload } from '../../utils/normalizeReservationPayload';

const RESERVATION_MESSAGE_TYPES = [
  'RESERVATION_CREATED',
  'RESERVATION_CONFIRMED',
  'RESERVATION_REJECTED',
];

export function useReservationSocketHandler(setLiveMessages) {
  const handleReservationMessage = useCallback(
    async (incoming) => {
      // 예약 메시지가 아니면 처리 안 함
      if (!RESERVATION_MESSAGE_TYPES.includes(incoming.messageType)) {
        return false;
      }

      try {
        const reservation = await reservationService.getReservationById(incoming.reservationId);

        setLiveMessages((prev) => {
          return [
            ...prev,
            {
              messageId: incoming.messageId,
              senderId: incoming.senderId,
              senderName: incoming.senderName,
              sentAt: incoming.sentAt,

              isReservationCard: true,
              type: incoming.messageType, // 예약 상태의  기준
              payload: normalizeReservationPayload(reservation),
            },
          ];
        });

        return true;
      } catch (e) {
        console.error('예약 단건 조회 실패', e);
        return true; // 예약 메시지였으니 여기서 소비
      }
    },
    [setLiveMessages]
  );

  return { handleReservationMessage };
}
