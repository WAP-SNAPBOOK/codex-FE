import { useRef, useState, useEffect } from 'react';
import { reservationService } from '../../api/services/reservationService';
import { normalizeReservationPayload } from '../../utils/normalizeReservationPayload';

export function useNormalizedMessages(rawMessages) {
  const cacheRef = useRef(new Map());

  const [normalized, setNormalized] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function normalize() {
      const result = await Promise.all(
        rawMessages.map(async (msg) => {
          //메시지에 예약 Id 불포함 시 일반 텍스트 메시지
          if (!msg.reservationId) {
            return msg;
          }

          // 이미 처리한 예약이면 재요청 X
          if (cacheRef.current.has(msg.reservationId)) {
            return {
              ...msg,
              isReservationCard: true,
              type: msg.messageType,
              payload: cacheRef.current.get(msg.reservationId),
            };
          }

          try {
            const r = await reservationService.getReservationById(msg.reservationId);
            const payload = normalizeReservationPayload(r);
            const converted = {
              ...msg,
              messageId: msg.messageId,
              senderId: msg.senderId,
              senderName: msg.senderName,
              sentAt: msg.sentAt,
              isReservationCard: true,
              type: msg.messageType,
              payload,
            };
            cacheRef.current.set(msg.reservationId, payload);
            return converted;
          } catch (err) {
            console.error('예약 상세 조회 실패:', err);
            return msg; // 실패 시 원본 메시지로 fallback
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
