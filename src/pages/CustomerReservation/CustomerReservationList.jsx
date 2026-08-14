import React, { useCallback, useState, useEffect } from 'react';
import './CustomerReservationList.css';
import { myReservation } from '../../api/services/myReservation';
import ImageModal from '@/components/modal/ImageModal';
import { useNavigate } from 'react-router-dom';
import { formatDurationMinutes } from '../../utils/formatDurationMinutes';
import BottomNav from '../../components/common/BottomNav';
import AsyncState from '../../components/common/AsyncState';
import StatusBadge from '../../components/common/StatusBadge';
import { ListSkeleton } from '../../components/common/Skeleton';
import Header from '../../components/common/Header';

const STATUS_TONES = {
  PENDING: 'pending',
  CONFIRMED: 'success',
  REJECTED: 'error',
  CANCELLED: 'neutral',
};

const STATUS_LABELS = {
  PENDING: '확인 대기',
  CONFIRMED: '예약 확정',
  REJECTED: '예약 거절',
  CANCELLED: '예약 취소',
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

const formatDate = (value) => {
  if (!value) return '-';

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(date);
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

  const activeReservationCount = reservations.filter((reservation) =>
    ['PENDING', 'CONFIRMED'].includes(reservation.status)
  ).length;
  const confirmedReservationCount = reservations.filter(
    (reservation) => reservation.status === 'CONFIRMED'
  ).length;

  return (
    <div className="customer-reservation-page">
      <Header title="내 예약" description="신청한 예약과 진행 상태를 확인하세요." />
      {isLoading && (
        <main className="reservation-content">
          <div className="reservation-list">
            <ListSkeleton count={2} label="예약을 불러오는 중" />
          </div>
        </main>
      )}
      {!isLoading && error && (
        <AsyncState
          variant="error"
          title={error}
          description="잠시 후 다시 시도해 주세요."
          actionLabel="다시 시도"
          onAction={fetchReservations}
          withBottomNav
        />
      )}
      {!isLoading && !error && reservations.length === 0 && (
        <AsyncState
          title="아직 예약 내역이 없어요"
          description="상담 중인 매장이 있다면 채팅에서 예약을 시작해보세요."
          actionLabel="채팅 보기"
          onAction={() => navigate('/chat')}
          withBottomNav
        />
      )}
      {!isLoading && !error && reservations.length > 0 && (
        <main className="reservation-content">
          <section className="reservation-overview" aria-label="예약 요약">
            <div>
              <span>진행 예약</span>
              <strong>{activeReservationCount}건</strong>
            </div>
            <div>
              <span>예약 확정</span>
              <strong>{confirmedReservationCount}건</strong>
            </div>
            <div>
              <span>전체 내역</span>
              <strong>{reservations.length}건</strong>
            </div>
          </section>
          <div className="list-heading">
            <h2>예약 내역</h2>
            <span>최근 신청한 예약부터 확인할 수 있어요.</span>
          </div>
          <div className="reservation-list">
            {reservations.map((r) => (
              <ReservationCard key={r.id ?? `${r.shopName}-${r.date}-${r.time}`} data={r} />
            ))}
          </div>
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
  const statusTone = STATUS_TONES[data.status] || 'neutral';

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
        <StatusBadge tone={statusTone}>{statusText}</StatusBadge>
      </div>

      {/* 본문 영역 */}
      <div className="card-body">
        <div className="divider" />

        <div className="info-section">
          <div className="info-row">
            <span className="label">예약 날짜</span>
            <span className="value-1 highlight">{formatDate(data.date)}</span>
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
