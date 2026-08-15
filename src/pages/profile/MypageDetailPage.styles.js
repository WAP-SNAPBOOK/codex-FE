import styled from 'styled-components';
import { PageContent, PageShell } from '../../components/common/PageLayout';
import { CardSurface } from '../../components/common/Surface';
import theme from '../../styles/theme';

export const Page = styled(PageShell)``;

export const Header = styled.header`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: calc(14px + env(safe-area-inset-top)) 20px 14px;
  border-bottom: 1px solid ${theme.colors.border.subtle};
  background: ${theme.colors.surface.DEFAULT};
`;

export const BackButton = styled.button`
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: -9px;
  border: 0;
  border-radius: ${theme.radius.md};
  background: transparent;
  color: ${theme.colors.text.primary};
  font-size: 30px;
  line-height: 1;
  cursor: pointer;
`;

export const HeaderText = styled.div`
  min-width: 0;
  padding-top: 5px;
`;

export const Title = styled.h1`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

export const Description = styled.p`
  margin: 6px 0 0;
  color: ${theme.colors.text.tertiary};
  font-size: 13px;
  line-height: 1.45;
`;

export const Content = styled(PageContent)`
  padding-top: 20px;
`;

export const Card = styled(CardSurface)`
  padding: 20px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const CardTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 17px;
  font-weight: 800;
`;

export const FieldList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
`;

export const FieldLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: ${theme.colors.text.secondary};
  font-size: 12px;
  font-weight: 800;
`;

export const TextInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.radius.md};
  outline: 0;
  background: ${theme.colors.surface.DEFAULT};
  color: ${theme.colors.text.primary};
  font-size: 15px;
  font-weight: 700;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.highlight[10]};
  }
`;

export const ReadOnlyRow = styled.div`
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 14px;
  padding: 0 2px;
  border-top: 1px solid ${theme.colors.border.subtle};

  span {
    color: ${theme.colors.text.tertiary};
    font-size: 12px;
  }

  strong {
    font-size: 13px;
  }
`;

export const ErrorText = styled.p`
  margin: 4px 0 0;
  color: ${theme.colors.status.error.text};
  font-size: 12px;
  line-height: 1.5;
`;

export const SaveButton = styled.button`
  width: 100%;
  min-height: 48px;
  margin-top: 14px;
  border: 0;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.primary};
  color: ${theme.colors.text.inverse};
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
`;
