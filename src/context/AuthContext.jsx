import { createContext, useContext, useState, useEffect } from 'react';
import { authStorage } from '../utils/auth/authStorage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  //회원 정보 전역 상태
  const [auth, setAuth] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    try {
      const stored = authStorage.get();
      if (stored) {
        //토큰을 제외한 사용자 정보만 관리
        const { name, phoneNumber, userType, userId } = stored;
        setAuth({ name, phoneNumber, userType, userId });
      }
    } catch (error) {
      console.error('저장된 로그인 정보를 불러오지 못했습니다.', error);
      authStorage.clear();
    } finally {
      setIsAuthReady(true);
    }
  }, []);

  //로그인 후 받은 응답으로 토큰을 제외한 나머지 사용자 정보 상태만 관리
  const login = (response) => {
    if (!response) return;

    // 화면에서 관리할 사용자 정보만 설정 (토큰 제외)
    setAuth({
      name: response.name,
      phoneNumber: response.phoneNumber,
      userType: response.userType,
      userId: response.userId,
    });

    // 토큰 포함해서 모두 저장
    authStorage.save(response);
  };

  //사용자 정보, 로그인 상태 초기화(로그아웃)
  const logout = () => {
    setAuth(null);
    authStorage.clear();
  };

  const updateProfile = (profile) => {
    if (!profile) return;

    setAuth((current) => (current ? { ...current, ...profile } : current));
    const stored = authStorage.get();
    if (stored) authStorage.save({ ...stored, ...profile });
  };

  return (
    <AuthContext.Provider value={{ auth, isAuthReady, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
