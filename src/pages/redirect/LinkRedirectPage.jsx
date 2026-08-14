import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '../../components/common/Container';
import { authStorage } from '../../utils/auth/authStorage';
import { useLinkChat } from '../../query/linkQueries';
import { notify } from '../../utils/appFeedback';

export default function LinkRedirectPage() {
  const { slugOrCode } = useParams(); //가게 식별 코드
  const navigate = useNavigate();
  const accessToken = authStorage.getAccessToken();

  // 1. 로그인 여부 확인
  useEffect(() => {
    if (!accessToken) {
      // 비회원이면 회원가입 페이지로 이동 + slug(매장식별코드) 유지
      navigate(`/?slug=${slugOrCode}`, { replace: true });
    }
  }, [navigate]);

  // 2️. 로그인된 상태라면 채팅방 조회 or 생성
  const { data, isLoading, isError } = useLinkChat(slugOrCode, {
    enabled: !!accessToken,
  });

  useEffect(() => {
    if (data) {
      const { roomId, shopId, isNewRoom } = data;
      //해당 채팅방 이동
      navigate(`/chat/${roomId}?slug=${slugOrCode}`, {
        state: { shopId, isNewRoom },
        replace: true, //브라우저 히스토리 덮어쓰기
      });
    }
  }, [data, navigate]);

  // 에러 시 홈으로 리다이렉트
  useEffect(() => {
    if (isError) {
      notify('잘못된 링크이거나 만료된 링크입니다.');
      navigate('/');
    }
  }, [isError, navigate]);

  if (isLoading) {
    return <Container>연결 중입니다...</Container>;
  }

  return null;
}
