import { useState } from 'react';
import * as S from './MenuItemCard.styles';

const DEFAULT_FIELD_FORM = {
  label: '',
  inputType: 'NUMBER',
  required: false,
  minValue: '',
  maxValue: '',
  stepValue: '',
  maxLength: '',
  placeholder: '',
};

export default function MenuItemCard({ item, idx, isExpanded, onToggle, onRemove, onAddField, onRemoveField }) {
  const [fieldForm, setFieldForm] = useState(DEFAULT_FIELD_FORM);

  const handleAdd = () => {
    if (!fieldForm.label.trim()) {
      alert('필드 라벨을 입력해주세요.');
      return;
    }
    const field = {
      label: fieldForm.label,
      inputType: fieldForm.inputType,
      required: fieldForm.required,
      placeholder: fieldForm.placeholder || null,
      sortOrder: item.inputFields.length === 0 ? 0 : Math.max(...item.inputFields.map((f) => f.sortOrder)) + 1,
      ...(fieldForm.inputType === 'NUMBER'
        ? {
            minValue: fieldForm.minValue !== '' ? Number(fieldForm.minValue) : null,
            maxValue: fieldForm.maxValue !== '' ? Number(fieldForm.maxValue) : null,
            stepValue: fieldForm.stepValue !== '' ? Number(fieldForm.stepValue) : null,
            maxLength: null,
          }
        : {
            maxLength: fieldForm.maxLength !== '' ? Number(fieldForm.maxLength) : null,
            minValue: null,
            maxValue: null,
            stepValue: null,
          }),
    };
    onAddField(idx, field);
    setFieldForm(DEFAULT_FIELD_FORM);
  };

  const handleToggle = () => {
    onToggle(idx);
    setFieldForm(DEFAULT_FIELD_FORM);
  };

  return (
    <S.MenuItem>
      <S.MenuItemContent>
        <S.MenuItemHeader>
          <div>
            <S.TagBadge>{item.tagName}</S.TagBadge>
            <S.MenuName>{item.menuName}</S.MenuName>
            {item.description && <S.Description>{item.description}</S.Description>}
          </div>
          <S.RemoveButton type="button" aria-label={`${item.menuName} 삭제`} onClick={() => onRemove(idx)}>
            ×
          </S.RemoveButton>
        </S.MenuItemHeader>

        <S.FieldToggle type="button" onClick={handleToggle}>
          입력 필드{item.inputFields.length > 0 ? ` (${item.inputFields.length})` : ''}{' '}
          {isExpanded ? '▲' : '▼'}
        </S.FieldToggle>

        {isExpanded && (
          <S.FieldSection>
            {item.inputFields.map((field, fi) => (
              <S.FieldItem key={fi}>
                <span>
                  {field.label} ({field.inputType}){field.required ? ' *' : ''}
                </span>
                <S.RemoveButton
                  type="button"
                  aria-label={`${field.label} 삭제`}
                  onClick={() => onRemoveField(idx, fi)}
                >
                  ×
                </S.RemoveButton>
              </S.FieldItem>
            ))}

            <S.SmallInput
              placeholder="라벨 (필수)"
              value={fieldForm.label}
              onChange={(e) => setFieldForm((f) => ({ ...f, label: e.target.value }))}
            />

            <S.FieldRow>
              <S.TypeButton
                type="button"
                $active={fieldForm.inputType === 'NUMBER'}
                onClick={() => setFieldForm((f) => ({ ...f, inputType: 'NUMBER' }))}
              >
                NUMBER
              </S.TypeButton>
              <S.TypeButton
                type="button"
                $active={fieldForm.inputType === 'TEXT'}
                onClick={() => setFieldForm((f) => ({ ...f, inputType: 'TEXT' }))}
              >
                TEXT
              </S.TypeButton>
              <S.RequiredLabel>
                <input
                  type="checkbox"
                  id={`required-${idx}`}
                  checked={fieldForm.required}
                  onChange={(e) => setFieldForm((f) => ({ ...f, required: e.target.checked }))}
                />
                <label htmlFor={`required-${idx}`}>필수</label>
              </S.RequiredLabel>
            </S.FieldRow>

            {fieldForm.inputType === 'NUMBER' && (
              <S.FieldRow>
                <S.SmallInput
                  type="number"
                  placeholder="최솟값"
                  value={fieldForm.minValue}
                  onChange={(e) => setFieldForm((f) => ({ ...f, minValue: e.target.value }))}
                />
                <S.SmallInput
                  type="number"
                  placeholder="최댓값"
                  value={fieldForm.maxValue}
                  onChange={(e) => setFieldForm((f) => ({ ...f, maxValue: e.target.value }))}
                />
                <S.SmallInput
                  type="number"
                  placeholder="단위"
                  value={fieldForm.stepValue}
                  onChange={(e) => setFieldForm((f) => ({ ...f, stepValue: e.target.value }))}
                />
              </S.FieldRow>
            )}

            {fieldForm.inputType === 'TEXT' && (
              <S.SmallInput
                type="number"
                placeholder="최대 글자수"
                value={fieldForm.maxLength}
                onChange={(e) => setFieldForm((f) => ({ ...f, maxLength: e.target.value }))}
              />
            )}

            <S.SmallInput
              placeholder="플레이스홀더 (선택)"
              value={fieldForm.placeholder}
              onChange={(e) => setFieldForm((f) => ({ ...f, placeholder: e.target.value }))}
            />

            <S.AddButton type="button" onClick={handleAdd}>
              + 필드 추가
            </S.AddButton>
          </S.FieldSection>
        )}
      </S.MenuItemContent>
    </S.MenuItem>
  );
}
