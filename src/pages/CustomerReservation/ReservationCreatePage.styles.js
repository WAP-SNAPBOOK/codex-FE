import styled from 'styled-components';

/* 전체 카드 */
export const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/* 헤더 */
export const Header = styled.header`
  height: 80px;
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  padding: 0 16px;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

export const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
`;

/* 진행 바 */
export const ProgressBar = styled.div`
  display: flex;
  gap: 8px;
  padding: 12px 30px 0;
`;

export const Progress = styled.div`
  position: relative;
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: #eee;
  overflow: hidden;

  /* progress 내부 Progress bar */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ $active }) => ($active ? '100%' : '0%')};
    background: #ff8a8a;
    border-radius: 999px;
    transition: width 0.4s ease;
  }
`;
/* 중앙 컨텐츠 */
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 26px;
`;

export const ErrorBox = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 14px;
  background: #fff4f4;
  color: #c04f4f;
  font-size: 14px;
  line-height: 1.5;
`;

/* 하단 버튼 영역 */
export const BottomArea = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;
