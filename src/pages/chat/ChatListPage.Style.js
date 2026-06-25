import styled from 'styled-components';
import { BaseButton } from '../../components/common/Button';
import theme from '../../styles/theme';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: white;
`;

export const HeaderBar = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr 36px;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid ${theme.colors.gray.DEFAULT};
`;

export const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

export const BackButton = styled(BaseButton).attrs({
  $height: '36px',
  $padding: '0px',
})`
  width: 36px;
  background: transparent;

  img {
    width: 23px;
    height: 23px;
  }
`;

export const MenuButton = styled(BaseButton).attrs({
  $height: '36px',
  $padding: '0px',
})`
  width: 36px;
  background: transparent;

  img {
    width: 24px;
    height: 24px;
  }
`;

export const RoomList = styled.div`
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
`;
