import styled from 'styled-components';

const D = 12; // 화살표 깊이 (px)
const R = 8; // 모서리 반지름 (px)

export const StepBar = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 28px;
`;

// $last: 마지막 단계 (오른쪽 플랫), 그 외: 오른쪽 방향 화살표 (모두 > 방향)
// $active: 현재 단계 (색상 강조)
// $zIndex: 오버랩 우선순위
const chevronPath = ($last) =>
  $last
    ? `polygon(0 0, 100% 0, 100% 100%, 0 100%)`
    : `polygon(0 0, calc(100% - ${D}px) 0, 100% 50%, calc(100% - ${D}px) 100%, 0 100%)`;

export const StepItemWrapper = styled.div`
  flex: 1;
  position: relative;
  z-index: ${({ $zIndex }) => $zIndex};
  margin-left: ${({ $first }) => ($first ? '0' : `-${D}px`)};
  border-radius: ${({ $first, $last }) =>
    $first ? `${R}px 0 0 ${R}px` : $last ? `0 ${R}px ${R}px 0` : '0'};
  overflow: hidden;
`;

export const StepItem = styled.div`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: ${({ $active }) => ($active ? '#FF8A8A' : '#EEEEEE')};
  color: ${({ $active }) => ($active ? '#fff' : '#999')};
  font-size: 11px;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  line-height: 1.4;
  white-space: pre-line;
  text-align: center;
  transition: background 0.2s;
  clip-path: ${({ $last }) => chevronPath($last)};

  /* 비활성 단계: 흰색 내부 레이어로 테두리 효과 (z-index: -1 → 배경 아래, 텍스트 위) */
  &::before {
    content: '';
    position: absolute;
    inset: 2px;
    background: ${({ $active }) => ($active ? 'transparent' : 'white')};
    clip-path: ${({ $last }) => chevronPath($last)};
    z-index: -1;
  }
`;
