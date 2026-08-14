import React, { useState, useEffect } from 'react';
import CommonModal from '../modal/CommonModal';
import { modalViews } from '../modal/modalViews';
import * as S from './InAppGuideBar.style';

export default function InAppGuideBar() {
  const [isInApp, setIsInApp] = useState(false);
  const [hidden, setHidden] = useState(false); // 사용자가 닫기 누를 경우 숨김

  //모달 관련 상태
  const [showModal, setShowModal] = useState(false);
  const [selectedOS, setSelectedOS] = useState('android'); //선택된 OS

  //PWA 안내 사항 모달 관련 데이터
  const view = modalViews(setShowModal);

  const handleClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    //현재 유저의 운영체제 및 디바이스를 식별 정보
    const ua = navigator.userAgent || window.opera;
    //인앱 여부 판별
    const inApp = ua.includes('Instagram');

    setIsInApp(inApp);
  }, []);

  //운영체체별 선택된 PWA 안내사항
  const activeView = view[selectedOS];

  //인앱이 아니거나 X버튼 누를시 언로딩
  if (!isInApp || hidden) return null;

  return (
    <S.Wrapper>
      <S.Card>
        <S.Text>
          <span>브라우저로 열어보세요!</span>
        </S.Text>
        <S.OpenButton type="button" onClick={handleClick}>
          열기
        </S.OpenButton>
        <S.CloseButton type="button" aria-label="안내 닫기" onClick={() => setHidden(true)}>
          ✕
        </S.CloseButton>
      </S.Card>
      {showModal && (
        <CommonModal
          headerTop={
            <S.Tabs>
              <S.TabButton
                type="button"
                $active={selectedOS === 'android'}
                onClick={() => setSelectedOS('android')}
              >
                Android
              </S.TabButton>
              <S.TabButton
                type="button"
                $active={selectedOS === 'ios'}
                onClick={() => setSelectedOS('ios')}
              >
                iOS
              </S.TabButton>
            </S.Tabs>
          }
          title={activeView.title}
          text={activeView.content}
          buttons={activeView.buttons}
          onClose={() => setShowModal(false)}
        />
      )}
    </S.Wrapper>
  );
}
