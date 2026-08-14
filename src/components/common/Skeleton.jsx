import styled, { keyframes } from 'styled-components';
import theme from '../../styles/theme';

export function ListSkeleton({ count = 3, label = '목록을 불러오는 중' }) {
  return (
    <SkeletonList role="status" aria-label={label}>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonItem key={index} aria-hidden="true">
          <SkeletonBlock $width="46px" $height="46px" $radius="15px" />
          <SkeletonText>
            <SkeletonBlock $width="42%" $height="14px" />
            <SkeletonBlock $width="72%" $height="11px" />
          </SkeletonText>
        </SkeletonItem>
      ))}
    </SkeletonList>
  );
}

const shimmer = keyframes`
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
`;

export const SkeletonBlock = styled.span`
  display: block;
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '16px'};
  flex: 0 0 auto;
  border-radius: ${({ $radius }) => $radius || theme.radius.sm};
  background: linear-gradient(90deg, #f1f2f4 25%, #e7e8eb 50%, #f1f2f4 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const SkeletonList = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonItem = styled.div`
  display: flex;
  min-height: 78px;
  align-items: center;
  padding: 14px 15px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.surface.DEFAULT};
`;

const SkeletonText = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: 9px;
  margin-left: 12px;
`;
