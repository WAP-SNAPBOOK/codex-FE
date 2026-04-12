import React, { useState, useEffect } from 'react';
import './ownerReservationList.css';
import { shopReservationService } from '../../api/services/shopReservation';
import { useConfirmReservation, useRejectReservation } from '../../query/reservationQueries';
import ImageModal from '@/components/modal/ImageModal';

const DURATION_OPTIONS = [
  { label: '30분', minutes: 30 },
  { label: '1시간', minutes: 60 },
  { label: '1시간 30분', minutes: 90 },
  { label: '2시간', minutes: 120 },
];

const statusMap = {
  PENDING: '접수 중',
  CONFIRMED: '예약 확정',
  REJECTED: '예약 거절',
};

const toArray = (value) => (Array.isArray(value) ? value : []);

const normalizeReservationMenus = (menus) =>
  toArray(menus).map((menu, index) => ({
    id: menu.shopMenuId ?? `${menu.menuNameSnapshot ?? 'menu'}-${index}`,
    name: menu.menuNameSnapshot ?? '메뉴',
    inputValues: toArray(menu.inputValues)
      .map((inputValue) => {
        const rawValue =
          inputValue.valueText ??
          (typeof inputValue.valueNumber === 'number' ? inputValue.valueNumber : null);

        if (rawValue === null || rawValue === '') {
          return inputValue.fieldLabelSnapshot;
        }

        return `${inputValue.fieldLabelSnapshot}: ${rawValue}`;
      })
      .filter(Boolean),
  }));

const normalizeReservation = (item) => {
  const imageUrls = toArray(item.imageUrls);
  const legacyPhotoUrls = toArray(item.photoUrls);
  const normalizedImageUrls = imageUrls.length > 0 ? imageUrls : legacyPhotoUrls;

  return {
    id: item.id,
    name: item.customerName,
    date: item.date,
    time: item.time,
    imageUrls: normalizedImageUrls,
    imageCount: item.imageCount ?? item.photoCount ?? normalizedImageUrls.length,
    requirements: item.requirements ?? item.requests ?? '',
    menus: normalizeReservationMenus(item.menus),
    originalStatus: item.status,
    confirmationMessage: item.confirmationMessage,
    rejectionReason: item.rejectionReason,
  };
};

const formatTime = (value) => {
  if (!value) {
    return '-';
  }

  const match = String(value).match(/^(\d{2}):(\d{2})/);
  if (match) {
    return `${match[1]}:${match[2]}`;
  }

  return value;
};

const formatDurationClock = (mins) => {
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const formatDurationLabel = (mins) => {
  const preset = DURATION_OPTIONS.find((option) => option.minutes === mins);
  if (preset) {
    return preset.label;
  }

  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  if (hours && minutes) {
    return `${hours}시간 ${minutes}분`;
  }

  if (hours) {
    return `${hours}시간`;
  }

  return `${minutes}분`;
};

export default function OwnerReservationList() {
  const [reservations, setReservations] = useState([]);

  // 서버에서 예약 데이터 불러오기
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await shopReservationService.getShopReservations();
        setReservations(data.map(normalizeReservation));
      } catch (err) {
        console.error('예약 데이터를 불러오지 못했습니다:', err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="owner-container">
      <h1 className="title-main">예약 내역</h1>

      <div className="owner-box-1">
        {reservations?.map((res) => (
          <ReservationCard key={res.id} res={res} />
        ))}
      </div>
    </div>
  );
}

function ReservationCard({ res }) {
  const [status, setStatus] = useState(statusMap[res.originalStatus] || '접수 중');
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState(null);
  const [message, setMessage] = useState('');
  const [totalMinutes, setTotalMinutes] = useState(60);
  const [confirmationMessage, setConfirmationMessage] = useState(res.confirmationMessage || '');
  const [rejectionReason, setRejectionReason] = useState(res.rejectionReason || '');
  const [activeIndex, setActiveIndex] = useState(null); //모달 활성화된 사진 idx

  //예약 확정 훅
  const { mutate: confirmReservation } = useConfirmReservation();
  //예약 거절 훅
  const { mutate: rejectReservation } = useRejectReservation();

  const adjustTime = (delta) => {
    setTotalMinutes((prev) => Math.max(30, Math.min(prev + delta, 180)));
  };

  const handleConfirm = () => {
    setMode('confirm');
    setMessage('');
  };

  const handleReject = () => {
    setMode('reject');
    setMessage('');
  };

  const handleSubmit = () => {
    const trimmedMessage = message.trim();

    if (mode === 'confirm') {
      if (!trimmedMessage) {
        alert('전달 사항을 입력해주세요.');
        return;
      }

      confirmReservation(
        {
          id: res.id,
          message: trimmedMessage,
          durationMinutes: totalMinutes,
        },
        {
          onSuccess: () => {
            setStatus('예약 확정');
            setConfirmationMessage(trimmedMessage);
            setMode(null);
            setMessage('');
          },
        }
      );
      return;
    }

    if (mode === 'reject') {
      if (!trimmedMessage) {
        alert('거절 사유를 입력해주세요.');
        return;
      }

      rejectReservation(
        { id: res.id, reason: trimmedMessage },
        {
          onSuccess: () => {
            setStatus('예약 거절');
            setRejectionReason(trimmedMessage);
            setMode(null);
            setMessage('');
          },
        }
      );
      return;
    }
  };

  return (
    <div className="card">
      {/* 이름 + 상태 */}
      <div className="usercard-header">
        <div className="user-wrap">
          <div className="user-icon">👤</div>
          <span className="user-name">{res.name}</span>

          <div
            className={`
              status-chip
              ${
                status === '예약 확정'
                  ? 'status-confirm'
                  : status === '예약 거절'
                    ? 'status-reject'
                    : 'status-pending'
              }
            `}
          >
            <span className="status-dot" />
            {status}
          </div>
        </div>
      </div>

      {/* 날짜/시간 */}
      <div className="basic-info">
        <div className="divider indented" />
        <div className="info-row">
          <span>예약 날짜</span>
          <span className="pink">{res.date}</span>
        </div>
        <div className="info-row">
          <span>예약 시간</span>
          <span className="pink">{formatTime(res.time)}</span>
        </div>
        <div className="divider indented" />
      </div>

      {/* 상세 보기 */}
      <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>상세 보기</span>
        <span className={`toggle-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>

      {isOpen && (
        <div className="detail-section">
          {res.menus.length > 0 && (
            <div className="menu-wrap">
              <span className="detail-key">선택 메뉴</span>
              <div className="menu-list">
                {res.menus.map((menu) => (
                  <div className="menu-item" key={menu.id}>
                    <span className="menu-name">{menu.name}</span>
                    {menu.inputValues.length > 0 ? (
                      <span className="menu-inputs">{menu.inputValues.join(' / ')}</span>
                    ) : (
                      <span className="empty-detail">옵션 없음</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 사진 */}
          <div className="photo-wrap">
            <div className="detail-row">
              <span className="detail-key">이미지</span>
              <span className="detail-count">{res.imageCount}장</span>
            </div>

            {res.imageUrls.length > 0 ? (
              <div className="photo-list">
                {res.imageUrls.map((url, i) => (
                  <img
                    key={`${res.id}-photo-${i}`}
                    src={url}
                    alt={`photo-${i}`}
                    onClick={() => setActiveIndex(i)}
                    className="photo"
                  />
                ))}
                {/*예약 사진 모달 활성화*/}
                {activeIndex !== null && (
                  <ImageModal src={res.imageUrls[activeIndex]} onClose={() => setActiveIndex(null)} />
                )}
              </div>
            ) : (
              <div className="empty-detail">등록된 이미지가 없습니다.</div>
            )}
          </div>

          {/* 요구사항 */}
          <div className="request-wrap">
            <span className="request-label">요구사항</span>
            <div className="request-box">{res.requirements || '요구사항이 없습니다.'}</div>
            <div className="divider indented" />
          </div>
        </div>
      )}

      {/* 버튼 영역 */}
      {status === '접수 중' && !mode && (
        <div className="action-btns">
          <button className="btn reject-btn" onClick={handleReject}>
            거절
          </button>
          <button className="btn confirm-btn" onClick={handleConfirm}>
            수락
          </button>
        </div>
      )}

      {/* 수락 UI */}
      {mode === 'confirm' && (
        <div className="confirm-section">
          <div className="divider indented" />

          <div className="time-buttons">
            {DURATION_OPTIONS.map((option) => (
              <button
                key={option.minutes}
                className={`time-btn ${totalMinutes === option.minutes ? 'active' : ''}`}
                onClick={() => setTotalMinutes(option.minutes)}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="time-adjust-box">
            <button className="circle-btn" onClick={() => adjustTime(-30)}>
              −
            </button>

            <div className="time-display">
              <div className="main-time">{formatDurationClock(totalMinutes)}</div>
              <div className="sub-time">{formatDurationLabel(totalMinutes)}</div>
            </div>

            <button className="circle-btn plus" onClick={() => adjustTime(30)}>
              +
            </button>
          </div>

          <textarea
            className="textarea"
            placeholder="전달 사항을 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="submit-wrap">
            <button className="small-confirm-btn" onClick={handleSubmit}>
              확인
            </button>
          </div>
        </div>
      )}

      {/* 거절 UI */}
      {mode === 'reject' && (
        <div className="reject-section">
          <textarea
            className="textarea"
            placeholder="거절 사유를 입력해주세요."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="submit-wrap">
            <button className="small-confirm-btn" onClick={handleSubmit}>
              확인
            </button>
          </div>
        </div>
      )}

      {/* 예약 확정 출력 */}
      {status === '예약 확정' && (
        <div className="final-box">
          <strong className="final-title">전달 사항</strong>
          {confirmationMessage || '전달사항이 없습니다.'}
        </div>
      )}

      {/* 예약 거절 출력 */}
      {status === '예약 거절' && (
        <div className="final-box">
          <strong className="final-title">거절 사유</strong>
          {rejectionReason || '사유 없음'}
        </div>
      )}
    </div>
  );
}
