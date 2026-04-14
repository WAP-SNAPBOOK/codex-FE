import BottomNav from '../../components/common/BottomNav';
import Container from '../../components/common/Container';
import Header from '../../components/common/Header';
import { useAuth } from '../../context/AuthContext';
import { useLogout } from '../../query/authQueries';
import * as S from './Mypage.styles';

export default function Mypage() {
  const { auth } = useAuth();
  const logout = useLogout();

  const handleLogout = () => {
    if (!window.confirm('로그아웃하시겠어요?')) return;
    logout();
  };

  const roleLabel = auth?.userType === 'OWNER' ? '사장님 계정' : '고객 계정';

  return (
    <Container $start $padding="23px 0">
      <S.PageWrapper>
        <Header title="마이페이지" />
        <S.Content>
          <S.AccountCard>
            <S.Label>현재 로그인된 계정</S.Label>
            <S.Name>{auth?.name || '이름 없음'}</S.Name>
            <S.Meta>{auth?.phoneNumber || '전화번호 정보 없음'}</S.Meta>
            <S.RoleBadge>{roleLabel}</S.RoleBadge>
          </S.AccountCard>
          <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
        </S.Content>
        <BottomNav />
      </S.PageWrapper>
    </Container>
  );
}
