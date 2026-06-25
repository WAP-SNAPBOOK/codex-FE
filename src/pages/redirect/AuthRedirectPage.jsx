import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useHandleAuthCode } from '../../query/authQueries';

const AUTH_CODE_STORAGE_PREFIX = 'snapbook:kakao-auth-code:';
const reservedAuthCodes = new Set();

function reserveAuthCode(code) {
  if (reservedAuthCodes.has(code)) return false;

  try {
    const storageKey = `${AUTH_CODE_STORAGE_PREFIX}${code}`;
    if (window.sessionStorage.getItem(storageKey)) {
      reservedAuthCodes.add(code);
      return false;
    }
    window.sessionStorage.setItem(storageKey, '1');
  } catch {
    // sessionStorage may be unavailable in restricted browser modes.
  }

  reservedAuthCodes.add(code);
  return true;
}

function AuthRedirectPage() {
  const [searchParams] = useSearchParams();
  const {
    mutate: handleAuthCode,
    isPending,
    isError,
    isSuccess,
  } = useHandleAuthCode();
  const [isDuplicateCode, setIsDuplicateCode] = useState(false);
  const code = searchParams.get('code');

  useEffect(() => {
    if (!code) return;

    if (!reserveAuthCode(code)) {
      setIsDuplicateCode(true);
      return;
    }

    setIsDuplicateCode(false);
    handleAuthCode(code);
  }, [code, handleAuthCode]);

  if (isPending) return <div>로그인 처리 중</div>;

  if (isError) return <div>로그인 실패</div>;

  if (isSuccess) return <div>로그인 성공!</div>;

  if (isDuplicateCode) return <div>이미 처리 중인 로그인 요청입니다.</div>;

  return <div>인가 코드 확인 중</div>;
}

export default AuthRedirectPage;
