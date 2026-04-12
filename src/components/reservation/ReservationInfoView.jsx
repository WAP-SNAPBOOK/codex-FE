import { useState } from 'react';
import ImageModal from '../modal/ImageModal';
import * as S from './ReservationInfoView.style';

export default function ReservationInfoView({ info }) {
  const [activeIndex, setActiveIndex] = useState(null); //모달 활성화 된 사진 index
  const imageUrls = Array.isArray(info.imageUrls) ? info.imageUrls : [];
  const imageCount = info.imageCount ?? imageUrls.length ?? 0;
  const requirements = info.requirements?.trim() || '없음';
  const menus = Array.isArray(info.menus) ? info.menus : [];

  const formatInputValue = (inputValue) => {
    if (inputValue?.valueText?.trim()) return inputValue.valueText;
    if (inputValue?.valueNumber !== null && inputValue?.valueNumber !== undefined) {
      return String(inputValue.valueNumber);
    }

    return '입력 없음';
  };

  return (
    <S.DetailSection>
      <S.DetailBlock>
        <S.Label>선택 메뉴</S.Label>
        {menus.length > 0 ? (
          <S.MenuList>
            {menus.map((menu, index) => (
              <S.MenuCard key={`${menu.shopMenuId ?? menu.menuNameSnapshot ?? 'menu'}-${index}`}>
                <S.MenuHeader>
                  <S.MenuName>{menu.menuNameSnapshot || '이름 없는 메뉴'}</S.MenuName>
                  {menu.priceSnapshot !== null && menu.priceSnapshot !== undefined ? (
                    <S.MenuMeta>{menu.priceSnapshot}원</S.MenuMeta>
                  ) : null}
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
                ) : (
                  <S.EmptyText>추가 입력 없음</S.EmptyText>
                )}
              </S.MenuCard>
            ))}
          </S.MenuList>
        ) : (
          <S.EmptyText>선택한 메뉴가 없습니다.</S.EmptyText>
        )}
      </S.DetailBlock>

      <S.DetailBlock>
        <S.Label>첨부 이미지</S.Label>
        <S.CountText>{imageCount}장</S.CountText>
        {imageUrls.length > 0 ? (
          <>
            <S.PhotoGrid>
              {imageUrls.map((url, index) => (
                <S.Photo key={`${url}-${index}`} src={url} onClick={() => setActiveIndex(index)} />
              ))}
            </S.PhotoGrid>
            {activeIndex !== null && (
              <ImageModal src={imageUrls[activeIndex]} onClose={() => setActiveIndex(null)} />
            )}
          </>
        ) : (
          <S.EmptyText>첨부된 이미지가 없습니다.</S.EmptyText>
        )}
      </S.DetailBlock>

      <S.DetailBlock>
        <S.Label>요구사항</S.Label>
        <S.RequestBox>{requirements}</S.RequestBox>
      </S.DetailBlock>

      {info.confirmationMessage ? (
        <S.DetailBlock>
          <S.Label>점주 전달 사항</S.Label>
          <S.RequestBox>{info.confirmationMessage}</S.RequestBox>
        </S.DetailBlock>
      ) : null}

      {info.rejectionReason ? (
        <S.DetailBlock>
          <S.Label>거절 사유</S.Label>
          <S.RequestBox>{info.rejectionReason}</S.RequestBox>
        </S.DetailBlock>
      ) : null}
    </S.DetailSection>
  );
}
