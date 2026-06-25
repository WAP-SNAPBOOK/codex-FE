import { useState } from 'react';
import ImageModal from '../modal/ImageModal';
import * as S from './ReservationInfoView.style';

const getMenuName = (menu = {}) => menu.menuNameSnapshot || menu.name || '이름 없는 메뉴';

const getMenuPath = (menu = {}) => {
  const menuName = getMenuName(menu);
  const tagName = menu.tagNameSnapshot;

  if (!tagName || tagName === menuName) {
    return menuName;
  }

  return `${tagName} > ${menuName}`;
};

const formatPrice = (price) => {
  if (price === null || price === undefined) {
    return '가격 미정';
  }

  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return '가격 미정';
  }

  return `${numericPrice.toLocaleString('ko-KR')}원`;
};

const getReservationStatus = (status) => {
  if (status === 'CONFIRMED' || status === 'RESERVATION_CONFIRMED') {
    return { variant: 'confirmed', label: '확정된 예약' };
  }

  if (status === 'REJECTED' || status === 'RESERVATION_REJECTED') {
    return { variant: 'rejected', label: '거절된 예약' };
  }

  return null;
};

export default function ReservationInfoView({
  info,
  showReservationStatus = false,
  showMenus = true,
  variant = 'default',
}) {
  const [activeIndex, setActiveIndex] = useState(null); //모달 활성화 된 사진 index
  const imageUrls = Array.isArray(info.imageUrls) ? info.imageUrls : [];
  const imageCount = info.imageCount ?? imageUrls.length ?? 0;
  const requirements = info.requirements?.trim() || '';
  const menus = Array.isArray(info.menus) ? info.menus : [];
  const reservationStatus = showReservationStatus ? getReservationStatus(info.status) : null;

  const formatInputValue = (inputValue) => {
    if (inputValue?.valueText?.trim()) return inputValue.valueText;
    if (inputValue?.valueNumber !== null && inputValue?.valueNumber !== undefined) {
      return String(inputValue.valueNumber);
    }

    return '입력 없음';
  };

  const isMessageCard = variant === 'messageCard';

  return (
    <S.DetailSection $messageCard={isMessageCard}>
      {reservationStatus ? (
        <S.StatusNotice $variant={reservationStatus.variant}>
          <span>{reservationStatus.label}</span>
        </S.StatusNotice>
      ) : null}

      {showMenus ? (
        <S.DetailBlock $messageCard={isMessageCard} $tone="plain">
          <S.Label>선택 메뉴</S.Label>
          {menus.length > 0 ? (
            <S.MenuList>
              {menus.map((menu, index) => (
                <S.MenuCard
                  $messageCard={isMessageCard}
                  key={`${menu.shopMenuId ?? menu.menuNameSnapshot ?? 'menu'}-${index}`}
                >
                  <S.MenuHeader>
                    <S.MenuName>{getMenuPath(menu)}</S.MenuName>
                    <S.MenuMeta>{formatPrice(menu.priceSnapshot)}</S.MenuMeta>
                  </S.MenuHeader>

                  {menu.inputValues?.length > 0 ? (
                    <S.InputList>
                      {menu.inputValues.map((inputValue, inputIndex) => (
                        <S.InputRow
                          key={`${inputValue.fieldLabelSnapshot ?? 'input'}-${inputIndex}`}
                        >
                          <S.InputLabel>
                            {inputValue.fieldLabelSnapshot || '추가 입력'}
                          </S.InputLabel>
                          <S.InputValue>{formatInputValue(inputValue)}</S.InputValue>
                        </S.InputRow>
                      ))}
                    </S.InputList>
                  ) : null}
                </S.MenuCard>
              ))}
            </S.MenuList>
          ) : (
            <S.EmptyText>선택한 메뉴가 없습니다.</S.EmptyText>
          )}
        </S.DetailBlock>
      ) : null}

      {imageUrls.length > 0 ? (
        <S.DetailBlock $messageCard={isMessageCard} $tone="plain">
          <S.Label>첨부 이미지</S.Label>
          <S.CountText>{imageCount}장</S.CountText>
          <S.PhotoGrid>
            {imageUrls.map((url, index) => (
              <S.Photo key={`${url}-${index}`} src={url} onClick={() => setActiveIndex(index)} />
            ))}
          </S.PhotoGrid>
          {activeIndex !== null && (
            <ImageModal src={imageUrls[activeIndex]} onClose={() => setActiveIndex(null)} />
          )}
        </S.DetailBlock>
      ) : null}

      {requirements ? (
        <S.DetailBlock $messageCard={isMessageCard} $tone="plain">
          <S.Label>고객 요구사항</S.Label>
          <S.RequestBox $messageCard={isMessageCard} $tone="light">
            {requirements}
          </S.RequestBox>
        </S.DetailBlock>
      ) : null}

      {info.confirmationMessage ? (
        <S.DetailBlock $messageCard={isMessageCard} $tone="neutral">
          <S.Label>점주 전달 사항</S.Label>
          <S.RequestBox $messageCard={isMessageCard} $tone="neutral">
            {info.confirmationMessage}
          </S.RequestBox>
        </S.DetailBlock>
      ) : null}

      {info.rejectionReason ? (
        <S.DetailBlock $messageCard={isMessageCard} $tone="neutral">
          <S.Label>거절 사유</S.Label>
          <S.RequestBox $messageCard={isMessageCard} $tone="neutral">
            {info.rejectionReason}
          </S.RequestBox>
        </S.DetailBlock>
      ) : null}
    </S.DetailSection>
  );
}
