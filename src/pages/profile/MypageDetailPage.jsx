import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import BottomNav from '../../components/common/BottomNav';
import Container from '../../components/common/Container';
import StatusBadge from '../../components/common/StatusBadge';
import { useToast } from '../../components/common/ToastProvider';
import { useAuth } from '../../context/AuthContext';
import { useUpdateUserProfile } from '../../query/authQueries';
import * as S from './MypageDetailPage.styles';

const normalizePhoneNumber = (value) =>
  String(value || '')
    .replace(/\D/g, '')
    .slice(0, 11);

const formatPhoneNumber = (value) => {
  const digits = normalizePhoneNumber(value);
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return value || '등록되지 않음';
};

export default function MypageDetailPage() {
  const navigate = useNavigate();
  const { section } = useParams();
  const { auth } = useAuth();
  const { showToast } = useToast();
  const updateProfile = useUpdateUserProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(auth?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(normalizePhoneNumber(auth?.phoneNumber));
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setName(auth?.name || '');
    setPhoneNumber(normalizePhoneNumber(auth?.phoneNumber));
  }, [auth?.name, auth?.phoneNumber]);

  if (section !== 'account') return <Navigate to="/mypage" replace />;

  const resetForm = () => {
    setName(auth?.name || '');
    setPhoneNumber(normalizePhoneNumber(auth?.phoneNumber));
    setErrorMessage('');
  };

  const startEditing = () => {
    resetForm();
    setIsEditing(true);
  };

  const cancelEditing = () => {
    resetForm();
    setIsEditing(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedName = name.trim();

    if (!normalizedName) {
      setErrorMessage('이름을 입력해주세요.');
      return;
    }
    if (normalizedName.length > 20) {
      setErrorMessage('이름은 20자 이내로 입력해주세요.');
      return;
    }
    if (!/^01[016789]\d{7,8}$/.test(phoneNumber)) {
      setErrorMessage('올바른 휴대전화 번호를 입력해주세요.');
      return;
    }

    try {
      await updateProfile.mutateAsync({ name: normalizedName, phoneNumber });
      setErrorMessage('');
      setIsEditing(false);
      showToast('계정 정보가 수정되었습니다.', { tone: 'success' });
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      setErrorMessage(apiMessage || '계정 정보를 저장하지 못했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

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
            <S.Title>{isEditing ? '계정 정보 수정' : '계정 정보'}</S.Title>
            <S.Description>예약과 상담에 사용하는 정보를 확인하고 관리해요.</S.Description>
          </S.HeaderText>
        </S.Header>
        <S.Content>
          <S.Card>
            <S.CardHeader>
              <S.CardTitle>기본 정보</S.CardTitle>
              <StatusBadge tone="info">카카오 연결</StatusBadge>
            </S.CardHeader>
            {isEditing ? (
              <S.EditForm onSubmit={handleSubmit}>
                <S.FieldList>
                  <S.FieldLabel>
                    이름
                    <S.TextInput
                      value={name}
                      maxLength={20}
                      autoComplete="name"
                      placeholder="이름을 입력해주세요"
                      onChange={(event) => {
                        setName(event.target.value);
                        setErrorMessage('');
                      }}
                    />
                  </S.FieldLabel>
                  <S.FieldLabel>
                    전화번호
                    <S.TextInput
                      value={phoneNumber}
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="01012345678"
                      onChange={(event) => {
                        setPhoneNumber(normalizePhoneNumber(event.target.value));
                        setErrorMessage('');
                      }}
                    />
                  </S.FieldLabel>
                </S.FieldList>
                <S.ReadOnlyRow>
                  <span>계정 유형</span>
                  <strong>{auth?.userType === 'OWNER' ? '사장님' : '고객'}</strong>
                </S.ReadOnlyRow>
                {errorMessage ? <S.ErrorText role="alert">{errorMessage}</S.ErrorText> : null}
                <S.ActionRow>
                  <S.CancelButton
                    type="button"
                    onClick={cancelEditing}
                    disabled={updateProfile.isPending}
                  >
                    취소
                  </S.CancelButton>
                  <S.SaveButton type="submit" disabled={updateProfile.isPending}>
                    {updateProfile.isPending ? '저장 중...' : '변경사항 저장'}
                  </S.SaveButton>
                </S.ActionRow>
              </S.EditForm>
            ) : (
              <>
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
                <S.EditButton type="button" onClick={startEditing}>
                  수정
                </S.EditButton>
              </>
            )}
          </S.Card>
        </S.Content>
        <BottomNav />
      </S.Page>
    </Container>
  );
}
