import { useMutation } from '@tanstack/react-query';
import { shopManageService } from '../api/services/shopManageService';

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
