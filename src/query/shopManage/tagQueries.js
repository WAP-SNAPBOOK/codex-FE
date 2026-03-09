import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tagService } from '../../api/services/tagService';

/**
 * 태그(카테고리) 목록 조회 훅
 */
export const useShopManageTags = () => {
  return useQuery({
    queryKey: ['shop-manage-tags'],
    queryFn: () => tagService.getTags(),
  });
};

/**
 * 태그(카테고리) 생성 훅
 */
export const useCreateShopTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name) => tagService.createTag(name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shop-manage-tags'] });
    },
    onError: (error) => {
      console.error('태그 생성 실패:', error);
      alert('태그 생성 중 오류가 발생했습니다.');
    },
  });
};
