import { useState } from 'react';
import * as S from './StepMenuSetup.styles';

const DEFAULT_FORM = { tagName: '', menuName: '', description: '' };

export default function StepMenuSetup({ initialData, onChange }) {
  const [items, setItems] = useState(initialData.items ?? []);
  const [form, setForm] = useState(DEFAULT_FORM);

  const addItem = () => {
    if (!form.tagName.trim() || !form.menuName.trim() || !form.description.trim()) {
      alert('카테고리와 메뉴명, 메뉴 설명을 입력해주세요.');
      return;
    }
    const next = [...items, { ...form }];
    setItems(next);
    onChange({ items: next });
    setForm((f) => ({ ...f, menuName: '', description: '' }));
  };

  const removeItem = (idx) => {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    onChange({ items: next });
  };

  return (
    <div className="w-full mb-[30px]">
      <S.SectionTitle>메뉴 추가</S.SectionTitle>

      <S.Input
        placeholder="카테고리"
        value={form.tagName}
        maxLength={10}
        onChange={(e) => setForm((f) => ({ ...f, tagName: e.target.value }))}
      />
      <S.Input
        placeholder="메뉴명"
        value={form.menuName}
        maxLength={10}
        onChange={(e) => setForm((f) => ({ ...f, menuName: e.target.value }))}
      />
      <S.Input
        placeholder="설명"
        value={form.description}
        maxLength={25}
        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
      />

      <S.AddButton type="button" onClick={addItem}>
        + 메뉴 추가
      </S.AddButton>

      {items.length > 0 && (
        <S.MenuList>
          {items.map((item, i) => (
            <S.MenuItem key={i}>
              <div>
                <S.TagBadge>{item.tagName}</S.TagBadge>
                <S.MenuName>{item.menuName}</S.MenuName>
                {item.description && <S.Description>{item.description}</S.Description>}
              </div>
              <S.RemoveButton type="button" onClick={() => removeItem(i)}>
                ×
              </S.RemoveButton>
            </S.MenuItem>
          ))}
        </S.MenuList>
      )}
    </div>
  );
}
