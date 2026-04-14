import { createContext, useContext, useState } from 'react';
import { authStorage } from '../utils/auth/authStorage';

const AuthContext = createContext(null);

const getStoredAuthUser = () => {
  const stored = authStorage.get();
  if (!stored) return null;

  const { name, phoneNumber, userType, userId } = stored;
  return { name, phoneNumber, userType, userId };
};

const toAuthUser = (response) => ({
  name: response.name,
  phoneNumber: response.phoneNumber,
  userType: response.userType,
  userId: response.userId,
});

export function AuthProvider({ children }) {
  //회원 정보 전역 상태
  const [auth, setAuth] = useState(() => getStoredAuthUser());

  //로그인 후 받은 응답으로 토큰을 제외한 나머지 사용자 정보 상태만 관리
  const login = (response) => {
    if (!response) return;

    // 토큰 포함해서 모두 저장
    authStorage.save(response);
    setAuth(getStoredAuthUser() ?? toAuthUser(response));
  };

  //사용자 정보, 로그인 상태 초기화(로그아웃)
  const logout = () => {
    setAuth(null);
    authStorage.clear();
  };

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
