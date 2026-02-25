import { useState } from 'react';
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
import { useNavigate, useLocation, useParams } from 'react-router-dom';

export default function ReservationCreatePage() {
  const { shopId } = useParams();
  const [step, setStep] = useState(1);
  const [canNext, setCanNext] = useState(false);

  const [formData, setFormData] = useState({
    basic: {
      name: '',
      phoneNumber: '',
      date: '',
      time: '',
    },
    tagMenu: {
      tagId: null,
      menuIds: [],
      menuCounts: {},
    },
    photoNote: {
      files: [],
      notes: '',
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  //각 예약 단계 폼 입력 헨들러
  const { handleUserInfoChange, handleDateTimeChange, handleTagMenuChange, handlePhotoNoteChange } =
    useReservationFormHandlers(setFormData, setCanNext);

  const stepHandlers = {
    1: handleUserInfoChange,
    2: handleDateTimeChange,
    3: handleTagMenuChange,
    4: handlePhotoNoteChange,
  };

  const handleNextClick = () => {
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

  //다음 단계 이동으로 step증가
  const next = () => setStep((s) => Math.min(s + 1, 4));
  //이전 단계 이동으로 step감소
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const submitReservation = () => {
    // TODO: API payload 조합 후 createReservation
    //console.log('FINAL SUBMIT', formData);

    const returnTo = location.state?.returnTo;

    if (returnTo) {
      navigate(returnTo, { replace: true });
    } else {
      navigate('/chat'); // fallback
    }
  };

  //예약 생성 페이지 나가기 헨들러
  const handleClose = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/chat'); // fallback
    }
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
          {step === 1 && <StepUserInfo initialData={formData.basic} onChange={stepHandlers[1]} />}
          {step === 2 && <StepDateTime initialData={formData.basic} onChange={stepHandlers[2]} />}
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
          <NextButton $width="100%" disabled={step !== 4 && !canNext} onClick={handleNextClick}>
            {step === 4 ? '예약 신청' : '다음 단계로'}
          </NextButton>
        </S.Content>
      </S.PageWrapper>
    </Container>
  );
}
