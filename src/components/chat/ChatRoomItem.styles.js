import styled from 'styled-components';
import theme from '../../styles/theme';

export const Container = styled.button`
  display: flex;
  width: 100%;
  min-height: 78px;
  align-items: center;
  padding: 14px 15px;
  border: 1px solid
    ${({ $unread }) => ($unread ? 'rgba(240, 128, 128, 0.22)' : theme.colors.border.DEFAULT)};
  border-radius: ${theme.radius.lg};
  background: ${({ $unread }) =>
    $unread ? 'rgba(240, 128, 128, 0.035)' : theme.colors.surface.DEFAULT};
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;

  &:active {
    background-color: ${theme.colors.gray[25]};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const Avatar = styled.div`
  flex: 0 0 auto;
  width: 46px;
  height: 46px;
  border-radius: 15px;
  background-color: rgba(240, 128, 128, 0.12);
  color: ${theme.colors.primary};
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoWrapper = styled.div`
  flex: 1;
  min-width: 0;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ShopName = styled.span`
  min-width: 0;
  overflow: hidden;
  font-weight: ${({ $unread }) => ($unread ? 800 : 700)};
  font-size: 15px;
  color: ${theme.colors.text.primary};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Time = styled.span`
  flex: 0 0 auto;
  margin-left: 10px;
  font-size: 12px;
  color: ${theme.colors.text.tertiary};
`;

export const LastMessage = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 13px;
  color: ${theme.colors.text.tertiary};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UnreadBadge = styled.div`
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: ${theme.radius.pill};
  background-color: ${theme.colors.highlight.DEFAULT};
  color: white;
  font-size: 12px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;
