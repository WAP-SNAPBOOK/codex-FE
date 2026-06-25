import { useEffect, useState } from 'react';
import { useMenusByTag, useShopTags } from '@/query/reservationQueries';
import MenuInputFields from '@/pages/CustomerReservation/steps/StepTagMenu/MenuInputFields';
import * as S from './ReservationMenuEditor.styles';

const formatPrice = (price) => {
  const numericPrice = Number(price);
  return price !== null && price !== undefined && Number.isFinite(numericPrice)
    ? `${numericPrice.toLocaleString('ko-KR')}원`
    : '가격 미정';
};

const getMenuId = (menu = {}) => menu.shopMenuId ?? menu.menuId ?? menu.id;

const getInputFieldId = (inputValue = {}) => inputValue.inputFieldId ?? inputValue.fieldId;

const normalizeInputValues = (inputValues = []) =>
  (Array.isArray(inputValues) ? inputValues : []).reduce((acc, inputValue) => {
    const fieldId = getInputFieldId(inputValue);
    if (!fieldId) return acc;

    acc[fieldId] = inputValue.valueText ?? inputValue.valueNumber ?? '';
    return acc;
  }, {});

const toDraftMenu = (menu = {}, tags = []) => {
  const tagName = menu.tagNameSnapshot ?? menu.tagName ?? null;
  const tagId =
    menu.tagId ?? menu.shopTagId ?? tags.find((tag) => tag.name === tagName)?.id ?? null;
  const menuId = getMenuId(menu);

  return {
    key: `${menuId ?? 'menu'}-${tagId ?? tagName ?? 'unknown'}`,
    menuId,
    tagId,
    tagName,
    menuName: menu.menuNameSnapshot ?? menu.name ?? '이름 없는 메뉴',
    price: menu.priceSnapshot ?? menu.price ?? null,
    inputValues: normalizeInputValues(menu.inputValues),
  };
};

const serializeMenus = (menus = []) =>
  JSON.stringify(
    menus.map((menu) => ({
      menuId: menu.menuId ?? null,
      tagId: menu.tagId ?? null,
      inputValues: menu.inputValues ?? {},
    }))
  );

const buildMenuSelections = (menus = []) =>
  menus.map((menu) => ({
    menuId: menu.menuId,
    tagId: menu.tagId,
    inputValues: Object.entries(menu.inputValues ?? {}).map(([fieldId, value]) => ({
      fieldId: Number(fieldId),
      valueNumber: typeof value === 'number' ? value : null,
      valueText: typeof value === 'string' ? value : null,
    })),
  }));

export default function ReservationMenuEditor({ shopId, initialMenus = [], onChange }) {
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [selectedMenuId, setSelectedMenuId] = useState('');
  const [menuItems, setMenuItems] = useState([]);

  const { data: tags = [], isLoading: tagsLoading } = useShopTags(shopId);
  const { data: availableMenus = [], isLoading: menusLoading } = useMenusByTag(
    shopId,
    selectedTagId
  );

  useEffect(() => {
    const normalized = initialMenus.map((menu) => toDraftMenu(menu, tags));
    setMenuItems(normalized);
  }, [initialMenus, tags]);

  useEffect(() => {
    if (tags.length === 0) return;

    setSelectedTagId((current) => current ?? tags[0].id);
  }, [tags]);

  useEffect(() => {
    if (!shopId) return;

    onChange?.({
      menuSelections: buildMenuSelections(menuItems),
      isValid: menuItems.length > 0,
    });
  }, [menuItems, onChange, shopId]);

  useEffect(() => {
    if (!selectedTagId) {
      setSelectedMenuId('');
      return;
    }

    setSelectedMenuId('');
  }, [selectedTagId]);

  const handleAddMenu = () => {
    const menu = availableMenus.find((item) => String(item.id) === String(selectedMenuId));
    if (!menu) return;

    const alreadyExists = menuItems.some((item) => String(item.menuId) === String(menu.id));
    if (alreadyExists) {
      return;
    }

    setMenuItems((prev) => [
      ...prev,
      {
        key: `${menu.id}-${selectedTagId}`,
        menuId: menu.id,
        tagId: selectedTagId,
        tagName: tags.find((tag) => String(tag.id) === String(selectedTagId))?.name ?? null,
        menuName: menu.name,
        price: menu.price ?? null,
        inputValues: {},
      },
    ]);
    setSelectedMenuId('');
  };

  const handleRemoveMenu = (menuKey) => {
    setMenuItems((prev) => prev.filter((menu) => menu.key !== menuKey));
  };

  const handleMenuInputChange = (menuKey, fieldId, value) => {
    setMenuItems((prev) =>
      prev.map((menu) =>
        menu.key === menuKey
          ? {
              ...menu,
              inputValues: {
                ...menu.inputValues,
                [fieldId]: value,
              },
            }
          : menu
      )
    );
  };

  if (tagsLoading) {
    return <S.EmptyState>메뉴 편집 정보를 불러오는 중입니다.</S.EmptyState>;
  }

  return (
    <S.Editor>
      <S.AddRow>
        <S.Select
          value={selectedTagId ?? ''}
          onChange={(event) => setSelectedTagId(Number(event.target.value))}
        >
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </S.Select>

        <S.Select
          value={selectedMenuId}
          onChange={(event) => setSelectedMenuId(event.target.value)}
          disabled={!selectedTagId || menusLoading}
        >
          <option value="">선택해주세요.</option>
          {availableMenus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </S.Select>

        <S.AddButton type="button" onClick={handleAddMenu} disabled={!selectedMenuId}>
          +
        </S.AddButton>
      </S.AddRow>

      {menuItems.length > 0 ? (
        <S.MenuList>
          {menuItems.map((menu) => {
            return (
              <S.MenuCard key={menu.key}>
                <S.MenuCardHeader>
                  <S.MenuTitleWrap>
                    <S.MenuTitle>
                      {menu.tagName ? `${menu.tagName} > ${menu.menuName}` : menu.menuName}
                    </S.MenuTitle>
                    {menu.tagName ? <S.MenuSubTitle>{menu.tagName}</S.MenuSubTitle> : null}
                  </S.MenuTitleWrap>
                  <S.MenuPrice>{formatPrice(menu.price)}</S.MenuPrice>
                  <S.RemoveButton type="button" onClick={() => handleRemoveMenu(menu.key)}>
                    ×
                  </S.RemoveButton>
                </S.MenuCardHeader>

                <S.MenuInputs>
                  <MenuInputFields
                    shopId={shopId}
                    menuId={menu.menuId}
                    values={menu.inputValues}
                    onChange={(fieldId, value) => handleMenuInputChange(menu.key, fieldId, value)}
                  />
                </S.MenuInputs>
              </S.MenuCard>
            );
          })}
        </S.MenuList>
      ) : (
        <S.EmptyState>접수된 메뉴가 없습니다. 위에서 메뉴를 추가해 주세요.</S.EmptyState>
      )}
    </S.Editor>
  );
}
