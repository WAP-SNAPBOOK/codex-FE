import * as S from './RadioToggle.styles';

export default function RadioToggle({ value, onChange }) {
  const isYes = value === '유';

  return (
    <S.Toggle onClick={() => onChange(isYes ? '무' : '유')}>
      <S.Indicator $active={isYes} />
      <S.Option $active={isYes}>유</S.Option>
      <S.Option $active={!isYes}>무</S.Option>
    </S.Toggle>
  );
}
