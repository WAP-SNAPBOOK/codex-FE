import React, { useState } from 'react';
import './decision-card.css';
import { formatDurationMinutes } from '../../utils/formatDurationMinutes';
import { formatReservationTotalPrice } from '../../utils/reservationPrice';
import ReservationInfoView from '../reservation/ReservationInfoView';

const parseLegacyReservationChange = (description) => {
  if (!description) return { rows: [], ownerMessage: null };

  const rows = [];
  let legacyOwnerMessage = null;

  description.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    const ownerMatch = trimmed.match(/^(?:점주\s*)?전달\s*사항\s*:\s*(.+)$/);
    if (ownerMatch) {
      legacyOwnerMessage = ownerMatch[1];
      return;
    }

    const changeMatch = trimmed.match(
      /^(예약\s*날짜|예약\s*시간|시작\s*시간|소요\s*시간|담당\s*직원|담당자)\s*:?\s*(.+?)\s*(?:→|->)\s*(.+)$/
    );
    if (!changeMatch) return;

    const normalizedLabel = changeMatch[1].replace(/\s/g, '');
    const label =
      normalizedLabel === '예약날짜'
        ? '예약 날짜'
        : normalizedLabel === '소요시간'
          ? '소요 시간'
          : normalizedLabel.includes('담당')
            ? '담당자'
            : '시작 시간';

    rows.push({ label, before: changeMatch[2], after: changeMatch[3] });
  });

  return { rows, ownerMessage: legacyOwnerMessage };
};

const getMenuTitle = (menu = {}) => {
  const menuName = menu.menuName || menu.menuNameSnapshot || menu.name || '메뉴';
  const tagName = menu.tagName || menu.tagNameSnapshot;

  return tagName && tagName !== menuName ? `${tagName} > ${menuName}` : menuName;
};

const getMenuPriceText = (menu = {}) => {
  const price = menu.price ?? menu.priceSnapshot;
  const numericPrice = Number(price);

  return price !== null && price !== undefined && Number.isFinite(numericPrice)
    ? `${numericPrice.toLocaleString('ko-KR')}원`
    : '';
};

const getInputValueText = (inputValue = {}, index) => {
  const label =
    inputValue.fieldLabel ||
    inputValue.fieldLabelSnapshot ||
    inputValue.label ||
    `입력 ${index + 1}`;
  const rawValue = inputValue.valueText ?? inputValue.valueNumber;

  if (rawValue === null || rawValue === undefined || rawValue === '') {
    return label;
  }

  return `${label}: ${rawValue}`;
};

const normalizeChangedMenus = (menus) => (Array.isArray(menus) ? menus : []);

function MenuChangeList({ title, menus, tone }) {
  const normalizedMenus = normalizeChangedMenus(menus);

  return (
    <div className={`menu-change-column menu-change-column--${tone}`}>
      <div className="menu-change-column-title">{title}</div>
      {normalizedMenus.length > 0 ? (
        <div className="menu-change-list">
          {normalizedMenus.map((menu, index) => {
            const priceText = getMenuPriceText(menu);
            const inputValues = normalizeChangedMenus(menu.inputValues)
              .map(getInputValueText)
              .filter(Boolean);

            return (
              <div className="menu-change-card" key={`${menu.menuId ?? menu.shopMenuId ?? index}`}>
                <div className="menu-change-card-header">
                  <span className="menu-change-name">{getMenuTitle(menu)}</span>
                  {priceText ? <span className="menu-change-price">{priceText}</span> : null}
                </div>
                {inputValues.length > 0 ? (
                  <div className="menu-change-inputs">{inputValues.join(' / ')}</div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="menu-change-empty">선택 메뉴 없음</div>
      )}
    </div>
  );
}

export default function DecisionCard({
  variant = 'approved',
  title,
  labels = { customer: '고객명', date: '예약 날짜', time: '예약 시간' },
  customerName = '김와플',
  dateText = '25.11.26 (수)',
  timeText = '18:30',
  durationMinutes,
  description,
  reservationChange,
  ownerMessage,
  detailInfo,
}) {
  const [open, setOpen] = useState(false);
  const isApproved = variant === 'approved';
  const isUpdated = variant === 'updated';
  const titleText =
    title ??
    {
      approved: '예약 확정',
      rejected: '예약 거절',
      updated: '예약 수정',
      canceled: '예약 취소',
    }[variant];
  const durationText = formatDurationMinutes(durationMinutes);
  const totalPrice = detailInfo ? formatReservationTotalPrice(detailInfo) : null;
  const changeRows = isUpdated
    ? [
        reservationChange?.date
          ? {
              label: '예약 날짜',
              before: reservationChange.date.before,
              after: reservationChange.date.after,
            }
          : null,
        reservationChange?.startAt
          ? {
              label: '시작 시간',
              before: reservationChange.startAt.before,
              after: reservationChange.startAt.after,
            }
          : null,
        reservationChange?.durationMinutes
          ? {
              label: '소요 시간',
              before: formatDurationMinutes(reservationChange.durationMinutes.before),
              after: formatDurationMinutes(reservationChange.durationMinutes.after),
            }
          : null,
        reservationChange?.staff
          ? {
              label: '담당자',
              before: reservationChange.staff.before?.staffName || '미지정',
              after: reservationChange.staff.after?.staffName || '미지정',
            }
          : null,
      ].filter(Boolean)
    : [];
  const legacyChange = isUpdated ? parseLegacyReservationChange(description) : null;
  const menuChange = isUpdated ? reservationChange?.menus : null;
  const hasMenuChange = Boolean(menuChange);
  const visibleChangeRows =
    changeRows.length > 0 || hasMenuChange ? changeRows : legacyChange?.rows || [];
  const hasVisibleChangeContent = visibleChangeRows.length > 0 || hasMenuChange;
  const visibleOwnerMessage = isUpdated ? null : ownerMessage || legacyChange?.ownerMessage;

  return (
    <div className={`decision-card card--${variant}`} role="region" aria-label={titleText}>
      {/* 헤더 */}
      <div className="card-header">
        <div className="status-badge" aria-hidden>
          {isApproved ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17l-5-5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : isUpdated ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-4-3L4 17v3Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
        <h2 className="card-title">{titleText}</h2>
      </div>

      {/* 정보 */}
      <div className="info-box">
        <div className="info-row">
          <span className="label">{labels.customer}</span>
          <span className="value">{customerName}</span>
        </div>
        <div className="info-row">
          <span className="label">{labels.date}</span>
          <span className="value accent">{dateText}</span>
        </div>
        <div className="info-row">
          <span className="label">{labels.time}</span>
          <span className="value accent">{timeText}</span>
        </div>
        {(isApproved || isUpdated) && durationText ? (
          <div className="info-row">
            <span className="label">소요 시간</span>
            <span className="value">{durationText}</span>
          </div>
        ) : null}
        {totalPrice ? (
          <>
            <div className="info-row">
              <span className="label">총 금액</span>
              <span className="value">{totalPrice.text}</span>
            </div>
            {totalPrice.missingText ? (
              <div className="price-note">{totalPrice.missingText}</div>
            ) : null}
          </>
        ) : null}
      </div>

      {hasVisibleChangeContent ? (
        <div className="change-section">
          <div className="section-title">예약 변경 내용</div>
          {visibleChangeRows.length > 0 ? (
            <div className="change-list">
              {visibleChangeRows.map((change) => (
                <div className="change-row" key={change.label}>
                  <span className="change-label">{change.label}</span>
                  <div className="change-values">
                    <span className="change-before">{change.before || '-'}</span>
                    <span className="change-arrow" aria-hidden>
                      →
                    </span>
                    <strong className="change-after">{change.after || '-'}</strong>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {hasMenuChange ? (
            <div className="menu-change-section">
              <span className="change-label">선택 메뉴</span>
              <div className="menu-change-columns">
                <MenuChangeList title="변경 전" menus={menuChange.before} tone="before" />
                <div className="menu-change-arrow" aria-hidden>
                  →
                </div>
                <MenuChangeList title="변경 후" menus={menuChange.after} tone="after" />
              </div>
            </div>
          ) : null}
        </div>
      ) : description ? (
        <div className="section system-message-content">
          <div className="section-title">안내</div>
          <div className="section-body">{description}</div>
        </div>
      ) : null}

      {visibleOwnerMessage ? (
        <div className="section owner-message-content">
          <div className="section-title">점주 전달사항</div>
          <div className="section-body">{visibleOwnerMessage}</div>
        </div>
      ) : null}

      {detailInfo ? (
        <>
          <button className="detail-toggle" type="button" onClick={() => setOpen((v) => !v)}>
            상세 보기
            <span>{open ? '▲' : '▼'}</span>
          </button>
          {open ? (
            <div className="detail-content">
              <div className="detail-section-title">예약 상세</div>
              <ReservationInfoView info={detailInfo} variant="messageCard" />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
