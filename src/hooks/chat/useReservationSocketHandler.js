import { useCallback } from 'react';
import { reservationService } from '../../api/services/reservationService';
import { normalizeReservationPayload } from '../../utils/normalizeReservationPayload';

const RESERVATION_MESSAGE_TYPES = [
  'RESERVATION_CREATED',
  'RESERVATION_CONFIRMED',
  'RESERVATION_REJECTED',
  'RESERVATION_UPDATED',
  'RESERVATION_CANCELED',
];

const getMessageType = (incoming = {}) => incoming.messageType ?? incoming.type;

export function useReservationSocketHandler(setLiveMessages) {
  const handleReservationMessage = useCallback(
    async (incoming) => {
      const messageType = getMessageType(incoming);

      // 예약 메시지가 아니면 처리 안 함
      if (!RESERVATION_MESSAGE_TYPES.includes(messageType)) {
        return false;
      }

      try {
        const reservation = await reservationService.getReservationById(incoming.reservationId);
        const payload = normalizeReservationPayload({
          ...reservation,
          durationMinutes: incoming.durationMinutes ?? reservation.durationMinutes,
        });

        setLiveMessages((prev) => {
          return [
            ...prev,
            {
              messageId: incoming.messageId,
              senderId: incoming.senderId,
              senderName: incoming.senderName,
              sentAt: incoming.sentAt,
              message: incoming.message ?? incoming.content ?? '',
              reservationChange: incoming.reservationChange ?? null,
              ownerMessage: incoming.ownerMessage ?? null,

              isReservationCard: true,
              type: messageType, // 예약 상태의 기준
              payload,
            },
          ];
        });

        return true;
      } catch (e) {
        console.error('예약 단건 조회 실패', e);
        setLiveMessages((prev) => [
          ...prev,
          {
            ...incoming,
            message: incoming.message ?? incoming.content ?? '',
            reservationChange: incoming.reservationChange ?? null,
            ownerMessage: incoming.ownerMessage ?? null,
            isReservationCard: true,
            type: messageType,
            payload: normalizeReservationPayload(
              incoming.reservation ?? incoming.payload ?? incoming
            ),
          },
        ]);
        return true; // 예약 메시지였으니 여기서 소비
      }
    },
    [setLiveMessages]
  );

  return { handleReservationMessage };
}
