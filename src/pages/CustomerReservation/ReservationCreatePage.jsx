import { useEffect, useState } from 'react';
import * as S from './ReservationCreatePage.styles';
import Container from '../../components/common/Container';
import StepUserInfo from './steps/StepUserInfo/StepUserInfo';
import StepDateTime from './steps/StepDateTime/StepDateTime';
import StepPhotoNote from './steps/StepPhotoNote/StepPhotoNote';
import StepTagMenu from './steps/StepTagMenu/StepTagMenu';
import { NextButton } from '@/components/common/NextButton';
import backIcon from '@/assets/icons/back-icon.svg';
import xIcon from '@/assets/icons/X-icon.svg';
import { useReservationFormHandlers } from './hooks/useReservationFormHandlers';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useCreateReservation } from '@/query/reservationQueries';
import { useUploadMultipleFiles } from '@/query/fileQueries';
import { useAuth } from '@/context/AuthContext';
import { useMyProfile } from '@/query/userQueries';

export default function ReservationCreatePage() {
  const { shopId } = useParams();
  const [searchParams] = useSearchParams();
  const rawStaffId = searchParams.get('staffId');
  const parsedStaffId = rawStaffId ? Number(rawStaffId) : NaN;
  const staffId = Number.isInteger(parsedStaffId) && parsedStaffId > 0 ? parsedStaffId : null;
  const navigate = useNavigate();
  const location = useLocation();
  const { auth } = useAuth();
  const { data: me } = useMyProfile({
    enabled: Boolean(auth),
  });

  const [step, setStep] = useState(1);
  const [canNext, setCanNext] = useState(false);

  const [formData, setFormData] = useState(() => ({
    basic: {
      name: auth?.name ?? '',
      phoneNumber: auth?.phoneNumber ?? '',
      date: '',
      time: '',
    },
    tagMenu: {
      tagId: null,
      menuIds: [],
      inputFieldValues: {},
    },
    photoNote: {
      files: [],
      notes: '',
    },
  }));

  const profileName = me?.name ?? auth?.name ?? '';
  const profilePhoneNumber = me?.phoneNumber ?? auth?.phoneNumber ?? '';

  useEffect(() => {
    if (!profileName && !profilePhoneNumber) return;

    setFormData((prev) => {
      const nextBasic = {
        ...prev.basic,
        name: prev.basic.name || profileName,
        phoneNumber: prev.basic.phoneNumber || profilePhoneNumber,
      };

      if (
        nextBasic.name === prev.basic.name &&
        nextBasic.phoneNumber === prev.basic.phoneNumber
      ) {
        return prev;
      }

      return {
        ...prev,
        basic: nextBasic,
      };
    });
  }, [profileName, profilePhoneNumber]);

  //예약 생성 페이지 나가기 헨들러
  const handleClose = () => {
    const returnTo = location.state?.returnTo;
    if (returnTo) {
      navigate(returnTo, { replace: true });
    } else {
      navigate('/chat'); // fallback
    }
  };

  const createReservation = useCreateReservation(handleClose);
  const uploadFiles = useUploadMultipleFiles();

  //각 예약 단계 폼 입력 헨들러
  const { handleUserInfoChange, handleDateTimeChange, handleTagMenuChange, handlePhotoNoteChange } =
    useReservationFormHandlers(setFormData, setCanNext);

  const stepHandlers = {
    1: handleUserInfoChange,
    2: handleDateTimeChange,
    3: handleTagMenuChange,
    4: handlePhotoNoteChange,
  };

  //다음 단계 이동으로 step증가
  const next = () => setStep((s) => Math.min(s + 1, 4));
  //이전 단계 이동으로 step감소
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleNextClick = () => {
    if (!staffId) return;

    // step 4는  제출
    if (step === 4) {
      submitReservation();
      return;
    }

    // step 1~3만 검증
    if (!canNext) return;

    next(); // step 증가
    setCanNext(false); // 다음 step 진입 시 초기화
  };

  const submitReservation = async () => {
    if (!staffId) {
      alert('담당자 정보가 없어 예약을 진행할 수 없습니다.');
      return;
    }

    const { basic, tagMenu, photoNote } = formData;

    // 이미지 업로드
    const uploadResults =
      photoNote.files.length > 0 ? await uploadFiles.mutateAsync(photoNote.files) : [];
    const imageUrls = uploadResults.map(({ fileUrl }) => fileUrl);

    // menuSelections 변환: { [menuId]: { [fieldId]: value } } → API 형식
    const menuSelections = tagMenu.menuIds.map((menuId) => ({
      menuId,
      inputValues: Object.entries(tagMenu.inputFieldValues[menuId] ?? {}).map(
        ([fieldId, value]) => ({
          fieldId: Number(fieldId),
          valueNumber: typeof value === 'number' ? value : null,
          valueText: typeof value === 'string' ? value : null,
        })
      ),
    }));

    const payload = {
      shopId: Number(shopId),
      staffId: staffId,
      date: basic.date,
      time: basic.time,
      requirements: photoNote.notes || null,
      imageUrls,
      menuSelections,
    };

    createReservation.mutate(payload);
  };

  return (
    <Container $start>
      <S.PageWrapper>
        <S.Header>
          <S.IconButton onClick={prev} aria-label="뒤로가기">
            <img src={backIcon} alt="back" />
          </S.IconButton>

          <S.Title>예약하기</S.Title>

          <S.IconButton onClick={handleClose} aria-label="닫기">
            <img src={xIcon} alt="close" />
          </S.IconButton>
        </S.Header>

        <S.ProgressBar>
          {[1, 2, 3, 4].map((n) => (
            //현재 단계에 따른 Progress 색상 채우기
            <S.Progress key={n} $active={step >= n} />
          ))}
        </S.ProgressBar>

        <S.Content>
          {!staffId ? (
            <>
              <S.ErrorBox>
                담당자 정보가 없어 예약을 진행할 수 없습니다. 채팅 화면에서 다시 진입해 주세요.
              </S.ErrorBox>
              <NextButton $width="100%" onClick={handleClose}>
                이전 화면으로 돌아가기
              </NextButton>
            </>
          ) : (
            <>
              {step === 1 && <StepUserInfo initialData={formData.basic} onChange={stepHandlers[1]} />}
              {step === 2 && (
                <StepDateTime
                  shopId={shopId}
                  staffId={staffId}
                  initialData={formData.basic}
                  onChange={stepHandlers[2]}
                />
              )}
              {step === 3 && (
                <StepTagMenu
                  shopId={shopId}
                  initialData={formData.tagMenu}
                  onChange={stepHandlers[3]}
                />
              )}
              {step === 4 && (
                <StepPhotoNote initialData={formData.photoNote} onChange={stepHandlers[4]} />
              )}
              <NextButton
                $width="100%"
                disabled={
                  (step !== 4 && !canNext) || uploadFiles.isPending || createReservation.isPending
                }
                onClick={handleNextClick}
              >
                {uploadFiles.isPending || createReservation.isPending
                  ? '처리중...'
                  : step === 4
                    ? '예약 신청'
                    : '다음 단계로'}
              </NextButton>
            </>
          )}
        </S.Content>
      </S.PageWrapper>
    </Container>
  );
}
