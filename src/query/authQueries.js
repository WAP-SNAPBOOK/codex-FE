import { useMutation, useQueryClient } from '@tanstack/react-query';
import { kakaoAuthService } from '../api/services/kakaoAuthService';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useHandleAuthCode = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  //링크 접속 시 식별코드 읽기
  const slug = new URLSearchParams(location.search).get('state');
  return useMutation({
    mutationFn: (code) => kakaoAuthService.exchangeCodeForToken(code),
    onSuccess: (data) => {
      //로그인 후 회원 정보 전역 상태로 저장
      login(data);

      //회언가입 분기처리
      if (data.authStatus === 'SIGNUP_REQUIRED') {
        //신규 유저 -> 가입 선택 화면으로(링크 접속 사용자는 식별코드 가지고)
        navigate(`/signup?slug=${slug || ''}`, { state: { isSignupRequired: true } });
      } else {
        //식별 코드 있다면 바로 채팅방 리다이렉트용 임시페이지 이동
        if (slug) {
          navigate(`/s/${slug}`, { replace: true });
        } else {
          // 일반 로그인시 홈으로
          navigate('/');
        }
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
    },
  });
};

// 회원탈퇴
export function useDeleteUser() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: kakaoAuthService.deleteUser,
    onSuccess: () => {
      //기존 사용자 정보 다 날리기
      logout();

      //홈 화면 이동
      navigate('/');
    },
    onError: (error) => {
      console.error('로그아웃 실패:', error);
    },
  });
}

export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
    navigate('/', { replace: true });
  };
}
