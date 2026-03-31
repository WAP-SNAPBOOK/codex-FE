import { useQuery } from '@tanstack/react-query';
import { shopLinkService } from '../api/services/shopLinkService';

//매장 링크 조회 (점주용)
export const useShopLink = (options = {}) => {
  return useQuery({
    queryKey: ['shopLink'],
    queryFn: () => shopLinkService.getShopLink(),
    ...options,
  });
};

//식별 코드를 통한  채팅방 생성 or 조회
export const useLinkChat = (slugOrCode, options = {}) => {
  return useQuery({
    queryKey: ['linkChat', slugOrCode],
    queryFn: () => shopLinkService.getChatRoomByCode(slugOrCode),
    enabled: !!slugOrCode && (options.enabled ?? true),
  });
};

// 매장 정보 조회 (공개 링크 접근 시)
export const useShopInfoByCode = (slugOrCode) => {
  return useQuery({
    queryKey: ['shopInfo', slugOrCode],
    queryFn: () => shopLinkService.getShopInfoByCode(slugOrCode),
    enabled: !!slugOrCode,
  });
};
