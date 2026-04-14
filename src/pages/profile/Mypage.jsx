import BottomNav from '../../components/common/BottomNav';
import Container from '../../components/common/Container';
import Header from '../../components/common/Header';
import { useAuth } from '../../context/AuthContext';
import { useLogout } from '../../query/authQueries';
import { useMyProfile } from '../../query/userQueries';
import * as S from './Mypage.styles';

export default function Mypage() {
  const { auth } = useAuth();
  const logout = useLogout();
  const { data: me, isLoading: isMyProfileLoading } = useMyProfile({
    enabled: !!auth,
  });

  const handleLogout = () => {
    if (!window.confirm('로그아웃하시겠어요?')) return;
    logout();
  };

  const displayName =
    me?.name ??
    me?.userName ??
    me?.username ??
    me?.nickname ??
    auth?.name ??
    (isMyProfileLoading ? '불러오는 중...' : '이름 없음');

  const rawUserType = me?.userType ?? me?.role ?? auth?.userType;
  const roleLabel = rawUserType === 'OWNER' ? '점주' : rawUserType ? '고객' : '유형 없음';

  return (
    <Container $start $padding="23px 0">
      <S.PageWrapper>
        <Header title="마이페이지" />
        <S.Content>
          <S.AccountCard>
            <S.Label>내 정보</S.Label>
            <S.InfoRow>
              <S.InfoTitle>이름</S.InfoTitle>
              <S.Name>{displayName}</S.Name>
            </S.InfoRow>
            <S.InfoRow>
              <S.InfoTitle>유형</S.InfoTitle>
              <S.RoleBadge>{roleLabel}</S.RoleBadge>
            </S.InfoRow>
          </S.AccountCard>
          <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
        </S.Content>
        <BottomNav />
      </S.PageWrapper>
    </Container>
  );
}
