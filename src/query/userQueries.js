import { useQuery } from '@tanstack/react-query';
import { userService } from '../api/services/userService';

export const useMyProfile = (options = {}) => {
  return useQuery({
    queryKey: ['myProfile'],
    queryFn: userService.getMe,
    ...options,
  });
};
