import React, { useCallback, useState, useEffect } from 'react';
import './CustomerReservationList.css';
import { myReservation } from '../../api/services/myReservation';
import ImageModal from '@/components/modal/ImageModal';
import { useNavigate } from 'react-router-dom';
import { formatDurationMinutes } from '../../utils/formatDurationMinutes';
import BottomNav from '../../components/common/BottomNav';

const STATUS_STYLES = {
  PENDING: { bg: '#fff4df', text: '#9a6500' },
  CONFIRMED: { bg: '#edf8ef', text: '#318b42' },
  REJECTED: { bg: '#fff0f0', text: '#c94a4a' },
};

const STATUS_LABELS = {
  PENDING: '접수중',
  CONFIRMED: '예약 확정',
  REJECTED: '예약 거절',
};

const toArray = (value) => (Array.isArray(value) ? value : []);

const normalizeMenus = (menus) =>
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
    ...item,
    id: item.id ?? item.reservationId,
    imageUrls: normalizedImageUrls,
    imageCount: item.imageCount ?? item.photoCount ?? normalizedImageUrls.length,
    requirements: item.requirements ?? item.requests ?? '',
    durationMinutes: item.durationMinutes,
    menus: normalizeMenus(item.menus),
    ownerMessage: item.status === 'REJECTED' ? item.rejectionReason : item.confirmationMessage,
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

export default function CustomerReservationList() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await myReservation.getMyReservations();
      setReservations((Array.isArray(data) ? data : []).map(normalizeReservation));
    } catch (err) {
      console.error('예약 내역 불러오기 실패:', err);
      setError('예약 내역을 불러오지 못했어요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return (
    <div className="customer-reservation-page">
      <div className="title-wrapper">
        <h1 className="title-header">내 예약</h1>
        <p className="title-description">신청한 예약과 진행 상태를 확인하세요.</p>
      </div>
      {isLoading && (
        <div className="reservation-state" role="status">
          <span className="state-icon" aria-hidden="true">
            ···
          </span>
          <strong>예약을 불러오고 있어요</strong>
        </div>
      )}
      {!isLoading && error && (
        <div className="reservation-state" role="alert">
          <span className="state-icon" aria-hidden="true">
            !
          </span>
          <strong>{error}</strong>
          <span>잠시 후 다시 시도해 주세요.</span>
          <button type="button" onClick={fetchReservations}>
            다시 시도
          </button>
        </div>
      )}
      {!isLoading && !error && reservations.length === 0 && (
        <div className="reservation-state">
          <span className="state-icon calendar" aria-hidden="true">
            0
          </span>
          <strong>아직 예약 내역이 없어요</strong>
          <span>매장의 예약 링크에서 첫 예약을 신청해 보세요.</span>
          <button type="button" onClick={() => navigate('/')}>
            홈으로 가기
          </button>
        </div>
      )}
      {!isLoading && !error && reservations.length > 0 && (
        <main className="reservation-list">
          {reservations.map((r) => (
            <ReservationCard key={r.id ?? `${r.shopName}-${r.date}-${r.time}`} data={r} />
          ))}
        </main>
      )}
      <BottomNav />
    </div>
  );
}

function ReservationCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); //모달 활성화된 사진 idx

  const statusText = STATUS_LABELS[data.status] || '상태 확인';
  const statusStyle = STATUS_STYLES[data.status] || {
    bg: '#eeeeee',
    text: '#555555',
  };

  const ownerMessage =
    data.ownerMessage || (data.status === 'REJECTED' ? '사유 없음' : '전달 사항이 없습니다.');
  const durationText = formatDurationMinutes(data.durationMinutes);

  return (
    <div className="card">
      {/* 상단 영역 */}
      <div className="card-top">
        <div className="shop-info">
          {data.shopImageUrl ? (
            <img src={data.shopImageUrl} alt="" className="shop-img" />
          ) : (
            <span className="shop-img shop-placeholder" aria-hidden="true">
              {data.shopName?.trim()?.[0] || '샵'}
            </span>
          )}
          <h2 className="shop-name">{data.shopName}</h2>
        </div>

        {/* 상태 표시 */}
        <div
          className="status"
          style={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
          }}
        >
          <span className="status-dot" style={{ backgroundColor: statusStyle.text }} />
          {statusText}
        </div>
      </div>

      {/* 본문 영역 */}
      <div className="card-body">
        <div className="divider" />

        <div className="info-section">
          <div className="info-row">
            <span className="label">예약 날짜</span>
            <span className="value-1 highlight">{data.date}</span>
          </div>
          <div className="info-row">
            <span className="label">예약 시간</span>
            <span className="value-1 highlight">{formatTime(data.time)}</span>
          </div>
          {data.status === 'CONFIRMED' && durationText ? (
            <div className="info-row">
              <span className="label">소요 시간</span>
              <span className="value-1">{durationText}</span>
            </div>
          ) : null}
        </div>

        <div className="divider" />

        <button
          type="button"
          className="toggle-customer"
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>상세 보기</span>
          <span className={`arrow ${isOpen ? 'open' : ''}`} aria-hidden="true">
            ⌄
          </span>
        </button>

        {isOpen && (
          <div className="details">
            {data.menus.length > 0 && (
              <div className="menu-section">
                <span className="section-title">선택 메뉴</span>
                <div className="menu-list">
                  {data.menus.map((menu) => (
                    <div key={menu.id} className="menu-item">
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

            <div className="photo-section">
              <div className="section-header">
                <span className="section-title">이미지</span>
                <span className="image-count">{data.imageCount}장</span>
              </div>

              {data.imageUrls.length > 0 ? (
                <div className="photo-list">
                  {data.imageUrls.map((url, i) => (
                    <button
                      key={`${data.id}-photo-${i}`}
                      type="button"
                      className="photo-item"
                      aria-label={`예약 사진 ${i + 1} 크게 보기`}
                      onClick={() => setActiveIndex(i)}
                    >
                      <img src={url} alt="" />
                    </button>
                  ))}
                  {/*예약 사진 모달 활성화*/}
                  {activeIndex !== null && (
                    <ImageModal
                      src={data.imageUrls[activeIndex]}
                      onClose={() => setActiveIndex(null)}
                    />
                  )}
                </div>
              ) : (
                <div className="empty-detail">등록된 이미지가 없습니다.</div>
              )}
            </div>

            <div className="request-section">
              <span className="section-title">요구사항</span>
              <div className="request-box">{data.requirements || '요구사항이 없습니다.'}</div>
            </div>

            {(data.status === 'CONFIRMED' || data.status === 'REJECTED') && (
              <div className="owner-section">
                <div className="divider" />
                <div className="owner-box">
                  <span className="owner-title">
                    {data.status === 'REJECTED' ? '거절 사유' : '전달 사항'}
                  </span>
                  <p className="owner-text">{ownerMessage}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
