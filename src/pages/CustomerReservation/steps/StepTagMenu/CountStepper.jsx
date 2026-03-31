import * as S from './CountStepper.styles';

export default function CountStepper({ count = 1, onChange, min = 1, max = 10, step = 1 }) {
  const handleMinus = (e) => {
    e.stopPropagation();
    onChange(Math.max(min, count - step));
  };

  const handlePlus = (e) => {
    e.stopPropagation();
    onChange(Math.min(max, count + step));
  };

  return (
    <S.CountControl>
      <S.CountButton onClick={handleMinus}>−</S.CountButton>
      <S.CountNumber>{count}</S.CountNumber>
      <S.CountButton $primary onClick={handlePlus}>
        +
      </S.CountButton>
    </S.CountControl>
  );
}
