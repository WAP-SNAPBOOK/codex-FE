import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ReservationInfoView from '@/components/reservation/ReservationInfoView';
import ReservationMenuEditor from '@/pages/OwnerReservation/ReservationMenuEditor';
import {
  useCancelReservation,
  useConfirmReservation,
  useRejectReservation,
  useReservationDetail,
  useShopTags,
  useUpdateReservation,
} from '@/query/reservationQueries';
import { formatDurationMinutes } from '@/utils/formatDurationMinutes';
import backIcon from '@/assets/icons/back-icon.svg';
import * as S from './OwnerReservationDetailPage.styles';

const DURATION_OPTIONS = [30, 60, 90, 120, 150, 180];

const formatClock = (value) => {
  const match = String(value ?? '').match(/(?:T)?(\d{2}):(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : '-';
};

const getStatusText = (status) => {
  const labels = {
    PENDING: '대기',
    CONFIRMED: '확정',
    REJECTED: '거절',
    CANCELED: '취소',
  };
  return labels[status] ?? status ?? '-';
};

const getTotal = (detail) => {
  if (detail?.totalPrice !== null && detail?.totalPrice !== undefined) {
    return { totalText: `${Number(detail.totalPrice).toLocaleString('ko-KR')}원`, missingText: '' };
  }

  const menus = Array.isArray(detail?.menus) ? detail.menus : [];
  const prices = menus
    .map((menu) => menu.priceSnapshot)
    .filter((price) => price !== null && price !== undefined && Number.isFinite(Number(price)));

  if (prices.length === 0) {
    return { totalText: '총액 미정', missingText: menus.length ? '메뉴 가격 미정' : '' };
  }

  const total = prices.reduce((sum, price) => sum + Number(price), 0);
  return {
    totalText: `${total.toLocaleString('ko-KR')}원`,
    missingText: prices.length < menus.length ? '일부 메뉴 가격 미정' : '',
  };
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.response?.data?.error || '요청을 처리하지 못했습니다.';

const getMenuName = (menu = {}) => {
  const menuName = menu.menuNameSnapshot || menu.name || '이름 없는 메뉴';
  return menu.tagNameSnapshot && menu.tagNameSnapshot !== menuName
    ? `${menu.tagNameSnapshot} > ${menuName}`
    : menuName;
};

const formatPrice = (price) => {
  const numericPrice = Number(price);
  return price !== null && price !== undefined && Number.isFinite(numericPrice)
    ? `${numericPrice.toLocaleString('ko-KR')}원`
    : '가격 미정';
};

const getMenuId = (menu = {}) => menu.shopMenuId ?? menu.menuId ?? menu.id;

const getMenuInputFieldId = (inputValue = {}) => inputValue.inputFieldId ?? inputValue.fieldId;

const buildMenuSelections = (detail, tags = []) => {
  const menus = Array.isArray(detail?.menus) ? detail.menus : [];

  return menus.map((menu) => {
    const tagName = menu.tagNameSnapshot ?? menu.tagName ?? null;
    const tagId =
      menu.tagId ?? menu.shopTagId ?? tags.find((tag) => tag.name === tagName)?.id ?? null;

    return {
      menuId: getMenuId(menu),
      tagId,
      tagName,
      menuName: menu.menuNameSnapshot ?? menu.name ?? '이름 없는 메뉴',
      price: menu.priceSnapshot ?? menu.price ?? null,
      inputValues: (menu.inputValues || []).reduce((acc, inputValue) => {
        const fieldId = getMenuInputFieldId(inputValue);
        if (!fieldId) return acc;

        acc[fieldId] = inputValue.valueText ?? inputValue.valueNumber ?? '';
        return acc;
      }, {}),
    };
  });
};

const serializeMenuSelections = (menuSelections = []) =>
  JSON.stringify(
    menuSelections.map((menu) => ({
      menuId: menu.menuId ?? null,
      tagId: menu.tagId ?? null,
      inputValues: menu.inputValues ?? {},
    }))
  );

export default function OwnerReservationDetailPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const numericReservationId = Number(reservationId);
  const [mode, setMode] = useState(null);
  const [date, setDate] = useState('');
  const [startAt, setStartAt] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [menuSelections, setMenuSelections] = useState([]);
  const [message, setMessage] = useState('');
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    data: detail,
    isLoading,
    isError,
  } = useReservationDetail(Number.isFinite(numericReservationId) ? numericReservationId : null);
  const confirmMutation = useConfirmReservation();
  const rejectMutation = useRejectReservation();
  const updateMutation = useUpdateReservation();
  const cancelMutation = useCancelReservation();
  const { data: shopTags = [] } = useShopTags(detail?.shopId);

  useEffect(() => {
    if (!detail) return;
    setDate(detail.date || '');
    setStartAt(formatClock(detail.startAt || detail.time));
    setDurationMinutes(detail.durationMinutes || 60);
    setMessage(detail.confirmationMessage || '');
  }, [detail]);

  useEffect(() => {
    if (!detail) return;
    setMenuSelections(buildMenuSelections(detail, shopTags));
  }, [detail, shopTags]);

  const total = getTotal(detail);
  const originalMenuSelections = buildMenuSelections(detail, shopTags);
  const isSubmitting =
    confirmMutation.isPending ||
    rejectMutation.isPending ||
    updateMutation.isPending ||
    cancelMutation.isPending;

  const closePage = () => {
    if (location.state?.calendarDate) {
      navigate('/reservations', {
        replace: true,
        state: {
          calendarDate: location.state.calendarDate,
          staffId: location.state.staffId ?? null,
        },
      });
      return;
    }

    if (location.key === 'default') {
      navigate('/reservations', { replace: true });
      return;
    }
    navigate(-1);
  };

  const refreshReservation = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['reservation-detail', numericReservationId] }),
      queryClient.invalidateQueries({ queryKey: ['owner-reservation-calendar'] }),
    ]);
    setMode(null);
    setReason('');
    setErrorMessage('');
  };

  const submitAction = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    try {
      if (mode === 'confirm') {
        if (!message.trim()) throw new Error('고객에게 전달할 메시지를 입력해 주세요.');
        await confirmMutation.mutateAsync({
          id: numericReservationId,
          date: date || detail.date,
          startAt,
          durationMinutes,
          message: message.trim(),
        });
      } else if (mode === 'reject') {
        if (!reason.trim()) throw new Error('거절 사유를 입력해 주세요.');
        await rejectMutation.mutateAsync({ id: numericReservationId, reason: reason.trim() });
      } else if (mode === 'edit') {
        const originalDate = detail.date || '';
        const originalStartAt = formatClock(detail.startAt || detail.time);
        const originalDurationMinutes = detail.durationMinutes || 60;
        const originalMessage = detail.confirmationMessage?.trim() || '';
        const nextDate = date || originalDate;
        const nextMessage = message.trim();
        const hasMenuChanges =
          serializeMenuSelections(menuSelections) !==
          serializeMenuSelections(originalMenuSelections);
        const hasChanges =
          nextDate !== originalDate ||
          startAt !== originalStartAt ||
          durationMinutes !== originalDurationMinutes ||
          hasMenuChanges ||
          nextMessage !== originalMessage;

        if (!hasChanges) {
          throw new Error('변경된 내용이 없습니다.');
        }

        await updateMutation.mutateAsync({
          id: numericReservationId,
          date: nextDate,
          startAt,
          durationMinutes,
          menuSelections: hasMenuChanges ? menuSelections : undefined,
          message: nextMessage,
        });
      } else if (mode === 'cancel') {
        if (!reason.trim()) throw new Error('취소 사유를 입력해 주세요.');
        await cancelMutation.mutateAsync({ id: numericReservationId, reason: reason.trim() });
      }

      await refreshReservation();
    } catch (error) {
      setErrorMessage(
        error?.response ? getErrorMessage(error) : error.message || getErrorMessage(error)
      );
    }
  };

  const openMode = (nextMode) => {
    if (!nextMode && detail) {
      setDate(detail.date || '');
      setStartAt(formatClock(detail.startAt || detail.time));
      setDurationMinutes(detail.durationMinutes || 60);
      setMenuSelections(buildMenuSelections(detail, shopTags));
      setMessage(detail.confirmationMessage || '');
    }
    setMode(nextMode);
    setReason('');
    setErrorMessage('');
  };

  return (
    <S.Page>
      <S.Content>
        <S.Header>
          <S.BackButton type="button" aria-label="캘린더로 돌아가기" onClick={closePage}>
            <img src={backIcon} alt="" />
          </S.BackButton>
          <S.Title>예약 상세 정보</S.Title>
          <S.HeaderSpacer />
        </S.Header>

        {isLoading ? <S.EmptyState>예약 상세를 불러오는 중입니다.</S.EmptyState> : null}
        {isError || (!isLoading && !detail) ? (
          <S.EmptyState>예약 상세를 불러오지 못했습니다.</S.EmptyState>
        ) : null}

        {detail ? (
          <>
            <S.CustomerCard>
              <S.CustomerName>{detail.customerName || '고객 정보 없음'}</S.CustomerName>
              <S.CustomerPhone>{detail.customerPhone || '-'}</S.CustomerPhone>
              <S.StatusPill $status={detail.status}>{getStatusText(detail.status)}</S.StatusPill>
            </S.CustomerCard>

            <S.Section>
              <S.SectionTitle>예약 일시</S.SectionTitle>
              <S.DateTimeGrid>
                {mode === 'confirm' || mode === 'edit' ? (
                  <S.Input
                    type="date"
                    required
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                  />
                ) : (
                  <S.InfoBox>{detail.date || '-'}</S.InfoBox>
                )}
                {mode === 'confirm' || mode === 'edit' ? (
                  <S.Input
                    type="time"
                    step="1800"
                    required
                    value={startAt}
                    onChange={(event) => setStartAt(event.target.value)}
                  />
                ) : (
                  <S.InfoBox>{formatClock(detail.startAt || detail.time)}</S.InfoBox>
                )}
              </S.DateTimeGrid>
            </S.Section>

            <>
              <S.Section>
                <S.SectionTitle>담당자</S.SectionTitle>
                <S.InfoBox>{detail.staffName || '미지정'}</S.InfoBox>
              </S.Section>

              <S.Section>
                <S.SectionTitle>시술 메뉴</S.SectionTitle>
                {mode === 'edit' && detail.shopId ? (
                  <ReservationMenuEditor
                    key={`menu-edit-${detail.id}`}
                    shopId={detail.shopId}
                    initialMenus={detail.menus || []}
                    onChange={({ menuSelections: nextMenuSelections }) =>
                      setMenuSelections(nextMenuSelections)
                    }
                  />
                ) : (
                  <S.MenuList>
                    {(detail.menus || []).map((menu, index) => (
                      <S.MenuRow key={`${menu.shopMenuId ?? menu.menuNameSnapshot}-${index}`}>
                        <span>{getMenuName(menu)}</span>
                        <strong>{formatPrice(menu.priceSnapshot)}</strong>
                      </S.MenuRow>
                    ))}
                    {!detail.menus?.length ? <S.InfoBox>선택한 메뉴가 없습니다.</S.InfoBox> : null}
                  </S.MenuList>
                )}
              </S.Section>

              <S.TotalBox>
                <S.DetailRow>
                  <S.DetailKey>총 금액</S.DetailKey>
                  <S.DetailValue>{total.totalText}</S.DetailValue>
                </S.DetailRow>
                {total.missingText ? (
                  <S.DetailRow>
                    <S.DetailKey />
                    <S.DetailValue>{total.missingText}</S.DetailValue>
                  </S.DetailRow>
                ) : null}
              </S.TotalBox>

              <S.Section>
                <S.SectionTitle>시술 시간</S.SectionTitle>
                {mode === 'confirm' || mode === 'edit' ? (
                  <S.Select
                    value={durationMinutes}
                    onChange={(event) => setDurationMinutes(Number(event.target.value))}
                  >
                    {DURATION_OPTIONS.map((minutes) => (
                      <option key={minutes} value={minutes}>
                        {formatDurationMinutes(minutes)}
                      </option>
                    ))}
                  </S.Select>
                ) : (
                  <S.InfoBox>
                    {detail.durationMinutes
                      ? formatDurationMinutes(detail.durationMinutes)
                      : '미정'}
                  </S.InfoBox>
                )}
              </S.Section>
            </>

            {(mode === 'confirm' || mode === 'edit') && (
              <S.Section>
                <S.SectionTitle>고객 전달 메시지</S.SectionTitle>
                <S.Textarea
                  required={mode === 'confirm'}
                  maxLength={200}
                  placeholder="변경 또는 확정 내용을 입력해 주세요."
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
              </S.Section>
            )}

            <ReservationInfoView info={detail} showMenus={false} />

            {mode === 'reject' || mode === 'cancel' ? (
              <ReservationActionForm
                mode={mode}
                reason={reason}
                errorMessage={errorMessage}
                onReasonChange={setReason}
              />
            ) : null}

            {errorMessage && mode !== 'reject' && mode !== 'cancel' ? (
              <S.ErrorText>{errorMessage}</S.ErrorText>
            ) : null}

            {detail.status === 'PENDING' || detail.status === 'CONFIRMED' || mode ? (
              <S.BottomBar>
                {!mode && detail.status === 'PENDING' ? (
                  <>
                    <S.ActionButton type="button" onClick={() => openMode('reject')}>
                      거절
                    </S.ActionButton>
                    <S.ActionButton type="button" $primary onClick={() => openMode('confirm')}>
                      예약 확정
                    </S.ActionButton>
                  </>
                ) : null}
                {!mode && detail.status === 'CONFIRMED' ? (
                  <>
                    <S.ActionButton type="button" onClick={() => openMode('cancel')}>
                      예약 취소
                    </S.ActionButton>
                    <S.ActionButton type="button" $primary onClick={() => openMode('edit')}>
                      예약 수정
                    </S.ActionButton>
                  </>
                ) : null}
                {mode ? (
                  <>
                    <S.ActionButton
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => openMode(null)}
                    >
                      취소
                    </S.ActionButton>
                    <S.ActionButton
                      type="button"
                      $primary
                      disabled={isSubmitting}
                      onClick={submitAction}
                    >
                      {isSubmitting ? '처리 중...' : mode === 'edit' ? '저장' : '확인'}
                    </S.ActionButton>
                  </>
                ) : null}
              </S.BottomBar>
            ) : null}
          </>
        ) : null}
      </S.Content>
    </S.Page>
  );
}

function ReservationActionForm({ mode, reason, errorMessage, onReasonChange }) {
  return (
    <S.Section>
      <S.SectionTitle>{mode === 'reject' ? '거절 사유' : '취소 사유'}</S.SectionTitle>
      <S.Textarea
        required
        maxLength={200}
        placeholder={`${mode === 'reject' ? '거절' : '취소'} 사유를 입력해 주세요.`}
        value={reason}
        onChange={(event) => onReasonChange(event.target.value)}
      />
      {errorMessage ? <S.ErrorText>{errorMessage}</S.ErrorText> : null}
    </S.Section>
  );
}
