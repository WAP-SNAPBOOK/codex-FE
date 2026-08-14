import { Navigate, useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../../components/common/BottomNav';
import Container from '../../components/common/Container';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import * as S from './MypageDetailPage.styles';

const formatPhoneNumber = (phoneNumber) => {
  const digits = String(phoneNumber || '').replace(/\D/g, '');
  if (digits.length !== 11) return phoneNumber || '등록되지 않음';
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
};

const PAGE_META = {
  account: {
    title: '계정 정보',
    description: '현재 로그인된 계정 정보를 확인해요.',
  },
  notifications: {
    title: '알림 설정',
    description: '현재 SNAPBOOK에서 제공하는 알림 범위를 확인해요.',
  },
  notices: {
    title: '공지사항',
    description: '서비스 안내와 업데이트 소식을 확인해요.',
  },
  support: {
    title: '문의하기',
    description: '이용 중 궁금한 내용을 해결할 방법을 안내해요.',
  },
  terms: {
    title: '이용약관',
    description: '서비스 이용 정책의 제공 상태를 확인해요.',
  },
  privacy: {
    title: '개인정보처리방침',
    description: '개인정보 처리 정책의 제공 상태를 확인해요.',
  },
  withdrawal: {
    title: '회원 탈퇴',
    description: '계정과 데이터 삭제 전 확인할 내용을 안내해요.',
  },
};

function AccountContent({ auth }) {
  return (
    <S.Card>
      <S.CardHeader>
        <S.CardTitle>로그인 정보</S.CardTitle>
        <StatusBadge tone="info">카카오 연결</StatusBadge>
      </S.CardHeader>
      <S.InfoList>
        <S.InfoRow>
          <span>이름</span>
          <strong>{auth?.name || '등록되지 않음'}</strong>
        </S.InfoRow>
        <S.InfoRow>
          <span>전화번호</span>
          <strong>{formatPhoneNumber(auth?.phoneNumber)}</strong>
        </S.InfoRow>
        <S.InfoRow>
          <span>계정 유형</span>
          <strong>{auth?.userType === 'OWNER' ? '사장님' : '고객'}</strong>
        </S.InfoRow>
      </S.InfoList>
      <S.InfoNote>
        현재 이름과 전화번호는 가입 시 등록한 정보로 표시됩니다. 앱 내 정보 수정 기능은 아직
        제공되지 않습니다.
      </S.InfoNote>
    </S.Card>
  );
}

function NotificationsContent() {
  return (
    <S.Card>
      <S.CardTitle>제공 중인 알림</S.CardTitle>
      <S.StatusList>
        <S.StatusRow>
          <span>
            <strong>예약 상태</strong>
            <small>예약 목록과 채팅 예약 카드에서 확인할 수 있어요.</small>
          </span>
          <StatusBadge tone="success">앱 내 제공</StatusBadge>
        </S.StatusRow>
        <S.StatusRow>
          <span>
            <strong>새 채팅</strong>
            <small>채팅방을 보고 있을 때 새 메시지를 안내해요.</small>
          </span>
          <StatusBadge tone="success">앱 내 제공</StatusBadge>
        </S.StatusRow>
      </S.StatusList>
      <S.InfoNote>
        푸시 알림과 항목별 수신 설정은 아직 제공되지 않습니다. 실제 알림 설정 API가 연결된 뒤 이
        화면에서 변경할 수 있습니다.
      </S.InfoNote>
    </S.Card>
  );
}

function EmptyPolicyContent({ section, navigate }) {
  const content = {
    notices: {
      title: '등록된 공지가 없어요.',
      body: '공지 제공 기능이 연결되면 이 화면에서 업데이트 소식을 확인할 수 있습니다.',
    },
    support: {
      title: '앱 내 문의 접수는 준비 중이에요.',
      body: '예약이나 매장 이용 문의는 해당 매장과의 채팅에서 바로 상담할 수 있습니다.',
      action: '채팅으로 이동',
      onAction: () => navigate('/chat'),
    },
    terms: {
      title: '정식 이용약관 문서가 연결되지 않았어요.',
      body: '검토되지 않은 문구를 임의로 제공하지 않고, 서비스 정책 문서가 확정된 뒤 연결할 예정입니다.',
    },
    privacy: {
      title: '정식 개인정보처리방침이 연결되지 않았어요.',
      body: '개인정보 처리 기준과 공개 URL이 확정된 뒤 이 화면에서 제공할 예정입니다.',
    },
    withdrawal: {
      title: '회원 탈퇴 기능은 준비 중이에요.',
      body: '예약·채팅·매장 데이터의 안전한 삭제 절차가 운영 API로 제공되기 전에는 계정 삭제를 진행하지 않습니다.',
      danger: true,
    },
  }[section];

  return (
    <S.EmptyCard $danger={content.danger}>
      <S.EmptyIcon aria-hidden="true">{content.danger ? '!' : 'i'}</S.EmptyIcon>
      <S.EmptyTitle>{content.title}</S.EmptyTitle>
      <S.EmptyDescription>{content.body}</S.EmptyDescription>
      {content.action ? (
        <S.PrimaryButton type="button" onClick={content.onAction}>
          {content.action}
        </S.PrimaryButton>
      ) : null}
    </S.EmptyCard>
  );
}

export default function MypageDetailPage() {
  const navigate = useNavigate();
  const { section } = useParams();
  const { auth } = useAuth();
  const meta = PAGE_META[section];

  if (!meta) return <Navigate to="/mypage" replace />;

  return (
    <Container $start>
      <S.Page>
        <S.Header>
          <S.BackButton
            type="button"
            aria-label="마이페이지로 돌아가기"
            onClick={() => navigate('/mypage')}
          >
            ‹
          </S.BackButton>
          <S.HeaderText>
            <S.Title>{meta.title}</S.Title>
            <S.Description>{meta.description}</S.Description>
          </S.HeaderText>
        </S.Header>
        <S.Content>
          {section === 'account' ? <AccountContent auth={auth} /> : null}
          {section === 'notifications' ? <NotificationsContent /> : null}
          {!['account', 'notifications'].includes(section) ? (
            <EmptyPolicyContent section={section} navigate={navigate} />
          ) : null}
        </S.Content>
        <BottomNav />
      </S.Page>
    </Container>
  );
}
