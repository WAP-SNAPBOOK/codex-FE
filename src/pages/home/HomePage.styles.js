import styled from 'styled-components';
import theme from '../../styles/theme';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: min(100%, 480px);
  background: #fff;
`;

export const HomeHeader = styled.header`
  display: flex;
  align-items: center;
  min-height: 68px;
  padding: 12px 20px;
`;

export const Brand = styled.h1`
  margin: 0;
  color: #17181a;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.04em;
`;

export const Content = styled.main`
  flex: 1;
  padding: 28px 20px calc(104px + env(safe-area-inset-bottom));

  @media (max-width: 360px) {
    padding-right: 16px;
    padding-left: 16px;
  }
`;

export const WelcomeSection = styled.section`
  padding: 8px 2px 34px;
`;

export const Greeting = styled.h2`
  margin: 0;
  color: #17181a;
  font-size: clamp(24px, 7vw, 30px);
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.035em;
  word-break: keep-all;
`;

export const Introduction = styled.p`
  margin: 10px 0 0;
  color: #777b84;
  font-size: 15px;
  line-height: 1.55;
  word-break: keep-all;
`;

export const ActionSection = styled.section`
  margin-top: 10px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 13px;
  color: #383b40;
  font-size: 15px;
  font-weight: 800;
`;

export const ActionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
