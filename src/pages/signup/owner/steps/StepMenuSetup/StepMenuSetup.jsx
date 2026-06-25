import { useMemo, useState } from 'react';
import * as S from './StepMenuSetup.styles';

const CATEGORY_NAME_MAX_LENGTH = 10;
const MENU_NAME_MAX_LENGTH = 30;
const MENU_DESCRIPTION_MAX_LENGTH = 80;
const EMPTY_MENU_FORM = { tagName: '', menuName: '', description: '', price: '' };

const normalizePriceInput = (value) => value.replace(/[^\d]/g, '');

const getUniqueCategories = (items) => [...new Set(items.map((item) => item.tagName).filter(Boolean))];

const formatPrice = (price) => {
  const numericPrice = Number(price);
  if (!Number.isFinite(numericPrice)) return '';
  return `${numericPrice.toLocaleString('ko-KR')}원`;
};

export default function StepMenuSetup({ initialData, onChange }) {
  const [items, setItems] = useState(initialData.items ?? []);
  const [categoryNames, setCategoryNames] = useState(getUniqueCategories(initialData.items ?? []));
  const [selectedCategory, setSelectedCategory] = useState(
    getUniqueCategories(initialData.items ?? [])[0] ?? ''
  );
  const [categoryModal, setCategoryModal] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [menuModal, setMenuModal] = useState(null);
  const [menuForm, setMenuForm] = useState(EMPTY_MENU_FORM);
  const [menuError, setMenuError] = useState('');

  const categories = useMemo(
    () => [...new Set([...categoryNames, ...getUniqueCategories(items)])],
    [categoryNames, items]
  );
  const activeCategory = selectedCategory || categories[0] || '';
  const visibleItems = activeCategory
    ? items
        .map((item, index) => ({ ...item, index }))
        .filter((item) => item.tagName === activeCategory)
    : [];

  const commitItems = (nextItems) => {
    setItems(nextItems);
    onChange({ items: nextItems });
  };

  const openCreateCategory = () => {
    setCategoryModal('create');
    setCategoryName('');
    setCategoryError('');
  };

  const openEditCategory = (category = activeCategory) => {
    if (!category) return;
    setCategoryModal('edit');
    setCategoryName(category);
    setCategoryError('');
  };

  const closeCategoryModal = () => {
    setCategoryModal(null);
    setCategoryName('');
    setCategoryError('');
  };

  const submitCategory = (event) => {
    event.preventDefault();
    const name = categoryName.trim();

    if (!name) {
      setCategoryError('카테고리명을 입력해주세요.');
      return;
    }

    if (categories.some((category) => category === name && category !== selectedCategory)) {
      setCategoryError('이미 존재하는 카테고리입니다.');
      return;
    }

    if (categoryModal === 'create') {
      setCategoryNames((prev) => [...new Set([...prev, name])]);
      setSelectedCategory(name);
      closeCategoryModal();
      return;
    }

    const nextItems = items.map((item) =>
      item.tagName === activeCategory ? { ...item, tagName: name } : item
    );
    setCategoryNames((prev) =>
      prev.map((category) => (category === activeCategory ? name : category))
    );
    commitItems(nextItems);
    setSelectedCategory(name);
    closeCategoryModal();
  };

  const deleteCategory = () => {
    if (!activeCategory) return;
    const nextItems = items.filter((item) => item.tagName !== activeCategory);
    const nextCategories = categoryNames.filter((category) => category !== activeCategory);
    setCategoryNames(nextCategories);
    commitItems(nextItems);
    setSelectedCategory(nextCategories[0] ?? getUniqueCategories(nextItems)[0] ?? '');
    closeCategoryModal();
  };

  const openCreateMenu = () => {
    const category = activeCategory || categories[0] || '';

    if (!category) {
      openCreateCategory();
      return;
    }

    setMenuModal({ mode: 'create', index: null });
    setMenuForm({ ...EMPTY_MENU_FORM, tagName: category });
    setMenuError('');
  };

  const openEditMenu = (item) => {
    setMenuModal({ mode: 'edit', index: item.index });
    setMenuForm({
      tagName: item.tagName,
      menuName: item.menuName,
      description: item.description,
      price: String(item.price),
    });
    setMenuError('');
  };

  const closeMenuModal = () => {
    setMenuModal(null);
    setMenuForm(EMPTY_MENU_FORM);
    setMenuError('');
  };

  const submitMenu = (event) => {
    event.preventDefault();
    const tagName = menuForm.tagName.trim();
    const menuName = menuForm.menuName.trim();
    const description = menuForm.description.trim();
    const price = Number(menuForm.price);

    if (!tagName || !menuName || !description || menuForm.price === '') {
      setMenuError('카테고리, 메뉴명, 메뉴 설명, 가격을 모두 입력해주세요.');
      return;
    }

    if (!Number.isInteger(price) || price < 0) {
      setMenuError('가격은 0 이상의 숫자로 입력해주세요.');
      return;
    }

    const nextItem = {
      tagName,
      menuName,
      description,
      price,
      inputFields: menuModal?.mode === 'edit' ? items[menuModal.index]?.inputFields ?? [] : [],
    };

    const nextItems =
      menuModal?.mode === 'edit'
        ? items.map((item, index) => (index === menuModal.index ? nextItem : item))
        : [...items, nextItem];

    commitItems(nextItems);
    setCategoryNames((prev) => [...new Set([...prev, tagName])]);
    setSelectedCategory(tagName);
    closeMenuModal();
  };

  const removeMenu = (index) => {
    const nextItems = items.filter((_, itemIndex) => itemIndex !== index);
    commitItems(nextItems);
  };

  return (
    <S.Wrapper>
      <S.CategoryScroller>
        {categories.map((category) => (
          <S.CategoryButton
            key={category}
            type="button"
            $selected={activeCategory === category}
            onClick={() => setSelectedCategory(category)}
            onDoubleClick={() => openEditCategory(category)}
          >
            {category}
          </S.CategoryButton>
        ))}
        <S.AddCategoryButton type="button" aria-label="카테고리 추가" onClick={openCreateCategory}>
          +
        </S.AddCategoryButton>
      </S.CategoryScroller>

      {activeCategory ? (
        <S.CategoryActionRow>
          <S.CategoryTitle>{activeCategory}</S.CategoryTitle>
          <S.TextButton type="button" onClick={() => openEditCategory(activeCategory)}>
            수정
          </S.TextButton>
        </S.CategoryActionRow>
      ) : (
        <S.EmptyState>
          <strong>아직 카테고리가 없습니다.</strong>
          <span>상단의 + 버튼을 눌러 카테고리를 추가해주세요.</span>
        </S.EmptyState>
      )}

      {visibleItems.length > 0 ? (
        <S.MenuList>
          {visibleItems.map((item) => (
            <S.MenuRow key={`${item.tagName}-${item.menuName}-${item.index}`}>
              <S.MenuInfo>
                <S.MenuName>{item.menuName}</S.MenuName>
                <S.MenuDescription>{item.description}</S.MenuDescription>
                <S.MenuPrice>{formatPrice(item.price)}</S.MenuPrice>
              </S.MenuInfo>
              <S.MenuActions>
                <S.TextButton type="button" onClick={() => openEditMenu(item)}>
                  수정
                </S.TextButton>
                <S.DangerButton type="button" onClick={() => removeMenu(item.index)}>
                  삭제
                </S.DangerButton>
              </S.MenuActions>
            </S.MenuRow>
          ))}
        </S.MenuList>
      ) : activeCategory ? (
        <S.EmptyState>
          <strong>등록된 메뉴가 없습니다.</strong>
          <span>이 카테고리에 노출할 메뉴를 추가해주세요.</span>
        </S.EmptyState>
      ) : null}

      <S.AddMenuButton type="button" onClick={openCreateMenu}>
        <S.AddMenuIcon aria-hidden="true" />
        <span>새 메뉴 추가</span>
      </S.AddMenuButton>

      {categoryModal ? (
        <S.ModalOverlay role="presentation">
          <S.Modal role="dialog" aria-modal="true" aria-label="카테고리 관리">
            <S.ModalTitle>
              {categoryModal === 'create' ? '카테고리 추가' : '카테고리 수정'}
            </S.ModalTitle>
            <S.Form onSubmit={submitCategory}>
              <S.FieldLabel>카테고리명</S.FieldLabel>
              <S.Input
                value={categoryName}
                maxLength={CATEGORY_NAME_MAX_LENGTH}
                placeholder="카테고리명"
                onChange={(event) => {
                  setCategoryName(event.target.value);
                  setCategoryError('');
                }}
              />
              {categoryError && <S.ErrorText>{categoryError}</S.ErrorText>}
              {categoryModal === 'edit' ? (
                <S.DeleteCategoryButton type="button" onClick={deleteCategory}>
                  카테고리 삭제
                </S.DeleteCategoryButton>
              ) : null}
              <S.ModalActions>
                <S.CancelButton type="button" onClick={closeCategoryModal}>
                  취소
                </S.CancelButton>
                <S.SaveButton type="submit">저장</S.SaveButton>
              </S.ModalActions>
            </S.Form>
          </S.Modal>
        </S.ModalOverlay>
      ) : null}

      {menuModal ? (
        <S.ModalOverlay role="presentation">
          <S.Modal role="dialog" aria-modal="true" aria-label="메뉴 관리">
            <S.ModalTitle>{menuModal.mode === 'create' ? '메뉴 추가' : '메뉴 수정'}</S.ModalTitle>
            <S.Form onSubmit={submitMenu}>
              <S.FieldLabel>카테고리</S.FieldLabel>
              <S.CategoryPicker>
                {categories.map((category) => (
                  <S.CategoryOptionButton
                    key={category}
                    type="button"
                    $selected={menuForm.tagName === category}
                    onClick={() => setMenuForm((prev) => ({ ...prev, tagName: category }))}
                  >
                    {category}
                  </S.CategoryOptionButton>
                ))}
              </S.CategoryPicker>
              <S.Input
                value={menuForm.menuName}
                maxLength={MENU_NAME_MAX_LENGTH}
                placeholder="메뉴명"
                onChange={(event) =>
                  setMenuForm((prev) => ({ ...prev, menuName: event.target.value }))
                }
              />
              <S.Textarea
                value={menuForm.description}
                maxLength={MENU_DESCRIPTION_MAX_LENGTH}
                placeholder="메뉴 설명"
                onChange={(event) =>
                  setMenuForm((prev) => ({ ...prev, description: event.target.value }))
                }
              />
              <S.Input
                value={menuForm.price}
                inputMode="numeric"
                placeholder="가격"
                onChange={(event) =>
                  setMenuForm((prev) => ({
                    ...prev,
                    price: normalizePriceInput(event.target.value),
                  }))
                }
              />
              {menuError && <S.ErrorText>{menuError}</S.ErrorText>}
              <S.ModalActions>
                <S.CancelButton type="button" onClick={closeMenuModal}>
                  취소
                </S.CancelButton>
                <S.SaveButton type="submit">저장</S.SaveButton>
              </S.ModalActions>
            </S.Form>
          </S.Modal>
        </S.ModalOverlay>
      ) : null}
    </S.Wrapper>
  );
}
