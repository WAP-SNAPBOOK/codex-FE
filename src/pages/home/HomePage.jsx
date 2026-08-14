import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as S from './HomePage.styles';
import Container from '../../components/common/Container';
import MainActionButton from '../../components/home/MainActionButton ';
import BottomNav from '../../components/common/BottomNav';

const CalendarIcon = () => (
  <svg viewBox="0 0 32 32">
    <rect x="5" y="7" width="22" height="20" rx="3" />
    <path d="M10 4.5v5M22 4.5v5M5 12h22M10 17h4M10 22h8" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 32 32">
    <path d="M27 15.3c0 5.7-4.9 10.2-11 10.2-1.5 0-3-.3-4.3-.8l-6.1 2.1 2-5.3A9.7 9.7 0 0 1 5 15.3C5 9.7 9.9 5.2 16 5.2s11 4.5 11 10.1Z" />
    <path d="M10.5 15.5h.1M15.9 15.5h.1M21.3 15.5h.1" />
  </svg>
);

export default function HomePage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const isOwner = auth?.userType === 'OWNER';

  return (
    <Container $start>
      <S.PageWrapper>
        <S.HomeHeader>
          <S.Brand>SNAPBOOK</S.Brand>
        </S.HomeHeader>

        <S.Content>
          <S.WelcomeSection>
            <S.Greeting>
              {isOwner
                ? `${auth?.name || '사장님'}님, 오늘도 좋은 하루 보내세요.`
                : `${auth?.name || '고객'}님, 반가워요.`}
            </S.Greeting>
            <S.Introduction>
              {isOwner
                ? '예약 일정과 고객 문의를 한곳에서 관리하세요.'
                : '예약 내역을 확인하거나 매장과 대화를 이어가세요.'}
            </S.Introduction>
          </S.WelcomeSection>

          <S.ActionSection>
            <S.SectionTitle>무엇을 도와드릴까요?</S.SectionTitle>
            <S.ActionList>
              <MainActionButton
                onClick={() => navigate('/reservations')}
                icon={<CalendarIcon />}
                label={isOwner ? '예약 캘린더' : '내 예약'}
                description={
                  isOwner
                    ? '매장 예약 일정을 확인하고 관리해요'
                    : '신청한 예약과 진행 상태를 확인해요'
                }
              />
              <MainActionButton
                onClick={() => navigate('/chat')}
                icon={<ChatIcon />}
                label="채팅"
                description={
                  isOwner ? '고객 문의와 상담을 확인해요' : '매장과 나눈 대화를 확인해요'
                }
              />
            </S.ActionList>
          </S.ActionSection>
        </S.Content>

        <BottomNav />
      </S.PageWrapper>
    </Container>
  );
}
