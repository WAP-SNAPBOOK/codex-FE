import { useState, useEffect } from 'react';
import * as C from './steps.styles';
import * as S from './StepTagMenu.styles';
import RadioButton from '@/components/common/RadioButton';
import { useShopTags, useMenusByTag } from '@/query/reservationQueries';

const MIN = 1;
const MAX = 10;

export default function StepTagMenu({ shopId, initialData = {}, onChange }) {
  const [selectedTagId, setSelectedTagId] = useState(initialData.tagId ?? null);
  const [selectedMenuIds, setSelectedMenuIds] = useState(initialData.menuIds ?? []);
  const [menuCounts, setMenuCounts] = useState(initialData.menuCounts ?? {});

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
      menuCounts,
      isValid: selectedTagId !== null && selectedMenuIds.length > 0,
    });
  }, [selectedTagId, selectedMenuIds, menuCounts, onChange]);

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
    setSelectedMenuIds([]);
    setMenuCounts({});
  };

  const handleMenuClick = (menu) => {
    if (!menu.isActive) return;
    setSelectedMenuIds((prev) =>
      prev.includes(menu.id) ? prev.filter((id) => id !== menu.id) : [...prev, menu.id]
    );
    setMenuCounts((prev) => {
      if (prev[menu.id]) {
        const next = { ...prev };
        delete next[menu.id];
        return next;
      }
      return { ...prev, [menu.id]: MIN };
    });
  };

  const handleMinus = (e, menuId) => {
    e.stopPropagation();
    setMenuCounts((prev) => ({ ...prev, [menuId]: Math.max(MIN, (prev[menuId] ?? MIN) - 1) }));
  };

  const handlePlus = (e, menuId) => {
    e.stopPropagation();
    setMenuCounts((prev) => ({ ...prev, [menuId]: Math.min(MAX, (prev[menuId] ?? MIN) + 1) }));
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
                      <S.CountControl>
                        <S.CountButton onClick={(e) => handleMinus(e, menu.id)}>−</S.CountButton>
                        <S.CountNumber>{menuCounts[menu.id] ?? MIN}</S.CountNumber>
                        <S.CountButton $primary onClick={(e) => handlePlus(e, menu.id)}>
                          +
                        </S.CountButton>
                      </S.CountControl>
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
