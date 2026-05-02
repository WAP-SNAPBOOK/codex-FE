import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/common/BottomNav';
import Container from '@/components/common/Container';
import Header from '@/components/common/Header';
import BackIcon from '@/assets/icons/back-icon.svg';
import EditPencilIcon from '@/assets/icons/edit-pencil-icon.svg';
import { useAuth } from '@/context/AuthContext';
import { useShopLink } from '@/query/linkQueries';
import {
  useCreateShopMenu,
  useDeactivateShopMenu,
  useLinkMenuTag,
  useShopManageMenus,
  useUnlinkMenuTag,
  useUpdateShopMenu,
} from '@/query/shopManage/menuQueries';
import {
  useCreateShopTag,
  useDeleteShopTag,
  useShopManageTags,
  useUpdateShopTag,
} from '@/query/shopManage/tagQueries';
import * as S from './OwnerMenuManagePage.styles';

const CATEGORY_NAME_MAX_LENGTH = 10;
const MENU_NAME_MAX_LENGTH = 30;
const MENU_DESCRIPTION_MAX_LENGTH = 80;

const EMPTY_MENU_FORM = {
  name: '',
  description: '',
  tagIds: [],
};

const getErrorCode = (error) => error?.response?.data?.code;
const getMenuTagIds = (menu = {}) =>
  Array.isArray(menu.tags) ? menu.tags.map((tag) => Number(tag.id)).filter(Boolean) : [];

const getUniqueIds = (ids) => [...new Set(ids.map(Number).filter(Boolean))];

export default function OwnerMenuManagePage() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const isOwner = auth?.userType === 'OWNER';

  const {
    data: shopLink,
    isLoading: isShopLinkLoading,
    isError: isShopLinkError,
  } = useShopLink({ enabled: isOwner });
  const shopId = shopLink?.shopId ?? null;

  const { data: tags = [], isLoading: isTagsLoading } = useShopManageTags(shopId);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const selectedTag = tags.find((tag) => tag.id === selectedTagId) ?? null;

  const { data: menus = [], isLoading: isMenusLoading } = useShopManageMenus(
    shopId,
    selectedTagId
  );

  const [categoryModal, setCategoryModal] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [menuModal, setMenuModal] = useState(null);
  const [menuForm, setMenuForm] = useState(EMPTY_MENU_FORM);
  const [menuError, setMenuError] = useState('');

  const handleCategoryMutationError = (error) => {
    if (getErrorCode(error) === 'SHOP_TAG_ALREADY_EXISTS') {
      setCategoryError('이미 존재하는 카테고리입니다.');
      return;
    }
    setCategoryError('카테고리 저장 중 오류가 발생했습니다.');
  };

  const createTag = useCreateShopTag({ onError: handleCategoryMutationError });
  const updateTag = useUpdateShopTag({ onError: handleCategoryMutationError });
  const deleteTag = useDeleteShopTag({
    onError: () => {
      alert('카테고리 삭제 중 오류가 발생했습니다.');
    },
  });
  const createMenu = useCreateShopMenu({ onError: () => {} });
  const updateMenu = useUpdateShopMenu({ silent: true, onError: () => {} });
  const deactivateMenu = useDeactivateShopMenu({ silent: true, onError: () => {} });
  const linkMenuTag = useLinkMenuTag({ onError: () => {} });
  const unlinkMenuTag = useUnlinkMenuTag({ silent: true, onError: () => {} });

  const isMutating =
    createTag.isPending ||
    updateTag.isPending ||
    deleteTag.isPending ||
    createMenu.isPending ||
    updateMenu.isPending ||
    deactivateMenu.isPending ||
    linkMenuTag.isPending ||
    unlinkMenuTag.isPending;

  const nextSortOrder = useMemo(() => {
    if (menus.length === 0) return 0;
    return Math.max(...menus.map((menu) => Number(menu.sortOrder) || 0)) + 1;
  }, [menus]);

  useEffect(() => {
    if (!selectedTagId && tags.length > 0) {
      setSelectedTagId(tags[0].id);
      return;
    }

    if (selectedTagId && tags.length > 0 && !tags.some((tag) => tag.id === selectedTagId)) {
      setSelectedTagId(tags[0].id);
      return;
    }

    if (tags.length === 0) {
      setSelectedTagId(null);
    }
  }, [selectedTagId, tags]);

  const openCreateCategory = () => {
    setCategoryModal('create');
    setCategoryName('');
    setCategoryError('');
  };

  const openEditCategory = (tag = selectedTag) => {
    if (!tag) return;
    setSelectedTagId(tag.id);
    setCategoryModal('edit');
    setCategoryName(tag.name);
    setCategoryError('');
  };

  const closeCategoryModal = () => {
    setCategoryModal(null);
    setCategoryName('');
    setCategoryError('');
  };

  const submitCategory = async (event) => {
    event.preventDefault();
    const name = categoryName.trim();

    if (!shopId || !name) {
      setCategoryError('카테고리명을 입력해주세요.');
      return;
    }

    const hasSameName = tags.some(
      (tag) => tag.name === name && (categoryModal !== 'edit' || tag.id !== selectedTagId)
    );
    if (hasSameName) {
      setCategoryError('이미 존재하는 카테고리입니다.');
      return;
    }

    try {
      if (categoryModal === 'create') {
        const created = await createTag.mutateAsync({ shopId, name });
        setSelectedTagId(created.id);
      } else if (categoryModal === 'edit' && selectedTagId) {
        await updateTag.mutateAsync({ shopId, tagId: selectedTagId, name });
      }
      closeCategoryModal();
    } catch {
      // Error message is set by mutation onError.
    }
  };

  const deleteSelectedCategory = async () => {
    if (!shopId || !selectedTag) return;
    const confirmed = window.confirm(
      `'${selectedTag.name}' 카테고리를 삭제할까요? 연결된 메뉴와의 카테고리 연결도 해제됩니다.`
    );
    if (!confirmed) return;

    try {
      await deleteTag.mutateAsync({ shopId, tagId: selectedTag.id });
      setSelectedTagId(null);
      closeCategoryModal();
      setIsEditing(false);
    } catch {
      // Alert is handled by mutation onError.
    }
  };

  const handleTagClick = (tag) => {
    setSelectedTagId(tag.id);
  };

  const openCreateMenu = () => {
    if (!selectedTagId) {
      alert('메뉴를 추가할 카테고리를 먼저 만들어주세요.');
      return;
    }
    setMenuModal({ mode: 'create', menu: null });
    setMenuForm({ ...EMPTY_MENU_FORM, tagIds: [selectedTagId] });
    setMenuError('');
  };

  const openEditMenu = (menu) => {
    const menuTagIds = getMenuTagIds(menu);
    setMenuModal({ mode: 'edit', menu });
    setMenuForm({
      name: menu.name ?? '',
      description: menu.description ?? '',
      tagIds: menuTagIds.length > 0 ? menuTagIds : selectedTagId ? [selectedTagId] : [],
    });
    setMenuError('');
  };

  const closeMenuModal = () => {
    setMenuModal(null);
    setMenuForm(EMPTY_MENU_FORM);
    setMenuError('');
  };

  const toggleMenuCategory = (tagId) => {
    setMenuForm((prev) => {
      const currentTagIds = getUniqueIds(prev.tagIds);
      const hasTag = currentTagIds.includes(tagId);

      return {
        ...prev,
        tagIds: hasTag
          ? currentTagIds.filter((currentTagId) => currentTagId !== tagId)
          : [...currentTagIds, tagId],
      };
    });
    setMenuError('');
  };

  const submitMenu = async (event) => {
    event.preventDefault();
    const name = menuForm.name.trim();
    const description = menuForm.description.trim();
    const nextTagIds = getUniqueIds(menuForm.tagIds);

    if (!shopId || !name || !description || nextTagIds.length === 0) {
      setMenuError('카테고리, 메뉴명, 메뉴 설명을 모두 입력해주세요.');
      return;
    }

    try {
      if (menuModal?.mode === 'create') {
        const created = await createMenu.mutateAsync({
          shopId,
          name,
          description,
          sortOrder: nextSortOrder,
        });

        for (const tagId of nextTagIds) {
          await linkMenuTag.mutateAsync({ shopId, menuId: created.id, shopTagId: tagId });
        }

        setSelectedTagId(nextTagIds[0]);
      }

      if (menuModal?.mode === 'edit' && menuModal.menu) {
        await updateMenu.mutateAsync({
          shopId,
          menuId: menuModal.menu.id,
          name,
          description,
          sortOrder: menuModal.menu.sortOrder,
        });

        const previousTagIds = getUniqueIds(getMenuTagIds(menuModal.menu));
        const tagIdsToLink = nextTagIds.filter((tagId) => !previousTagIds.includes(tagId));
        const tagIdsToUnlink = previousTagIds.filter((tagId) => !nextTagIds.includes(tagId));

        for (const tagId of tagIdsToLink) {
          await linkMenuTag.mutateAsync({
            shopId,
            menuId: menuModal.menu.id,
            shopTagId: tagId,
          });
        }

        for (const tagId of tagIdsToUnlink) {
          await unlinkMenuTag.mutateAsync({
            shopId,
            menuId: menuModal.menu.id,
            shopTagId: tagId,
          });
        }

        if (!nextTagIds.includes(selectedTagId)) {
          setSelectedTagId(nextTagIds[0]);
        }
      }

      closeMenuModal();
    } catch (error) {
      if (error?.response?.status === 409) {
        setMenuError('동일한 이름의 메뉴가 이미 존재합니다.');
        return;
      }
      setMenuError('메뉴 저장 중 오류가 발생했습니다.');
    }
  };

  const hideMenu = async (menu) => {
    if (!shopId) return;
    const confirmed = window.confirm(
      `'${menu.name}' 메뉴를 삭제할까요? 예약 화면에서 더 이상 보이지 않습니다.`
    );
    if (!confirmed) return;

    try {
      await deactivateMenu.mutateAsync({ shopId, menuId: menu.id });
    } catch {
      alert('메뉴 삭제 중 오류가 발생했습니다.');
    }
  };

  if (!isOwner) {
    return (
      <Container $start $padding="23px 0">
        <S.PageWrapper>
          <Header title="메뉴" />
          <S.StateMessage>점주 계정만 메뉴를 관리할 수 있습니다.</S.StateMessage>
          <BottomNav />
        </S.PageWrapper>
      </Container>
    );
  }

  return (
    <Container $start $padding="23px 0">
      <S.PageWrapper>
        <Header title="메뉴" />
        <S.Content>
          <S.TopActions>
            <S.BackButton type="button" aria-label="마이페이지로 돌아가기" onClick={() => navigate('/mypage')}>
              <img src={BackIcon} alt="" />
            </S.BackButton>
            <S.PrimaryTextButton
              type="button"
              onClick={() => setIsEditing((prev) => !prev)}
              disabled={tags.length === 0}
            >
              {isEditing ? '완료' : '편집'}
            </S.PrimaryTextButton>
          </S.TopActions>

          {isShopLinkLoading && <S.StateMessage>매장 정보를 불러오는 중입니다.</S.StateMessage>}
          {isShopLinkError && (
            <S.StateMessage>매장 정보를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.</S.StateMessage>
          )}
          {!isShopLinkLoading && !isShopLinkError && !shopId && (
            <S.StateMessage>메뉴를 관리할 매장 정보가 없습니다.</S.StateMessage>
          )}

          {shopId && (
            <>
              <S.TagScroller aria-label="카테고리 필터" $editing={isEditing}>
                {isTagsLoading ? (
                  <S.TagStatus>카테고리 로딩 중</S.TagStatus>
                ) : (
                  tags.map((tag) => (
                    <S.TagButtonWrapper key={tag.id}>
                      {isEditing && (
                        <S.TagEditButton
                          type="button"
                          aria-label={`${tag.name} 카테고리 편집`}
                          onClick={() => openEditCategory(tag)}
                        >
                          <img src={EditPencilIcon} alt="" />
                        </S.TagEditButton>
                      )}
                      <S.TagButton
                        type="button"
                        $selected={selectedTagId === tag.id}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag.name}
                      </S.TagButton>
                    </S.TagButtonWrapper>
                  ))
                )}
                {isEditing && (
                  <S.AddTagButton type="button" aria-label="카테고리 추가" onClick={openCreateCategory}>
                    +
                  </S.AddTagButton>
                )}
              </S.TagScroller>

              {!isTagsLoading && tags.length === 0 && (
                <S.EmptyState>
                  <strong>아직 카테고리가 없습니다.</strong>
                  <span>카테고리를 먼저 추가한 뒤 메뉴를 등록해주세요.</span>
                </S.EmptyState>
              )}

              {selectedTagId && (
                <S.MenuList>
                  {isMenusLoading && <S.StateMessage>메뉴를 불러오는 중입니다.</S.StateMessage>}
                  {!isMenusLoading && menus.length === 0 && (
                    <S.EmptyState>
                      <strong>등록된 메뉴가 없습니다.</strong>
                      <span>이 카테고리에 노출할 메뉴를 추가해주세요.</span>
                    </S.EmptyState>
                  )}
                  {!isMenusLoading &&
                    menus.map((menu) => (
                      <S.MenuRow key={menu.id}>
                        <S.MenuInfo>
                          <S.MenuName>{menu.name}</S.MenuName>
                          <S.MenuDescription>{menu.description || '설명 없음'}</S.MenuDescription>
                          {Array.isArray(menu.tags) && menu.tags.length > 0 && (
                            <S.MenuTagList>
                              {menu.tags.map((tag) => (
                                <S.MenuTagBadge key={tag.id}>{tag.name}</S.MenuTagBadge>
                              ))}
                            </S.MenuTagList>
                          )}
                        </S.MenuInfo>
                        {isEditing && (
                          <S.MenuActions>
                            <S.SecondaryButton type="button" onClick={() => openEditMenu(menu)}>
                              수정
                            </S.SecondaryButton>
                            <S.GhostDangerButton type="button" onClick={() => hideMenu(menu)}>
                              삭제
                            </S.GhostDangerButton>
                          </S.MenuActions>
                        )}
                      </S.MenuRow>
                    ))}
                  {!isMenusLoading && (
                    <S.AddMenuInlineButton
                      type="button"
                      aria-label={`${selectedTag?.name ?? '선택한 카테고리'} 메뉴 추가`}
                      onClick={openCreateMenu}
                    >
                      <S.AddMenuIcon aria-hidden="true" />
                      <S.AddMenuText>
                        <S.AddMenuTitle>새 메뉴 추가</S.AddMenuTitle>
                      </S.AddMenuText>
                    </S.AddMenuInlineButton>
                  )}
                </S.MenuList>
              )}
            </>
          )}
        </S.Content>
        <BottomNav />
      </S.PageWrapper>

      {categoryModal && (
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
              {categoryModal === 'edit' && (
                <S.DeleteCategoryButton
                  type="button"
                  onClick={deleteSelectedCategory}
                  disabled={isMutating}
                >
                  카테고리 삭제
                </S.DeleteCategoryButton>
              )}
              <S.ModalActions>
                <S.CancelButton type="button" onClick={closeCategoryModal}>
                  취소
                </S.CancelButton>
                <S.SaveButton type="submit" disabled={isMutating}>
                  저장
                </S.SaveButton>
              </S.ModalActions>
            </S.Form>
          </S.Modal>
        </S.ModalOverlay>
      )}

      {menuModal && (
        <S.ModalOverlay role="presentation">
          <S.Modal role="dialog" aria-modal="true" aria-label="메뉴 관리">
            <S.ModalTitle>{menuModal.mode === 'create' ? '메뉴 추가' : '메뉴 수정'}</S.ModalTitle>
            <S.Form onSubmit={submitMenu}>
              <S.FieldLabel>카테고리</S.FieldLabel>
              <S.CategoryPicker>
                {tags.map((tag) => (
                  <S.CategoryOptionButton
                    key={tag.id}
                    type="button"
                    $selected={menuForm.tagIds.includes(tag.id)}
                    onClick={() => toggleMenuCategory(tag.id)}
                  >
                    {tag.name}
                    <S.CategoryCheckMark>{menuForm.tagIds.includes(tag.id) ? '✓' : ''}</S.CategoryCheckMark>
                  </S.CategoryOptionButton>
                ))}
              </S.CategoryPicker>
              <S.Input
                value={menuForm.name}
                maxLength={MENU_NAME_MAX_LENGTH}
                placeholder="메뉴명"
                onChange={(event) =>
                  setMenuForm((prev) => ({ ...prev, name: event.target.value }))
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
              {menuError && <S.ErrorText>{menuError}</S.ErrorText>}
              <S.ModalActions>
                <S.CancelButton type="button" onClick={closeMenuModal}>
                  취소
                </S.CancelButton>
                <S.SaveButton type="submit" disabled={isMutating}>
                  저장
                </S.SaveButton>
              </S.ModalActions>
            </S.Form>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </Container>
  );
}
