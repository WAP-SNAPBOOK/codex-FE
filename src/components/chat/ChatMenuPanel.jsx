import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import reservationListIcon from '../../assets/icons/reservation-list-icon.svg';
import { BaseButton } from '../common/Button';
import theme from '../../styles/theme';

export default function ChatMenuPanel({ visible }) {
  const navigate = useNavigate();

  //예약 내역 이동 헨들러
  const handleClick = () => {
    navigate('/reservations');
  };

  if (!visible) return null;

  return (
    <Panel>
      <PanelInner>
        <ReservationListButton type="button" $column onClick={handleClick}>
          <img src={reservationListIcon} alt="" />
          <span>예약 내역</span>
        </ReservationListButton>
      </PanelInner>
    </Panel>
  );
}

export const Panel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: calc(70px + env(safe-area-inset-bottom));
  left: 50%;
  width: min(100%, 480px);
  min-height: 148px;
  border-top: 1px solid ${theme.colors.border.subtle};
  background: #fff;
  padding: 18px;
  z-index: 15;
  transform: translateX(-50%);
`;

const PanelInner = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

const ReservationListButton = styled(BaseButton)`
  width: 76px;
  min-height: 72px;
  gap: 7px;
  border-radius: 16px;
  background: #f6f7f9;
  color: #555960;
  font-size: 12px;
  font-weight: 700;

  img {
    width: 28px;
    height: 28px;
  }
`;
