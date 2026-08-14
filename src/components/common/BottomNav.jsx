import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import theme from '../../styles/theme';
import { BaseButton } from './Button';

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3.5 10.5 12 3.7l8.5 6.8v8.7a1.3 1.3 0 0 1-1.3 1.3H4.8a1.3 1.3 0 0 1-1.3-1.3z" />
    <path d="M9.2 20.5v-6.2h5.6v6.2" />
  </svg>
);

const ReservationIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
    <path d="M7.5 3.5v4M16.5 3.5v4M3.5 9.5h17M7.5 13h3M7.5 16.5h6" />
  </svg>
);

const ChatIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.5 11.4a8 8 0 0 1-8.3 7.7 9.4 9.4 0 0 1-3.2-.6l-4.6 1.6 1.5-4a7.3 7.3 0 0 1-1.4-4.3 8 8 0 0 1 8.3-7.7 8 8 0 0 1 7.7 7.3Z" />
    <path d="M8.5 11.7h.1M12.4 11.7h.1M16.3 11.7h.1" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.5-4 3-6 7-6s6.5 2 7 6" />
  </svg>
);

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  //바텀 메뉴 내용 배열
  const tabs = [
    { path: '/', label: '홈', icon: HomeIcon },
    { path: '/reservations', label: '예약', icon: ReservationIcon },
    { path: '/chat', label: '채팅', icon: ChatIcon },
    { path: '/mypage', label: '마이', icon: UserIcon },
  ];

  return (
    <NavContainer aria-label="주요 메뉴">
      {tabs.map(({ path, label, icon: Icon }) => {
        //현재 경로로 현재 활성화된 페이지 구별
        const active =
          path === '/' ? location.pathname === path : location.pathname.startsWith(path);
        return (
          <TabButton
            key={path}
            type="button"
            $active={active}
            aria-current={active ? 'page' : undefined}
            aria-label={label}
            onClick={() => navigate(path)}
          >
            <Icon />
            <span>{label}</span>
          </TabButton>
        );
      })}
    </NavContainer>
  );
}

const NavContainer = styled.nav`
  position: fixed;
  bottom: max(12px, env(safe-area-inset-bottom));
  left: 50%;
  z-index: 20;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  width: min(calc(100% - 32px), 360px);
  min-height: 64px;
  padding: 6px;
  background: white;
  border: 1px solid #e3e4e7;
  border-radius: 22px;
  box-shadow: 0 8px 28px rgba(17, 24, 39, 0.12);
`;

export const TabButton = styled(BaseButton).attrs({
  $column: true, // 아이콘 + 텍스트 세로 정렬
  $gap: '2px',
  $padding: '0',
  $radius: '0',
})`
  flex: 1;
  min-width: 0;
  min-height: 50px;
  border-radius: 16px;
  background: transparent;
  color: ${({ $active }) =>
    $active ? theme.colors.black.DEFAULT : theme.colors.gray.dark.DEFAULT};

  svg {
    width: 21px;
    height: 21px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  span {
    font-size: 11px;
    font-weight: ${({ $active }) => ($active ? 800 : 600)};
  }

  &:active {
    background: #f7f7f8;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: -2px;
  }
`;
