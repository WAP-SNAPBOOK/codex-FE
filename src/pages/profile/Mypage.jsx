import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../components/common/BottomNav';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Container from '../../components/common/Container';
import Header from '../../components/common/Header';
import { SkeletonBlock } from '../../components/common/Skeleton';
import StatusBadge from '../../components/common/StatusBadge';
import { useToast } from '../../components/common/ToastProvider';
import { useAuth } from '../../context/AuthContext';
import { useLogout } from '../../query/authQueries';
import { useShopLink } from '../../query/linkQueries';
import { useShopInfoById } from '../../query/shopQueries';
import { getShopProfileLink } from '../../utils/shopProfileLink';
import * as S from './Mypage.styles';

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

function LogoutIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M10 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5" />
      <path d="m15 8 4 4-4 4M19 12H9" />
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
  const { showToast } = useToast();
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const isOwner = auth?.userType === 'OWNER';
  const {
    data: shopLink,
    isLoading: isShopLinkLoading,
    isError: isShopLinkError,
    refetch: refetchShopLink,
  } = useShopLink({ enabled: isOwner });
  const { data: shopInfo, isLoading: isShopInfoLoading } = useShopInfoById(
    isOwner ? shopLink?.shopId : null
  );

  const roleLabel = isOwner ? '사장님' : '고객';
  const shopProfileLink = getShopProfileLink(shopLink);
  const phoneNumber = auth?.phoneNumber
    ? formatPhoneNumber(auth.phoneNumber)
    : '등록된 전화번호가 없습니다';

  const confirmLogout = () => {
    setIsLogoutConfirmOpen(false);
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
        showToast('공유가 완료되었습니다.', { tone: 'success' });
        return;
      }

      await navigator.clipboard.writeText(shopProfileLink);
      showToast('예약 링크가 복사되었습니다.', { tone: 'success' });
    } catch (error) {
      if (error?.name === 'AbortError') return;
      showToast('공유하지 못했습니다. 잠시 후 다시 시도해주세요.', { tone: 'error' });
    }
  };

  const handleCopyProfileLink = async () => {
    if (!shopProfileLink) return;

    try {
      await navigator.clipboard.writeText(shopProfileLink);
      showToast('예약 링크가 복사되었습니다.', { tone: 'success' });
    } catch {
      showToast('링크를 복사하지 못했습니다. 잠시 후 다시 시도해주세요.', {
        tone: 'error',
      });
    }
  };

  return (
    <Container $start>
      <S.PageWrapper>
        <Header
          title="마이"
          description={
            isOwner ? '매장 운영과 계정 정보를 관리해요.' : '내 활동과 계정 정보를 확인해요.'
          }
        />
        <S.Content>
          <S.ProfileCard>
            <S.ProfileLabel>계정 정보</S.ProfileLabel>
            <S.ProfileRow>
              <S.Avatar aria-hidden="true">{getProfileInitial(auth?.name)}</S.Avatar>
              <S.ProfileInfo>
                <S.ProfileHeading>
                  <S.Name>{auth?.name || '이름 정보 없음'}</S.Name>
                  <S.RoleBadge>{roleLabel}</S.RoleBadge>
                </S.ProfileHeading>
                <S.PhoneNumber>{phoneNumber}</S.PhoneNumber>
                {isOwner ? (
                  <S.ShopMeta>
                    {isShopInfoLoading ? (
                      <SkeletonBlock $width="96px" $height="12px" />
                    ) : (
                      `${shopInfo?.shopName || '내 매장'} 운영 중`
                    )}
                  </S.ShopMeta>
                ) : null}
              </S.ProfileInfo>
            </S.ProfileRow>
          </S.ProfileCard>

          {isOwner ? (
            <S.Section>
              <S.SectionHeading>
                <S.SectionTitle>내 매장</S.SectionTitle>
                <S.SectionDescription>고객에게 공유할 예약 페이지예요.</S.SectionDescription>
              </S.SectionHeading>
              <S.ShopCard>
                {isShopLinkLoading ? (
                  <S.ShopLoading role="status" aria-label="매장 예약 페이지 불러오는 중">
                    <SkeletonBlock $width="44%" $height="18px" />
                    <SkeletonBlock $width="100%" $height="44px" $radius="12px" />
                    <SkeletonBlock $width="100%" $height="46px" $radius="12px" />
                  </S.ShopLoading>
                ) : isShopLinkError || !shopProfileLink ? (
                  <S.LinkError role="alert">
                    <strong>예약 페이지를 불러오지 못했어요.</strong>
                    <span>네트워크 상태를 확인한 뒤 다시 시도해주세요.</span>
                    <S.RetryButton type="button" onClick={() => refetchShopLink()}>
                      다시 시도
                    </S.RetryButton>
                  </S.LinkError>
                ) : (
                  <>
                    <S.ShopCardHeader>
                      <S.ShopSummary>
                        <S.ShopName>{shopInfo?.shopName || '내 매장'}</S.ShopName>
                        <S.ShopDescription>예약과 상담을 시작하는 공개 페이지</S.ShopDescription>
                      </S.ShopSummary>
                      <StatusBadge tone="success">공개 중</StatusBadge>
                    </S.ShopCardHeader>
                    <S.LinkPreview>{shopProfileLink}</S.LinkPreview>
                    <S.ShopActions>
                      <S.PreviewLink href={shopProfileLink} target="_blank" rel="noreferrer">
                        미리보기
                      </S.PreviewLink>
                      <S.CopyButton type="button" onClick={handleCopyProfileLink}>
                        링크 복사
                      </S.CopyButton>
                      <S.ShareButton type="button" onClick={handleShareProfileLink}>
                        공유하기
                      </S.ShareButton>
                    </S.ShopActions>
                  </>
                )}
              </S.ShopCard>
            </S.Section>
          ) : null}

          <S.Section>
            <S.SectionHeading>
              <S.SectionTitle>{isOwner ? '매장 운영' : '내 활동'}</S.SectionTitle>
              <S.SectionDescription>
                {isOwner ? '자주 사용하는 운영 기능을 모았어요.' : '예약과 상담 내역을 확인해요.'}
              </S.SectionDescription>
            </S.SectionHeading>
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
            <S.SectionHeading>
              <S.SectionTitle>계정</S.SectionTitle>
              <S.SectionDescription>이 기기의 로그인 상태를 관리해요.</S.SectionDescription>
            </S.SectionHeading>
            <S.AccountMenu>
              <S.LogoutButton type="button" onClick={() => setIsLogoutConfirmOpen(true)}>
                <S.AccountIcon aria-hidden="true">
                  <LogoutIcon />
                </S.AccountIcon>
                <S.ServiceText>
                  <strong>로그아웃</strong>
                  <span>현재 기기에서 계정 연결을 종료해요</span>
                </S.ServiceText>
                <S.Chevron aria-hidden="true">›</S.Chevron>
              </S.LogoutButton>
            </S.AccountMenu>
          </S.Section>
        </S.Content>
        <BottomNav />
      </S.PageWrapper>
      <ConfirmDialog
        open={isLogoutConfirmOpen}
        title="로그아웃하시겠어요?"
        description="언제든 다시 로그인할 수 있습니다."
        confirmLabel="로그아웃"
        tone="danger"
        onCancel={() => setIsLogoutConfirmOpen(false)}
        onConfirm={confirmLogout}
      />
    </Container>
  );
}
