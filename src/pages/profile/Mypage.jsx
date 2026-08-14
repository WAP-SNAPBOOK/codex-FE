import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/common/BottomNav';
import Container from '../../components/common/Container';
import Header from '../../components/common/Header';
import { useAuth } from '../../context/AuthContext';
import { useLogout } from '../../query/authQueries';
import { useShopLink } from '../../query/linkQueries';
import { useShopInfoById } from '../../query/shopQueries';
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

const getProfileInitial = (name) =>
  String(name || 'S')
    .trim()
    .charAt(0)
    .toUpperCase();

const formatPhoneNumber = (phoneNumber) => {
  const digits = String(phoneNumber || '').replace(/\D/g, '');
  if (digits.length !== 11) return phoneNumber;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

function MenuManageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="4" height="4" rx="1" />
      <rect x="3" y="10" width="4" height="4" rx="1" />
      <rect x="3" y="16" width="4" height="4" rx="1" />
      <path d="M11 6h10M11 12h10M11 18h10" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M8 3v4M16 3v4M3 10h18M8 15l2 2 4-4" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 0 1-9 8.5 9.7 9.7 0 0 1-3.8-.8L3 21l1.8-5.2A8.2 8.2 0 0 1 3 10.7 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" />
    </svg>
  );
}

function ServiceMenuItem({ icon: Icon, label, description, onClick, disabled = false }) {
  return (
    <S.ServiceMenuButton type="button" onClick={onClick} disabled={disabled}>
      <S.ServiceIcon aria-hidden="true">
        <Icon />
      </S.ServiceIcon>
      <S.ServiceText>
        <strong>{label}</strong>
        <span>{description}</span>
      </S.ServiceText>
      <S.Chevron aria-hidden="true">›</S.Chevron>
    </S.ServiceMenuButton>
  );
}

export default function Mypage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const logout = useLogout();
  const [shareStatus, setShareStatus] = useState('');
  const isOwner = auth?.userType === 'OWNER';
  const {
    data: shopLink,
    isLoading: isShopLinkLoading,
    isError: isShopLinkError,
  } = useShopLink({ enabled: isOwner });
  const { data: shopInfo } = useShopInfoById(isOwner ? shopLink?.shopId : null);

  const roleLabel = isOwner ? '사장님' : '고객';
  const shopIdentifierCode = getShopIdentifierCode(shopLink);
  const shopProfileLink = shopIdentifierCode
    ? `${SHOP_PROFILE_LINK_BASE_URL}${encodeURIComponent(shopIdentifierCode)}`
    : null;

  const handleLogout = () => {
    if (!window.confirm('로그아웃하시겠어요?')) return;
    logout();
  };

  const handleShareProfileLink = async () => {
    if (!shopProfileLink) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${shopInfo?.shopName || 'SNAPBOOK 매장'} 예약 링크`,
          text: '아래 링크에서 예약과 상담을 시작해보세요.',
          url: shopProfileLink,
        });
        setShareStatus('공유가 완료되었습니다.');
        return;
      }

      await navigator.clipboard.writeText(shopProfileLink);
      setShareStatus('예약 링크가 복사되었습니다.');
    } catch (error) {
      if (error?.name === 'AbortError') return;
      setShareStatus('공유하지 못했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const handleCopyProfileLink = async () => {
    if (!shopProfileLink) return;

    try {
      await navigator.clipboard.writeText(shopProfileLink);
      setShareStatus('예약 링크가 복사되었습니다.');
    } catch {
      setShareStatus('링크를 복사하지 못했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <Container $start>
      <S.PageWrapper>
        <Header title="마이페이지" />
        <S.Content>
          <S.ProfileSection>
            <S.Avatar aria-hidden="true">{getProfileInitial(auth?.name)}</S.Avatar>
            <S.ProfileInfo>
              <S.ProfileHeading>
                <S.Name>{auth?.name || '이름 정보 없음'}</S.Name>
                <S.RoleBadge>{roleLabel}</S.RoleBadge>
              </S.ProfileHeading>
              <S.PhoneNumber>
                {auth?.phoneNumber ? formatPhoneNumber(auth.phoneNumber) : '전화번호 정보 없음'}
              </S.PhoneNumber>
            </S.ProfileInfo>
          </S.ProfileSection>

          {isOwner ? (
            <S.Section>
              <S.SectionTitle>내 매장</S.SectionTitle>
              <S.ShopCard>
                <S.ShopCardHeader>
                  <S.ShopSummary>
                    <S.ShopLabel>고객 예약 페이지</S.ShopLabel>
                    <S.ShopName>{shopInfo?.shopName || '내 매장'}</S.ShopName>
                  </S.ShopSummary>
                  {!isShopLinkLoading && !isShopLinkError && shopProfileLink ? (
                    <S.PublicBadge>공개 중</S.PublicBadge>
                  ) : null}
                </S.ShopCardHeader>

                {isShopLinkLoading ? (
                  <S.LinkStatus>예약 링크를 불러오는 중입니다.</S.LinkStatus>
                ) : isShopLinkError || !shopProfileLink ? (
                  <S.LinkStatus $error>
                    예약 링크를 불러오지 못했습니다. 잠시 후 다시 확인해주세요.
                  </S.LinkStatus>
                ) : (
                  <>
                    <S.LinkPreview>{shopProfileLink}</S.LinkPreview>
                    <S.ShopActions>
                      <S.CopyButton type="button" onClick={handleCopyProfileLink}>
                        링크 복사
                      </S.CopyButton>
                      <S.ShareButton type="button" onClick={handleShareProfileLink}>
                        공유하기
                      </S.ShareButton>
                    </S.ShopActions>
                    {shareStatus ? (
                      <S.ShareStatus role="status">{shareStatus}</S.ShareStatus>
                    ) : null}
                  </>
                )}
              </S.ShopCard>
            </S.Section>
          ) : null}

          <S.Section>
            <S.SectionTitle>서비스</S.SectionTitle>
            <S.ServiceMenu>
              {isOwner ? (
                <ServiceMenuItem
                  icon={MenuManageIcon}
                  label="메뉴·카테고리 관리"
                  description="예약 메뉴와 옵션을 관리해요"
                  onClick={() => navigate('/mypage/menus')}
                  disabled={isShopLinkLoading || isShopLinkError || !shopLink?.shopId}
                />
              ) : null}
              <ServiceMenuItem
                icon={CalendarIcon}
                label={isOwner ? '예약 캘린더' : '내 예약'}
                description={
                  isOwner ? '매장 예약 일정을 확인해요' : '신청한 예약과 진행 상태를 확인해요'
                }
                onClick={() => navigate('/reservations')}
              />
              <ServiceMenuItem
                icon={ChatIcon}
                label="채팅"
                description={
                  isOwner ? '고객 문의와 상담을 확인해요' : '매장과 나눈 대화를 확인해요'
                }
                onClick={() => navigate('/chat')}
              />
            </S.ServiceMenu>
          </S.Section>

          <S.Section>
            <S.SectionTitle>계정</S.SectionTitle>
            <S.AccountMenu>
              <S.LogoutButton type="button" onClick={handleLogout}>
                로그아웃
                <S.Chevron aria-hidden="true">›</S.Chevron>
              </S.LogoutButton>
            </S.AccountMenu>
          </S.Section>
        </S.Content>
        <BottomNav />
      </S.PageWrapper>
    </Container>
  );
}
