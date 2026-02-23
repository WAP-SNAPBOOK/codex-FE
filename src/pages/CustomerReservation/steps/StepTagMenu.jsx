import { useState, useEffect } from 'react';
import * as C from './steps.styles';
import * as S from './StepTagMenu.styles';
import RadioButton from '@/components/common/RadioButton';
import { useShopTags, useMenusByTag } from '@/query/reservationQueries';

const MIN = 1;
const MAX = 10;

export default function StepTagMenu({ shopId, initialData = {}, onChange }) {
  const [selectedTagId, setSelectedTagId] = useState(initialData.tagId ?? null);
  const [selectedMenuId, setSelectedMenuId] = useState(initialData.menuId ?? null);
  const [menuCount, setMenuCount] = useState(MIN);

  const { data: tags = [], isLoading: tagsLoading } = useShopTags(shopId);
  const { data: menus = [], isLoading: menusLoading } = useMenusByTag(shopId, selectedTagId);

  useEffect(() => {
    onChange({
      tagId: selectedTagId,
      menuId: selectedMenuId,
      isValid: selectedTagId !== null && selectedMenuId !== null,
    });
  }, [selectedTagId, selectedMenuId, onChange]);

  const handleTagClick = (tagId) => {
    setSelectedTagId(tagId);
    setSelectedMenuId(null); // 태그 변경 시 메뉴 초기화
  };

  const handleMenuClick = (menu) => {
    if (!menu.isActive) return;
    setSelectedMenuId((prev) => {
      if (prev !== menu.id) setMenuCount(MIN);
      return prev === menu.id ? null : menu.id;
    });
  };

  const handleMinus = (e) => {
    e.stopPropagation();
    setMenuCount((prev) => Math.max(MIN, prev - 1));
  };

  const handlePlus = (e) => {
    e.stopPropagation();
    setMenuCount((prev) => Math.min(MAX, prev + 1));
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
              const isSelected = selectedMenuId === menu.id;
              const isDisabled = !menu.isActive;

              return (
                <S.MenuCard key={menu.id} $disabled={isDisabled}>
                  <RadioButton checked={isSelected} onChange={() => handleMenuClick(menu)} />
                  <S.MenuContent>
                    <S.MenuName $disabled={isDisabled}>{menu.name}</S.MenuName>
                    <S.MenuDescription $disabled={isDisabled}>{menu.description}</S.MenuDescription>
                    {isSelected && (
                      <div className="flex justify-end">
                        <S.CountControl>
                          <S.CountButton onClick={handleMinus}>−</S.CountButton>
                          <S.CountNumber>{menuCount}</S.CountNumber>
                          <S.CountButton $primary onClick={handlePlus}>
                            +
                          </S.CountButton>
                        </S.CountControl>
                      </div>
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
