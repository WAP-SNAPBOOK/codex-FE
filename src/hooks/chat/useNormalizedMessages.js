import { useRef, useState, useEffect } from 'react';
import { reservationService } from '../../api/services/reservationService';
import { normalizeReservationPayload } from '../../utils/normalizeReservationPayload';

const RESERVATION_MESSAGE_TYPES = new Set([
  'RESERVATION_CREATED',
  'RESERVATION_CONFIRMED',
  'RESERVATION_REJECTED',
  'RESERVATION_UPDATED',
  'RESERVATION_CANCELED',
]);

const getMessageType = (msg = {}) => msg.messageType ?? msg.type;

const isReservationMessage = (msg = {}) =>
  Boolean(msg.reservationId) && RESERVATION_MESSAGE_TYPES.has(getMessageType(msg));

export function useNormalizedMessages(rawMessages) {
  const cacheRef = useRef(new Map());

  const [normalized, setNormalized] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function normalize() {
      const result = await Promise.all(
        rawMessages.map(async (msg) => {
          //메시지에 예약 Id 불포함 시 일반 텍스트 메시지
          if (!isReservationMessage(msg)) {
            return msg;
          }

          // 이미 처리한 예약이면 재요청 X
          if (cacheRef.current.has(msg.reservationId)) {
            const cachedPayload = cacheRef.current.get(msg.reservationId);
            return {
              ...msg,
              message: msg.message ?? msg.content ?? '',
              isReservationCard: true,
              type: getMessageType(msg),
              payload: {
                ...cachedPayload,
                durationMinutes: msg.durationMinutes ?? cachedPayload.durationMinutes,
              },
            };
          }

          try {
            const r = await reservationService.getReservationById(msg.reservationId);
            const payload = normalizeReservationPayload({
              ...r,
              durationMinutes: msg.durationMinutes ?? r.durationMinutes,
            });
            const converted = {
              ...msg,
              messageId: msg.messageId,
              senderId: msg.senderId,
              senderName: msg.senderName,
              sentAt: msg.sentAt,
              message: msg.message ?? msg.content ?? '',
              isReservationCard: true,
              type: getMessageType(msg),
              payload,
            };
            cacheRef.current.set(msg.reservationId, payload);
            return converted;
          } catch (err) {
            console.error('예약 상세 조회 실패:', err);
            return {
              ...msg,
              message: msg.message ?? msg.content ?? '',
              isReservationCard: true,
              type: getMessageType(msg),
              payload: normalizeReservationPayload(msg.reservation ?? msg.payload ?? msg),
            };
          }
        })
      );

      if (!cancelled) setNormalized(result);
    }

    normalize();
    return () => (cancelled = true);
  }, [rawMessages]);

  return normalized;
}
