import styled from 'styled-components';
import theme from '../../styles/theme';
import { BaseButton } from '../../components/common/Button';

export const ChatIconButton = styled(BaseButton).attrs({
  $height: '40px',
  $radius: '9999px',
})`
  width: 40px;
  padding: 0px;
  background-color: ${theme.colors.primary};
  color: white;

  img {
    width: 20px;
    height: 20px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const AddButton = styled(ChatIconButton)`
  margin-right: 10px;
`;

export const ChatButton = styled(ChatIconButton)`
  margin-left: 10px;
`;
