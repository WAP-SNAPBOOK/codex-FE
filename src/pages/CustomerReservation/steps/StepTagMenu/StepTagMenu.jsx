import { useState, useEffect } from 'react';
import * as S from './StepTagMenu.styles';
import { useShopTags, useMenusByTag } from '@/query/reservationQueries';
import MenuInputFields from './MenuInputFields';

const formatPrice = (price) => {
  if (price === null || price === undefined) {
    return null;
  }

  const numericPrice = Number(price);

  if (!Number.isFinite(numericPrice)) {
    return null;
  }

  return `${numericPrice.toLocaleString('ko-KR')}원`;
};

export default function StepTagMenu({ shopId, initialData = {}, onChange }) {
  const [selectedTagId, setSelectedTagId] = useState(initialData.tagId ?? null);
  const [selectedMenuIds, setSelectedMenuIds] = useState(initialData.menuIds ?? []);
  const [inputFieldValues, setInputFieldValues] = useState(initialData.inputFieldValues ?? {});

  const { data: tags = [], isLoading: tagsLoading } = useShopTags(shopId);
  const { data: menus = [], isLoading: menusLoading } = useMenusByTag(shopId, selectedTagId);

  useEffect(() => {
    if (!initialData.tagId && tags.length > 0 && selectedTagId === null) {
      const initialTag = tags.find((tag) => tag.name === initialData.tagName);
      setSelectedTagId(initialTag?.id ?? tags[0].id);
    }
  }, [tags]);

  useEffect(() => {
    onChange({
      tagId: selectedTagId,
      menuIds: selectedMenuIds,
      inputFieldValues,
      isValid: selectedTagId !== null && selectedMenuIds.length > 0,
    });
  }, [selectedTagId, selectedMenuIds, inputFieldValues, onChange]);

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
    setSelectedMenuIds([]);
    setInputFieldValues({});
  };

  const handleMenuClick = (menu) => {
    if (!menu.isActive) return;
    setSelectedMenuIds((prev) =>
      prev.includes(menu.id) ? prev.filter((id) => id !== menu.id) : [...prev, menu.id]
    );
  };

  if (tagsLoading) return <div>로딩 중...</div>;

  return (
    <>
      <S.SectionTitle>시술 메뉴를 선택해 주세요.</S.SectionTitle>
      <S.SectionDescription>
        매장에서 디자이너와 상담 후 확정된 시술 메뉴와 금액으로 결제됩니다.
      </S.SectionDescription>

      <S.ButtonGrid>
        {tags.map((tag) => (
          <S.SelectButton
            key={tag.id}
            type="button"
            $selected={selectedTagId === tag.id}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.name}
          </S.SelectButton>
        ))}
      </S.ButtonGrid>

      {selectedTagId && (
        <S.MenuList>
          {menusLoading ? (
            <div>메뉴 로딩 중...</div>
          ) : (
            menus.map((menu) => {
              const isSelected = selectedMenuIds.includes(menu.id);
              const isDisabled = !menu.isActive;

              return (
                <S.MenuCard key={menu.id} $disabled={isDisabled}>
                  <S.MenuSummary
                    type="button"
                    disabled={isDisabled}
                    aria-pressed={isSelected}
                    onClick={() => handleMenuClick(menu)}
                  >
                    <S.RadioIndicator $selected={isSelected} aria-hidden="true" />
                    <S.MenuContent>
                      <S.MenuName $disabled={isDisabled}>{menu.name}</S.MenuName>
                      <S.MenuDescription $disabled={isDisabled}>
                        {menu.description}
                      </S.MenuDescription>
                      {formatPrice(menu.price) ? (
                        <S.MenuPrice $disabled={isDisabled}>{formatPrice(menu.price)}</S.MenuPrice>
                      ) : null}
                    </S.MenuContent>
                  </S.MenuSummary>
                  {isSelected && (
                    <S.MenuInputSlot>
                      <MenuInputFields
                        shopId={shopId}
                        menuId={menu.id}
                        values={inputFieldValues[menu.id] ?? {}}
                        onChange={(fieldId, val) =>
                          setInputFieldValues((prev) => ({
                            ...prev,
                            [menu.id]: { ...prev[menu.id], [fieldId]: val },
                          }))
                        }
                      />
                    </S.MenuInputSlot>
                  )}
                </S.MenuCard>
              );
            })
          )}
        </S.MenuList>
      )}
    </>
  );
}
