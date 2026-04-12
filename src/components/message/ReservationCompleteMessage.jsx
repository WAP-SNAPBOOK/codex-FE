import React, { useState } from 'react';
import CheckIcon from '../../assets/icons/check-icon.svg';
import ReservationInfoView from '../reservation/ReservationInfoView';
import './ReservationCompleteMessage.css';

export default function ReservationCompleteMessage({ reservation }) {
  const [open, setOpen] = useState(false);
  const name = reservation?.customerName;
  const date = reservation?.date;
  const time = reservation?.time;
  const photoCount =
    reservation?.imageCount ?? reservation?.photoCount ?? reservation?.imageUrls?.length ?? 0;

  return (
    <div className="reservation-message">
      {/* 체크 아이콘 */}
      <div className="check-icon-wrapper">
        <img src={CheckIcon} alt="check icon" />
      </div>

      {/* 예약 접수 완료 텍스트 */}
      <div className="message-title">예약 접수 완료</div>

      {/* 예약 정보 */}
      <div className="reservation-info">
        <div className="info-row">
          <span className="label-com">고객명</span>
          <span className="value-1 name">{name}</span>
        </div>
        <div className="info-row">
          <span className="label-com">예약 날짜</span>
          <span className="value-1 date-1">{date}</span>
        </div>
        <div className="info-row">
          <span className="label-com">예약 시간</span>
          <span className="value-1 time-1">{time}</span>
        </div>
        <div className="info-row">
          <span className="label-com">첨부 사진</span>
          <span className="value-1 photo-count">{photoCount ?? 0}장</span>
        </div>
      </div>

      <div className="message-divider" />

      <button type="button" className="detail-toggle" onClick={() => setOpen((prev) => !prev)}>
        상세 보기
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open ? (
        <div className="reservation-detail-wrap">
          <ReservationInfoView info={reservation} />
        </div>
      ) : null}
    </div>
  );
}
