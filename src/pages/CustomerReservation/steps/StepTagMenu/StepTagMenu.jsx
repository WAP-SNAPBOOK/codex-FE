import { useState, useEffect } from 'react';
import * as C from '../steps.styles';
import * as S from './StepTagMenu.styles';
import RadioButton from '@/components/common/RadioButton';
import { useShopTags, useMenusByTag } from '@/query/reservationQueries';
import MenuInputFields from './MenuInputFields';

export default function StepTagMenu({ shopId, initialData = {}, onChange }) {
  const [selectedTagId, setSelectedTagId] = useState(initialData.tagId ?? null);
  const [selectedMenuIds, setSelectedMenuIds] = useState(initialData.menuIds ?? []);
  const [inputFieldValues, setInputFieldValues] = useState(initialData.inputFieldValues ?? {});

  const { data: tags = [], isLoading: tagsLoading } = useShopTags(shopId);
  const { data: menus = [], isLoading: menusLoading } = useMenusByTag(shopId, selectedTagId);

  useEffect(() => {
    if (!initialData.tagId && tags.length > 0 && selectedTagId === null) {
      setSelectedTagId(tags[0].id);
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
      <C.SectionHeading>
        시술 메뉴를 <br />
        선택해주세요.
      </C.SectionHeading>

      {/* 태그 버튼 */}
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

      {/* 메뉴 카드 목록 */}
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
                  <RadioButton checked={isSelected} onChange={() => handleMenuClick(menu)} />
                  <S.MenuContent>
                    <S.MenuName $disabled={isDisabled}>{menu.name}</S.MenuName>
                    <S.MenuDescription $disabled={isDisabled}>{menu.description}</S.MenuDescription>
                    {isSelected && (
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
                    )}
                  </S.MenuContent>
                </S.MenuCard>
              );
            })
          )}
        </S.MenuList>
      )}
    </>
  );
}
