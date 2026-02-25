import * as S from './CountStepper.styles';

const MIN = 1;
const MAX = 10;

export default function CountStepper({ count = MIN, onChange }) {
  const handleMinus = (e) => {
    e.stopPropagation();
    onChange(Math.max(MIN, count - 1));
  };

  const handlePlus = (e) => {
    e.stopPropagation();
    onChange(Math.min(MAX, count + 1));
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
