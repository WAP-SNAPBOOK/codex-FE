import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { menuService } from '../../api/services/menuService';

/**
 * 메뉴 목록 조회 훅
 */
export const useShopManageMenus = (shopId, tagId) => {
  return useQuery({
    queryKey: ['shop-manage-menus', shopId, tagId ?? 'all'],
    queryFn: () => menuService.getMenus(shopId, tagId),
    enabled: !!shopId,
  });
};

/**
 * 메뉴 생성 훅
 */
export const useCreateShopMenu = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ shopId, name, description, sortOrder }) =>
      menuService.createMenu(shopId, { name, description, sortOrder }),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['shop-manage-menus', shopId] });
      options.onSuccess?.();
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
        return;
      }
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
export const useUpdateShopMenu = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ shopId, menuId, name, description, sortOrder }) =>
      menuService.updateMenu(shopId, menuId, { name, description, sortOrder }),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['shop-manage-menus', shopId] });
      if (!options.silent) {
        alert('메뉴가 수정되었습니다.');
      }
      options.onSuccess?.();
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
        return;
      }
      console.error('메뉴 수정 실패:', error);
      alert('메뉴 수정 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 메뉴 비활성화 훅
 */
export const useDeactivateShopMenu = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ shopId, menuId }) => menuService.deactivateMenu(shopId, menuId),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['shop-manage-menus', shopId] });
      queryClient.invalidateQueries({ queryKey: ['shop-manage-tags', shopId] });
      if (!options.silent) {
        alert('메뉴가 비활성화되었습니다.');
      }
      options.onSuccess?.();
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
        return;
      }
      console.error('메뉴 비활성화 실패:', error);
      alert('메뉴 비활성화 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 메뉴에 태그 연결 훅
 */
export const useLinkMenuTag = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ shopId, menuId, shopTagId }) =>
      menuService.linkMenuTag(shopId, menuId, shopTagId),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['shop-manage-menus', shopId] });
      queryClient.invalidateQueries({ queryKey: ['shop-manage-tags', shopId] });
      queryClient.invalidateQueries({ queryKey: ['shop-tags', shopId] });
      options.onSuccess?.();
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
        return;
      }
      console.error('태그 연결 실패:', error);
      alert('태그 연결 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 태그에서 메뉴 제거 훅
 */
export const useUnlinkMenuTag = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ shopId, menuId, shopTagId }) =>
      menuService.unlinkMenuTag(shopId, menuId, shopTagId),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['shop-manage-menus', shopId] });
      queryClient.invalidateQueries({ queryKey: ['shop-manage-tags', shopId] });
      queryClient.invalidateQueries({ queryKey: ['shop-tags', shopId] });
      if (!options.silent) {
        alert('메뉴가 태그에서 제거되었습니다.');
      }
      options.onSuccess?.();
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
        return;
      }
      console.error('태그에서 메뉴 제거 실패:', error);
      alert('태그에서 메뉴 제거 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 메뉴 입력 필드 조회 훅
 */
export const useMenuInputFields = (shopId, menuId) => {
  return useQuery({
    queryKey: ['menu-input-fields', shopId, menuId],
    queryFn: () => menuService.getInputFields(shopId, menuId),
    enabled: !!shopId && !!menuId,
  });
};

/**
 * 메뉴 입력 필드 생성 훅
 */
export const useCreateMenuInputField = () => {
  return useMutation({
    mutationFn: ({ shopId, menuId, ...body }) => menuService.createInputField(shopId, menuId, body),
    onError: (error) => {
      console.error('입력 필드 생성 실패:', error);
      alert('입력 필드 생성 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 메뉴 입력 필드 수정 훅
 */
export const useUpdateMenuInputField = () => {
  return useMutation({
    mutationFn: ({ shopId, menuId, fieldId, ...body }) =>
      menuService.updateInputField(shopId, menuId, fieldId, body),
    onSuccess: () => {
      alert('입력 필드가 수정되었습니다.');
    },
    onError: (error) => {
      console.error('입력 필드 수정 실패:', error);
      alert('입력 필드 수정 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 메뉴 입력 필드 비활성화 훅
 */
export const useDeactivateMenuInputField = () => {
  return useMutation({
    mutationFn: ({ shopId, menuId, fieldId }) =>
      menuService.deactivateInputField(shopId, menuId, fieldId),
    onSuccess: () => {
      alert('입력 필드가 비활성화되었습니다.');
    },
    onError: (error) => {
      console.error('입력 필드 비활성화 실패:', error);
      alert('입력 필드 비활성화 중 오류가 발생했습니다.');
    },
  });
};
