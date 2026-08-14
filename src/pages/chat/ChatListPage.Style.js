import styled from 'styled-components';
import { PageShell } from '../../components/common/PageLayout';

export const PageWrapper = styled(PageShell)``;

export const RoomList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px calc(108px + env(safe-area-inset-bottom));

  @media (max-width: 360px) {
    padding-right: 16px;
    padding-left: 16px;
  }
`;
