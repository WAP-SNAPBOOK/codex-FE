import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import reservationListIcon from '../../assets/icons/reservation-list-icon.svg';
import chatPhotoIcon from '../../assets/icons/chat-photo-icon.svg';
import { BaseButton } from '../common/Button';

export default function ChatMenuPanel({ visible, onClickPhoto, isUploadingImage = false }) {
  const navigate = useNavigate();

  //예약 내역 이동 헨들러
  const handleClickReservationList = () => {
    navigate('/reservations');
  };
  return (
    <Panel $visible={visible}>
      <PanelInner>
        <MenuActionButton $column onClick={handleClickReservationList}>
          <img src={reservationListIcon} alt="reservationListIcon" />
          <span>예약 내역</span>
        </MenuActionButton>
        <MenuActionButton $column onClick={onClickPhoto} disabled={isUploadingImage}>
          <img src={chatPhotoIcon} alt="chatPhotoIcon" />
          <span>{isUploadingImage ? '전송 중' : '사진 전송'}</span>
        </MenuActionButton>
      </PanelInner>
    </Panel>
  );
}

export const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 59px; /* InputBar 높이 */
  left: 0;
  width: 100%;
  height: 180px;
  background: #f3f3f3;
  border-top: 1px solid #ddd;
  transition: all 0.3s ease;
  padding: 16px;
  z-index: ${({ $visible }) => ($visible ? 15 : -1)}; /* 닫힐 땐 완전히 뒤로 */
  /* 메뉴가 보이거나 숨겨질 때 부드럽게 */
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'translateY(0)' : 'translateY(100%)')};
`;

const PanelInner = styled.div`
  display: flex;
  gap: 20px;
`;

const MenuActionButton = styled(BaseButton)``;
