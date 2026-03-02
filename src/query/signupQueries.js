import { useMutation } from '@tanstack/react-query';
import { signupService } from '../api/services/signupService';
import { authStorage } from '../utils/auth/authStorage';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUpdateOperatingTimes } from './scheduleQueries';

export const useSignupCustomer = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // 매장 식별 코드
  const slug = new URLSearchParams(location.search).get('slug');

  return useMutation({
    mutationFn: (payload) => signupService.signupCustomer(payload),
    onSuccess: (data) => {
      //고객으로 회원가입 성공시 기존 데이터 다 날리기
      authStorage.clear();

      //사용자 정보 전역 상태 + 스토리지 저장
      login(data);

      // slug가 있으면 매장 채팅방 페이지로 이동
      if (slug) {
        navigate(`/s/${slug}`, { replace: true });
      } else {
        navigate('/'); // 기본 홈
      }
    },
  });
};

// 점주 회원가입 전체 플로우: 기본정보 → 운영시간 설정
export const useOwnerSignupFlow = () => {
  const signup = useSignupOwner();
  const updateOperatingTimes = useUpdateOperatingTimes();

  const submit = async (step1Data, schedulePayload) => {
    const { shopId } = await signup.mutateAsync(step1Data); // 1) 점주 기본 정보 회원가입
    await updateOperatingTimes.mutateAsync({ shopId, ...schedulePayload }); // 2) 운영시간 설정
  };

  return {
    submit,
    isPending: signup.isPending || updateOperatingTimes.isPending,
    isError: signup.isError || updateOperatingTimes.isError,
    error: signup.error || updateOperatingTimes.error,
  };
};

// 점주 회원가입: signupOwner → 토큰 저장 → registerShopInfo 순차 호출
export const useSignupOwner = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: async ({ name, phoneNumber, businessName, address }) => {
      const ownerData = await signupService.signupOwner({ name, phoneNumber });
      // registerShopInfo가 인증을 요구하므로 먼저 토큰 저장
      authStorage.save(ownerData);
      const shopInfo = await signupService.registerShopInfo({ businessName, address });
      return { ...ownerData, shopId: shopInfo.shopId };
    },
    onSuccess: ({ shopId: _shopId, ...ownerData }) => {
      login(ownerData);
    },
  });
};
