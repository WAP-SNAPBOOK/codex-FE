import { useQuery, useMutation } from '@tanstack/react-query';
import { shopManageService } from '../api/services/shopManageService';

/**
 * 태그(카테고리) 목록 조회 훅
 */
export const useShopManageTags = () => {
  return useQuery({
    queryKey: ['shop-manage-tags'],
    queryFn: () => shopManageService.getTags(),
  });
};

/**
 * 태그(카테고리) 생성 훅
 */
export const useCreateShopTag = () => {
  return useMutation({
    mutationFn: (name) => shopManageService.createTag(name),
    onSuccess: () => {
      alert('태그가 생성되었습니다.');
    },
    onError: (error) => {
      console.error('태그 생성 실패:', error);
      alert('태그 생성 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 메뉴 목록 조회 훅
 */
export const useShopManageMenus = (shopId) => {
  return useQuery({
    queryKey: ['shop-manage-menus', shopId],
    queryFn: () => shopManageService.getMenus(shopId),
    enabled: !!shopId,
  });
};

/**
 * 메뉴 생성 훅
 */
export const useCreateShopMenu = () => {
  return useMutation({
    mutationFn: ({ shopId, name, description, sortOrder }) =>
      shopManageService.createMenu(shopId, { name, description, sortOrder }),
    onSuccess: () => {
      alert('메뉴가 생성되었습니다.');
    },
    onError: (error) => {
      const status = error?.response?.status;
      if (status === 409) {
        alert('동일한 이름의 메뉴가 이미 존재합니다.');
        return;
      }
      console.error('메뉴 생성 실패:', error);
      alert('메뉴 생성 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 메뉴 수정 훅
 */
export const useUpdateShopMenu = () => {
  return useMutation({
    mutationFn: ({ shopId, menuId, name, description, sortOrder }) =>
      shopManageService.updateMenu(shopId, menuId, { name, description, sortOrder }),
    onSuccess: () => {
      alert('메뉴가 수정되었습니다.');
    },
    onError: (error) => {
      console.error('메뉴 수정 실패:', error);
      alert('메뉴 수정 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 메뉴 비활성화 훅
 */
export const useDeactivateShopMenu = () => {
  return useMutation({
    mutationFn: ({ shopId, menuId }) => shopManageService.deactivateMenu(shopId, menuId),
    onSuccess: () => {
      alert('메뉴가 비활성화되었습니다.');
    },
    onError: (error) => {
      console.error('메뉴 비활성화 실패:', error);
      alert('메뉴 비활성화 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 메뉴에 태그 연결 훅
 */
export const useLinkMenuTag = () => {
  return useMutation({
    mutationFn: ({ shopId, menuId, tagId }) => shopManageService.linkMenuTag(shopId, menuId, tagId),
    onSuccess: () => {
      alert('태그가 연결되었습니다.');
    },
    onError: (error) => {
      console.error('태그 연결 실패:', error);
      alert('태그 연결 중 오류가 발생했습니다.');
    },
  });
};
