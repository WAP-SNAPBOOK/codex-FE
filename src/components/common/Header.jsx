import styled from 'styled-components';
import theme from '../../styles/theme';
import { BaseButton } from '../common/Button';
import SettingIcon from '../../assets/icons/setting-icon.svg';

export default function Header({ title, description, showSetting = false, onSettingClick }) {
  return (
    <HeaderWrapper>
      <Heading>
        <Title>{title}</Title>
        {description ? <Description>{description}</Description> : null}
      </Heading>
      {showSetting && (
        <SettingButton type="button" aria-label="설정" onClick={onSettingClick}>
          <img src={SettingIcon} alt="" />
        </SettingButton>
      )}
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 68px;
  padding: 12px 20px;
  background-color: ${theme.colors.white};
`;

const Heading = styled.div`
  min-width: 0;
`;

const Title = styled.h1`
  margin: 0;
  color: #17181a;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const Description = styled.p`
  margin: 7px 0 0;
  color: ${theme.colors.text.tertiary};
  font-size: 14px;
  line-height: 1.5;
`;

export const SettingButton = styled(BaseButton).attrs({
  $height: '31px',
})`
  width: 31px;
  padding: 0px;
  background-color: transparent;
  color: white;
`;
