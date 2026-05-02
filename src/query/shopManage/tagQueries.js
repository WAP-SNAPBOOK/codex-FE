import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagService } from '../../api/services/tagService';

/**
 * 상점별 태그(카테고리) 목록 조회 훅
 */
export const useShopManageTags = (shopId) => {
  return useQuery({
    queryKey: ['shop-manage-tags', shopId],
    queryFn: () => tagService.getShopManageTags(shopId),
    enabled: !!shopId,
  });
};

/**
 * 상점별 태그(카테고리) 생성 훅
 */
export const useCreateShopTag = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ shopId, name }) => tagService.createShopTag(shopId, name),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['shop-manage-tags', shopId] });
      queryClient.invalidateQueries({ queryKey: ['shop-tags', shopId] });
      options.onSuccess?.();
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
        return;
      }
      console.error('태그 생성 실패:', error);
      alert('태그 생성 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 상점별 태그(카테고리) 이름 수정 훅
 */
export const useUpdateShopTag = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ shopId, tagId, name }) => tagService.updateShopTag(shopId, tagId, name),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['shop-manage-tags', shopId] });
      queryClient.invalidateQueries({ queryKey: ['shop-tags', shopId] });
      options.onSuccess?.();
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
        return;
      }
      console.error('태그 수정 실패:', error);
      alert('카테고리 수정 중 오류가 발생했습니다.');
    },
  });
};

/**
 * 상점별 태그(카테고리) 삭제 훅
 */
export const useDeleteShopTag = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ shopId, tagId }) => tagService.deleteShopTag(shopId, tagId),
    onSuccess: (_, { shopId }) => {
      queryClient.invalidateQueries({ queryKey: ['shop-manage-tags', shopId] });
      queryClient.invalidateQueries({ queryKey: ['shop-tags', shopId] });
      options.onSuccess?.();
    },
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
        return;
      }
      console.error('태그 삭제 실패:', error);
      alert('카테고리 삭제 중 오류가 발생했습니다.');
    },
  });
};
