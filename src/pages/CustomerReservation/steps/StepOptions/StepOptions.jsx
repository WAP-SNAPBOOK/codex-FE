import { useEffect, useState } from 'react';
import RadioOption from './RadioOption';
import * as S from '../steps.styles';

export default function StepOptions({ initialData, onChange }) {
  const [values, setValues] = useState({
    removeYn: '유',
    handFootYn: '손',
    extYn: '무',
    extCount: '',
    wrapYn: '무',
    wrapCount: '',
  });

  // 초기값 주입 (뒤로가기 복원)
  useEffect(() => {
    if (initialData) {
      setValues((v) => ({ ...v, ...initialData }));
    }
  }, [initialData]);

  const updateField = (key, value) => {
    const next = { ...values, [key]: value };
    setValues(next); //로컬 state 갱신
    onChange({ options: next }); // 부모 상태 갱신
  };

  return (
    <>
      <S.SectionHeading>
        상세 예약 내용을
        <br />
        만들어주세요
      </S.SectionHeading>
      {/* 제거 유무 */}
      <RadioOption
        label="제거 유무"
        options={['유', '무']}
        value={values.removeYn}
        onChange={(v) => updateField('removeYn', v)}
        layout="vertical"
        variant="large"
      />

      {/* 시술 부위 */}
      <RadioOption
        label="시술 부위"
        options={['손', '발']}
        value={values.handFootYn}
        onChange={(v) => updateField('handFootYn', v)}
        layout="vertical"
        variant="large"
      />

      {/* 연장 */}
      <RadioOption
        label="연장"
        options={['유', '무']}
        value={values.extYn}
        onChange={(v) => {
          const next = {
            ...values,
            extYn: v,
            extCount: v === '무' ? '' : values.extCount,
          };
          setValues(next);
          onChange({ options: next });
        }}
        variant="toggle"
        withCount
        countValue={values.extCount}
        onCountChange={(v) => updateField('extCount', v)}
      />

      {/* 래핑 */}
      <RadioOption
        label="래핑"
        options={['유', '무']}
        value={values.wrapYn}
        onChange={(v) => {
          const next = {
            ...values,
            wrapYn: v,
            wrapCount: v === '무' ? '' : values.wrapCount,
          };
          setValues(next);
          onChange({ options: next });
        }}
        withCount
        variant="toggle"
        countValue={values.wrapCount}
        onCountChange={(v) => updateField('wrapCount', v)}
      />
    </>
  );
}
