import { useQuery, useMutation } from '@tanstack/react-query';
import { reservationService } from '../api/services/reservationService';
import { shopReservationService } from '../api/services/shopReservation';
import { useAuth } from '../context/AuthContext';

//예약 폼 조회 훅
export const useReservationForm = (shopId, enabled) => {
  return useQuery({
    queryKey: ['reservationForm', shopId],
    queryFn: () => reservationService.getFormConfig(shopId),
    enabled, // 모달이 열릴 때만 실행되도록 제어
  });
};

//예약 생성 훅
export const useCreateReservation = (handleClose) => {
  return useMutation({
    mutationFn: (payload) => reservationService.createReservation(payload),
    onSuccess: () => {
      alert('예약이 완료되었습니다!');

      //모달 닫기까지 훅 내부에서 처리
      handleClose?.();
    },

    onError: (error) => {
      const status = error?.response?.status;
      const code = error?.response?.data?.code;

      // 409 충돌 (이미 예약된 시간)
      if (status === 409 && code === 'TIME_SLOT_ALREADY_BOOKED') {
        alert('해당 시간은 이미 예약되었거나 접수 대기 중입니다.');
        return;
      }

      //기타 오류 처리
      console.error('예약 실패:', error);
      alert('예약 중 오류가 발생했습니다.');
    },
  });
};

//채팅방 내 고객입장 예약 조회 훅
export const useCustomerChatReservations = (shopId) => {
  const { auth } = useAuth();
  return useQuery({
    queryKey: ['customerChatReservations', shopId, auth?.userId],
    queryFn: () => reservationService.getCustomerChatReservations(shopId),
    enabled: !!shopId && !!auth?.userId, // shopId 있을 때만 요청
  });
};

//채팅방 내 점주입장 예약 조회 훅
export const useOwnerChatReservations = (shopId, customerId) => {
  return useQuery({
    queryKey: ['owner-chat-reservations', shopId, customerId],
    queryFn: () => reservationService.getOwnerChatReservations(shopId, customerId),
    enabled: !!shopId && !!customerId,
  });
};

/**
 * 예약 확정 훅
 */
export const useConfirmReservation = () => {
  return useMutation({
    mutationFn: ({ id, message }) => shopReservationService.confirmReservation(id, message),

    onSuccess: () => {
      alert('예약이 확정되었습니다.');
    },
    onError: (error) => {
      console.error('예약 확정 실패:', error);
      alert('예약 확정 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 예약 거절 훅
 */
export const useRejectReservation = () => {
  return useMutation({
    mutationFn: ({ id, reason }) => shopReservationService.rejectReservation(id, reason),

    onSuccess: () => {
      alert('예약을 거절했습니다.');
    },

    onError: (error) => {
      console.error('예약 거절 실패:', error);
      alert('예약 거절 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 예약 단건 상세 조회 훅
 */
export const useReservationDetail = (reservationId) => {
  return useQuery({
    queryKey: ['reservation-detail', reservationId],
    queryFn: () => reservationService.getReservationById(reservationId),
    enabled: !!reservationId,
  });
};

/**
 * 상점별 태그(카테고리) 목록 조회 훅
 */
export const useShopTags = (shopId) => {
  return useQuery({
    queryKey: ['shop-tags', shopId],
    queryFn: () => reservationService.getShopTags(shopId),
    enabled: !!shopId,
  });
};

/**
 * 태그(카테고리)별 메뉴 목록 조회 훅
 */
export const useMenusByTag = (shopId, tagId) => {
  return useQuery({
    queryKey: ['shop-menus', shopId, tagId],
    queryFn: () => reservationService.getMenusByTag(shopId, tagId),
    enabled: !!shopId && !!tagId,
  });
};
