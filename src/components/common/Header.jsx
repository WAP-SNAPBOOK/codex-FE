import styled from 'styled-components';
import theme from '../../styles/theme';
import { BaseButton } from '../common/Button';
import SettingIcon from '../../assets/icons/setting-icon.svg';
import NotificationIcon from '../../assets/icons/notification-icon.svg';

export default function Header({
  title,
  description,
  showSetting = false,
  onSettingClick,
  showNotification = false,
  unreadNotificationCount = 0,
  onNotificationClick,
}) {
  return (
    <HeaderWrapper>
      <Heading>
        <Title>{title}</Title>
        {description ? <Description>{description}</Description> : null}
      </Heading>
      <HeaderActions>
        {showNotification && (
          <NotificationButton type="button" onClick={onNotificationClick} aria-label="알림">
            <img src={NotificationIcon} alt="" />
            {unreadNotificationCount > 0 && (
              <NotificationBadge>{Math.min(unreadNotificationCount, 99)}</NotificationBadge>
            )}
          </NotificationButton>
        )}
        {showSetting && (
          <SettingButton type="button" aria-label="설정" onClick={onSettingClick}>
            <img src={SettingIcon} alt="" />
          </SettingButton>
        )}
      </HeaderActions>
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

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const NotificationButton = styled(BaseButton).attrs({
  $height: '31px',
})`
  position: relative;
  width: 31px;
  padding: 0;
  border: 0;
  background: transparent;

  img {
    width: 23px;
    height: 23px;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 9px;
  background: ${theme.colors.primary};
  color: ${theme.colors.white};
  font-size: 11px;
  line-height: 18px;
  text-align: center;
`;

export const SettingButton = styled(BaseButton).attrs({
  $height: '31px',
})`
  width: 31px;
  padding: 0px;
  background-color: transparent;
  color: white;
`;
