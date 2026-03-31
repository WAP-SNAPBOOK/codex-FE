import { useState } from 'react';
import * as S from './StepMenuSetup.styles';
import MenuItemCard from './MenuItemCard';

const DEFAULT_FORM = { tagName: '', menuName: '', description: '' };

export default function StepMenuSetup({ initialData, onChange }) {
  const [items, setItems] = useState(initialData.items ?? []);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [expandedIdx, setExpandedIdx] = useState(null);

  const addItem = () => {
    if (!form.tagName.trim() || !form.menuName.trim() || !form.description.trim()) {
      alert('카테고리와 메뉴명, 메뉴 설명을 입력해주세요.');
      return;
    }
    const next = [...items, { ...form, inputFields: [] }];
    setItems(next);
    onChange({ items: next });
    setForm((f) => ({ ...f, menuName: '', description: '' }));
  };

  const removeItem = (idx) => {
    const next = items.filter((_, i) => i !== idx);
    setItems(next);
    onChange({ items: next });
    if (expandedIdx === idx) setExpandedIdx(null);
  };

  const addInputField = (menuIdx, field) => {
    const next = items.map((item, i) =>
      i === menuIdx ? { ...item, inputFields: [...item.inputFields, field] } : item
    );
    setItems(next);
    onChange({ items: next });
  };

  const removeInputField = (menuIdx, fieldIdx) => {
    const next = items.map((item, i) =>
      i === menuIdx
        ? { ...item, inputFields: item.inputFields.filter((_, fi) => fi !== fieldIdx) }
        : item
    );
    setItems(next);
    onChange({ items: next });
  };

  const handleToggle = (idx) => setExpandedIdx((prev) => (prev === idx ? null : idx));

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
            <MenuItemCard
              key={i}
              item={item}
              idx={i}
              isExpanded={expandedIdx === i}
              onToggle={handleToggle}
              onRemove={removeItem}
              onAddField={addInputField}
              onRemoveField={removeInputField}
            />
          ))}
        </S.MenuList>
      )}
    </div>
  );
}
