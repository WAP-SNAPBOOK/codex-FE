import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/common/BottomNav';
import Container from '../../components/common/Container';
import Header from '../../components/common/Header';
import { useAuth } from '../../context/AuthContext';
import { useLogout } from '../../query/authQueries';
import { useShopLink } from '../../query/linkQueries';
import * as S from './Mypage.styles';

const SHOP_PROFILE_LINK_BASE_URL = 'https://snapbook.store/s/';

const getShopIdentifierCode = (shopLink) => {
  if (!shopLink) return null;

  if (shopLink.slug) return shopLink.slug;
  if (shopLink.publicCode) return shopLink.publicCode;

  const linkUrl = shopLink.canonicalUrl || shopLink.fullUrl;
  const [, code] = String(linkUrl || '').match(/\/s\/([^/?#]+)/) || [];
  return code || null;
};

export default function Mypage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const logout = useLogout();
  const [copyStatus, setCopyStatus] = useState('');
  const isOwner = auth?.userType === 'OWNER';
  const { data: shopLink, isLoading: isShopLinkLoading, isError: isShopLinkError } = useShopLink({
    enabled: isOwner,
  });

  const handleLogout = () => {
    if (!window.confirm('로그아웃하시겠어요?')) return;
    logout();
  };

  const handleCopyProfileLink = async () => {
    if (!shopProfileLink) return;

    try {
      await navigator.clipboard.writeText(shopProfileLink);
      setCopyStatus('공유 링크가 복사되었습니다.');
    } catch {
      setCopyStatus('복사에 실패했습니다. 링크를 길게 눌러 복사해주세요.');
    }
  };

  const roleLabel = isOwner ? '사장님 계정' : '고객 계정';
  const shopIdentifierCode = getShopIdentifierCode(shopLink);
  const shopProfileLink = shopIdentifierCode
    ? `${SHOP_PROFILE_LINK_BASE_URL}${encodeURIComponent(shopIdentifierCode)}`
    : null;

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
          {isOwner && (
            <>
              <S.ShareLinkCard>
                <S.Label>내 프로필 공유 링크</S.Label>
                {isShopLinkLoading && <S.LinkStatus>공유 링크를 불러오는 중입니다.</S.LinkStatus>}
                {isShopLinkError && (
                  <S.LinkStatus>공유 링크를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</S.LinkStatus>
                )}
                {!isShopLinkLoading && !isShopLinkError && shopProfileLink && (
                  <S.ShareLinkButton type="button" onClick={handleCopyProfileLink}>
                    {shopProfileLink}
                  </S.ShareLinkButton>
                )}
                {copyStatus && <S.CopyStatus>{copyStatus}</S.CopyStatus>}
                {!isShopLinkLoading && !isShopLinkError && !shopProfileLink && (
                  <S.LinkStatus>아직 공유 가능한 매장 식별 코드가 없습니다.</S.LinkStatus>
                )}
              </S.ShareLinkCard>
              <S.MenuManageButton
                type="button"
                onClick={() => navigate('/mypage/menus')}
                disabled={isShopLinkLoading || isShopLinkError || !shopLink?.shopId}
              >
                메뉴/카테고리 관리
              </S.MenuManageButton>
            </>
          )}
          <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
        </S.Content>
        <BottomNav />
      </S.PageWrapper>
    </Container>
  );
}
