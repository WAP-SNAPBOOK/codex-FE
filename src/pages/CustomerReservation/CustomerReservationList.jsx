import React, { useState, useEffect } from 'react';
import './CustomerReservationList.css';
import { myReservation } from '../../api/services/myReservation';
import ImageModal from '@/components/modal/ImageModal';

const STATUS_STYLES = {
  PENDING: { bg: '#ababFF', text: '#3131f7' },
  CONFIRMED: { bg: '#E6FFE8', text: '#2ECC71' },
  REJECTED: { bg: '#FFE8E8', text: '#FF5A5A' },
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
    imageUrls: normalizedImageUrls,
    imageCount: item.imageCount ?? item.photoCount ?? normalizedImageUrls.length,
    requirements: item.requirements ?? item.requests ?? '',
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
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await myReservation.getMyReservations();
        setReservations((Array.isArray(data) ? data : []).map(normalizeReservation));
      } catch (err) {
        console.error('예약 내역 불러오기 실패:', err);
        setError('예약 내역을 불러오는데 실패했습니다. 다시 시도해주세요.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, []);

  return (
    <div className="page">
      <div className="title-wrapper">
        <h1 className="title-header">예약 내역</h1>
      </div>
      {/* 1) 로딩 중일 때: 회색 박스 + 로딩 문구 */}
      {isLoading && <div className="reservation-empty-text">예약 내역을 불러오는 중입니다...</div>}
      {/* 에러처리 */}
      {!isLoading && error && <div className="reservation-empty-text">{error}</div>}
      {/* 2) 데이터가 없을 때: 회색 박스 없이 텍스트만 */}
      {!isLoading && !error && reservations.length === 0 && (
        <div className="reservation-empty-text">아직 예약이 없습니다... 😭</div>
      )}
      {/* 3) 데이터가 있을 때 : 회색 박스 + 카드들 렌더링 */}
      {!isLoading && reservations.length > 0 && (
        <div className="gray-box">
          {reservations.map((r) => (
            <ReservationCard key={r.id} data={r} />
          ))}
        </div>
      )}
    </div>
  );
}

function ReservationCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); //모달 활성화된 사진 idx

  const statusText = STATUS_LABELS[data.status];
  const statusStyle = STATUS_STYLES[data.status] || {
    bg: '#eeeeee',
    text: '#555555',
  };

  const ownerMessage =
    data.ownerMessage || (data.status === 'REJECTED' ? '사유 없음' : '전달 사항이 없습니다.');

  return (
    <div className="card">
      {/* 상단 영역 */}
      <div className="card-top">
        <div className="shop-info">
          <img
            src={data.shopImageUrl || 'https://placehold.co/80x80?text=SHOP'}
            alt={data.shopName}
            className="shop-img"
          />
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
            <span className="label">고객명</span>
            <span className="value-1">{data.customerName}</span>
          </div>
          <div className="info-row">
            <span className="label">예약 날짜</span>
            <span className="value-1 highlight">{data.date}</span>
          </div>
          <div className="info-row">
            <span className="label">예약 시간</span>
            <span className="value-1 highlight">{formatTime(data.time)}</span>
          </div>
        </div>

        <div className="divider" />

        <div className="toggle-customer" onClick={() => setIsOpen(!isOpen)}>
          <span>상세 보기</span>
          <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
        </div>

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
                    <img
                      key={`${data.id}-photo-${i}`}
                      className="photo-item"
                      src={url}
                      alt={`예약 사진 ${i + 1}`}
                      onClick={() => setActiveIndex(i)}
                    />
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
