import styled from 'styled-components';

/* 전체 카드 */
export const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/* 헤더 */
export const Header = styled.header`
  height: 118px;
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  padding: 38px 24px 0;
`;

export const Title = styled.h1`
  text-align: center;
  color: #191e28;
  font-size: 17px;
  font-weight: 600;
  line-height: 22px;
  letter-spacing: -0.43px;
  margin: 0;
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

  img {
    max-width: 23px;
    max-height: 23px;
    display: block;
  }
`;

export const HeaderSpacer = styled.div`
  width: 32px;
  height: 32px;
`;

/* 진행 바 */
export const ProgressBar = styled.div`
  display: flex;
  gap: 15px;
  padding: 24px 29px 0;
`;

export const Progress = styled.div`
  position: relative;
  flex: 1;
  height: 5px;
  border-radius: 999px;
  background: #c4c4c7;
  overflow: hidden;

  /* progress 내부 Progress bar */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ $active }) => ($active ? '100%' : '0%')};
    background: #f08080;
    border-radius: 999px;
    transition: width 0.4s ease;
  }
`;
/* 중앙 컨텐츠 */
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px 29px 24px;

  > button:last-child {
    margin-top: 24px;
    margin-left: -5px;
    width: calc(100% + 10px);
    height: 56px;
    border-radius: 16px;
    font-size: 16px;
    font-weight: 700;
  }
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
