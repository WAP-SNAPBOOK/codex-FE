const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
import axiosClient from '../axiosClient';

export const kakaoAuthService = {
  //카카오 로그인 URL 제공
  getAuthUrl: (slug) => {
    // 매장 식별 코드가 있을 경우 경로에 추가
    const redirectParam = slug ? `&state=${encodeURIComponent(slug)}` : '';
    return (
      `https://kauth.kakao.com/oauth/authorize` +
      `?response_type=code` +
      `&client_id=${REST_API_KEY}` +
      `&redirect_uri=${REDIRECT_URI}${redirectParam}`
    );
  },

  // 인가 코드 교환 (로컬/배포 자동 선택)
  exchangeCodeForToken: async (code) => {
    const endpoint =
      import.meta.env.VITE_KAKAO_LOGIN_MODE === 'local'
        ? '/oauth/login/kakao/local' // 로컬 테스트용
        : '/oauth/login/kakao'; // 실제 운영용

    const res = await axiosClient.post(endpoint, { accessCode: code });
    return res.data;
  },

  //회원탈퇴
  deleteUser: async () => {
    const res = await axiosClient.delete('dev/user');
    return res.data;
  },
};
