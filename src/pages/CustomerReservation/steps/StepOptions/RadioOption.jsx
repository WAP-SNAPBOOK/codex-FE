import RadioToggle from './RadioToggle';
import * as S from './RadioOption.styles';

export default function RadioOption({
  label,
  options,
  value,
  onChange,
  variant = 'large', //버튼 크기, 'large' | 'toggle'
  layout = 'horizontal', //배치 방향 기준, 기본은 옆 배치 vertical | horizontal
  withCount = false, // 숫자 선택 UI 추가 여부
  countValue,
  onCountChange,
  maxCount = 10,
}) {
  const isYes = value === options[0]; // 유 선택 여부

  return (
    <S.Wrapper>
      <S.TopRow $layout={layout}>
        <S.Label>{label}</S.Label>

        {/*토글, 일반 버튼 분기 */}
        {variant === 'toggle' ? (
          <RadioToggle value={value} onChange={onChange} />
        ) : (
          <S.ButtonGroup $variant={variant}>
            {options.map((opt) => (
              <S.RadioButton
                key={opt}
                $variant={variant}
                $active={value === opt}
                onClick={() => onChange(opt)}
              >
                {opt}
              </S.RadioButton>
            ))}
          </S.ButtonGroup>
        )}
      </S.TopRow>
      {/*extYn, wrapYn 유 일때 숫자 선택 영역*/}
      {withCount && isYes && (
        <S.CountCard>
          <S.CountLabel>갯수 입력</S.CountLabel>
          <S.CountControl>
            <S.CircleButton
              onClick={() => onCountChange(String(Math.max(1, Number(countValue || 1) - 1)))}
            >
              −
            </S.CircleButton>

            <S.CountNumber>{countValue || 1}</S.CountNumber>

            <S.CircleButton
              $primary
              onClick={() => onCountChange(String(Math.min(maxCount, Number(countValue || 1) + 1)))}
            >
              +
            </S.CircleButton>
          </S.CountControl>
        </S.CountCard>
      )}
    </S.Wrapper>
  );
}
