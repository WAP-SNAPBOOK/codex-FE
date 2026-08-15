import styled from 'styled-components';
import { PageContent, PageShell } from '../../components/common/PageLayout';
import { CardSurface } from '../../components/common/Surface';
import theme from '../../styles/theme';

export const PageWrapper = styled(PageShell)``;
export const Content = styled(PageContent)`
  padding-top: 4px;
`;
export const BackButton = styled.button`
  align-self: flex-start;
  min-height: 40px;
  margin: 8px 20px -4px;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${theme.colors.text.secondary};
  font-size: 24px;
  cursor: pointer;
  span {
    margin-left: 2px;
    font-size: 13px;
    font-weight: 700;
    vertical-align: 3px;
  }
`;
export const Section = styled.section`
  margin-top: 28px;
  &:first-child {
    margin-top: 12px;
  }
`;
export const SectionHeading = styled.div`
  margin-bottom: 12px;
  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 800;
  }
  p {
    margin: 5px 0 0;
    color: ${theme.colors.text.tertiary};
    font-size: 12px;
    line-height: 1.5;
  }
`;
export const Card = styled(CardSurface)`
  padding: 16px;
`;
export const LoadingStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 12px;
`;
export const ErrorCard = styled(CardSurface)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 18px;
  strong {
    font-size: 14px;
  }
  span {
    margin-top: 6px;
    color: ${theme.colors.text.tertiary};
    font-size: 12px;
    line-height: 1.5;
  }
  button {
    min-height: 38px;
    margin-top: 12px;
    padding: 0 14px;
    border: 1px solid ${theme.colors.border.DEFAULT};
    border-radius: ${theme.radius.md};
    background: #fff;
    font-size: 12px;
    font-weight: 800;
  }
`;
export const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;

  @media (max-width: 360px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
export const OptionButton = styled.button`
  min-height: 42px;
  padding: 0 4px;
  border: 1px solid
    ${({ $active }) => ($active ? theme.colors.primary : theme.colors.border.DEFAULT)};
  border-radius: ${theme.radius.md};
  background: ${({ $active }) => ($active ? theme.colors.highlight[10] : '#fff')};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.text.secondary)};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
`;
export const PrimaryButton = styled.button`
  width: 100%;
  min-height: 46px;
  margin-top: 16px;
  border: 0;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
`;
export const PolicyList = styled.dl`
  margin: 0;
`;
export const PolicyRow = styled.div`
  display: flex;
  min-height: 48px;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${theme.colors.border.subtle};

  &:last-child {
    border-bottom: 0;
  }

  span {
    color: ${theme.colors.text.tertiary};
    font-size: 12px;
  }

  strong {
    color: ${theme.colors.text.primary};
    font-size: 13px;
    text-align: right;
  }
`;
export const PolicyNote = styled.p`
  margin: 14px 0 0;
  padding: 12px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.status.info.background};
  color: ${theme.colors.status.info.text};
  font-size: 11px;
  line-height: 1.6;
`;
export const SecondarySaveButton = styled.button`
  width: 100%;
  min-height: 44px;
  margin-top: 14px;
  border: 1px solid ${theme.colors.primary};
  border-radius: ${theme.radius.md};
  background: #fff;
  color: ${theme.colors.primary};
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
`;
export const DayList = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DayRow = styled.div`
  padding: 13px 0;
  border-bottom: 1px solid ${theme.colors.border.subtle};
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: 0;
  }
`;
export const DayTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  > span {
    color: ${theme.colors.text.tertiary};
    font-size: 12px;
    font-weight: 700;
  }
`;
export const DayToggle = styled.button`
  width: 38px;
  height: 38px;
  border: 1px solid
    ${({ $active }) => ($active ? theme.colors.primary : theme.colors.border.DEFAULT)};
  border-radius: 50%;
  background: ${({ $active }) => ($active ? theme.colors.primary : '#fff')};
  color: ${({ $active }) => ($active ? '#fff' : theme.colors.text.tertiary)};
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
`;
export const RangeRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr 30px;
  align-items: center;
  gap: 6px;
  margin-top: 9px;
  padding-left: 48px;
  input {
    min-width: 0;
    height: 40px;
    padding: 0 7px;
    border: 1px solid ${theme.colors.border.DEFAULT};
    border-radius: ${theme.radius.sm};
    background: #fff;
    color: ${theme.colors.text.primary};
    font-size: 12px;
  }
  > span {
    color: ${theme.colors.text.tertiary};
  }
  button {
    width: 30px;
    height: 30px;
    border: 0;
    background: transparent;
    color: ${theme.colors.text.tertiary};
    font-size: 20px;
    cursor: pointer;
  }

  @media (max-width: 360px) {
    padding-left: 0;
  }
`;
export const AddRangeButton = styled.button`
  margin: 8px 0 0 48px;
  padding: 4px 0;
  border: 0;
  background: transparent;
  color: ${theme.colors.primary};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;

  @media (max-width: 360px) {
    margin-left: 0;
  }
`;
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    color: ${theme.colors.text.secondary};
    font-size: 11px;
    font-weight: 700;
  }
  select,
  input {
    width: 100%;
    min-width: 0;
    height: 42px;
    padding: 0 10px;
    border: 1px solid ${theme.colors.border.DEFAULT};
    border-radius: ${theme.radius.md};
    background: #fff;
    color: ${theme.colors.text.primary};
    font-size: 12px;
  }
`;
export const HolidayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
`;
export const HolidayItem = styled.div`
  display: flex;
  min-height: 46px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 11px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.surface.subtle};
  span {
    font-size: 12px;
    font-weight: 700;
    line-height: 1.4;
  }
  button {
    flex: 0 0 auto;
    min-height: 32px;
    border: 0;
    background: transparent;
    color: ${theme.colors.status.error.text};
    font-size: 11px;
    font-weight: 800;
    cursor: pointer;
  }
`;
export const EmptyText = styled.p`
  margin: 2px 0;
  color: ${theme.colors.text.tertiary};
  font-size: 12px;
  text-align: center;
`;
export const InfoNote = styled.p`
  margin: 14px 0 0;
  padding: 10px 12px;
  border-radius: ${theme.radius.md};
  background: ${theme.colors.status.info.background};
  color: ${theme.colors.status.info.text};
  font-size: 11px;
  line-height: 1.5;
`;
export const StaffList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
export const StaffEditor = styled(CardSurface)`
  padding: 16px;
`;
export const StaffHeading = styled.div`
  strong {
    display: block;
    font-size: 15px;
  }
  span {
    display: block;
    margin-top: 4px;
    color: ${theme.colors.text.tertiary};
    font-size: 11px;
  }
`;
export const OverrideList = styled.div`
  margin-top: 14px;
`;
export const OverrideRow = styled.div`
  display: flex;
  min-height: 52px;
  align-items: center;
  gap: 9px;
  border-top: 1px solid ${theme.colors.border.subtle};
`;
export const OverrideToggle = styled.button`
  flex: 0 0 auto;
  width: 34px;
  height: 34px;
  border: 1px solid
    ${({ $active }) => ($active ? theme.colors.primary : theme.colors.border.DEFAULT)};
  border-radius: 50%;
  background: ${({ $active }) => ($active ? theme.colors.highlight[10] : '#fff')};
  color: ${({ $active }) => ($active ? theme.colors.primary : theme.colors.text.tertiary)};
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
`;
export const OverrideFields = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  gap: 7px;

  @media (max-width: 360px) {
    align-items: stretch;
    flex-direction: column;
    padding: 8px 0;
  }
`;
export const SmallSelect = styled.select`
  height: 36px;
  min-width: 76px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.radius.sm};
  background: #fff;
  font-size: 11px;

  @media (max-width: 360px) {
    width: 100%;
  }
`;
export const TimePair = styled.div`
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  gap: 4px;
  input {
    min-width: 0;
    width: 100%;
    height: 36px;
    padding: 0 4px;
    border: 1px solid ${theme.colors.border.DEFAULT};
    border-radius: ${theme.radius.sm};
    font-size: 11px;
  }
  span {
    color: ${theme.colors.text.tertiary};
  }
`;
export const InheritLabel = styled.span`
  color: ${theme.colors.text.tertiary};
  font-size: 11px;
`;
export const InlineError = styled.div`
  padding: 14px;
  border: 1px solid ${theme.colors.border.DEFAULT};
  border-radius: ${theme.radius.lg};
  color: ${theme.colors.text.secondary};
  font-size: 12px;
  button {
    margin-left: 8px;
    border: 0;
    background: transparent;
    color: ${theme.colors.primary};
    font-weight: 800;
    cursor: pointer;
  }
`;
