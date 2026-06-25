import styled from 'styled-components';
import theme from '@/styles/theme';

export const Page = styled.main`
  min-height: 100vh;
  background: #fff;
  color: #242424;
`;

export const Content = styled.section`
  width: min(100%, 430px);
  min-height: 100vh;
  margin: 0 auto;
  padding: 0 18px calc(112px + env(safe-area-inset-bottom));
`;

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 36px 1fr 36px;
  align-items: center;
  min-height: calc(58px + env(safe-area-inset-top));
  margin: 0 -18px 18px;
  padding: env(safe-area-inset-top) 18px 0;
  border-bottom: 1px solid #f2f2f2;
  background: rgba(255, 255, 255, 0.96);
`;

export const BackButton = styled.button`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  background: transparent;

  img {
    width: 23px;
    height: 23px;
  }
`;

export const HeaderSpacer = styled.span`
  width: 36px;
`;

export const Title = styled.h1`
  margin: 0;
  text-align: center;
  font-size: 18px;
  font-weight: 800;
`;

export const EmptyState = styled.div`
  padding: 84px 24px;
  color: #8a8a8e;
  text-align: center;
  font-size: 14px;
`;

export const CustomerCard = styled.section`
  position: relative;
  display: grid;
  gap: 8px;
  padding: 20px;
  border: 1px solid #f0dede;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0 3px 14px rgba(75, 54, 54, 0.08);
`;

export const CustomerName = styled.strong`
  padding-right: 90px;
  font-size: 16px;
  font-weight: 800;
`;

export const CustomerPhone = styled.span`
  color: #555;
  font-size: 15px;
`;

export const StatusPill = styled.span`
  position: absolute;
  top: 18px;
  right: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 66px;
  height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: ${({ $status }) => ($status === 'CONFIRMED' ? '#ffe5e5' : '#f0f1f3')};
  color: ${({ $status }) => ($status === 'CONFIRMED' ? theme.colors.primary : '#666')};
  font-size: 12px;
  font-weight: 800;
`;

export const Section = styled.section`
  margin-top: 24px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0 10px;
  color: #333;
  font-size: 15px;
  font-weight: 800;
`;

export const DateTimeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const InfoBox = styled.div`
  display: flex;
  align-items: center;
  min-height: 46px;
  padding: 0 14px;
  border-radius: 10px;
  background: #f8f8f9;
  color: #444;
  font-size: 14px;
  font-weight: 700;
`;

export const MenuList = styled.div`
  display: grid;
  gap: 8px;
`;

export const MenuRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 46px;
  padding: 0 14px;
  border-radius: 10px;
  background: #f8f8f9;
  color: #444;
  font-size: 13px;

  strong {
    flex: 0 0 auto;
    color: #222;
  }
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 14px;
  font-size: 14px;
`;

export const DetailKey = styled.span`
  color: #555;
  font-weight: 700;
`;

export const DetailValue = styled.span`
  min-width: 0;
  text-align: right;
  font-weight: 800;
  overflow-wrap: anywhere;
`;

export const TotalBox = styled.div`
  margin-top: 10px;
  padding: 14px 2px 0;
  border-top: 1px solid #ededed;
`;

const fieldControl = `
  width: 100%;
  border: 1px solid #dddfe3;
  border-radius: 10px;
  background: #fff;
  color: #222;
  font: inherit;
  font-size: 14px;
  font-weight: 700;
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(240, 128, 128, 0.12);
  }
`;

export const Input = styled.input`
  ${fieldControl}
  height: 46px;
  padding: 0 13px;
`;

export const Select = styled.select`
  ${fieldControl}
  height: 46px;
  padding: 0 13px;
`;

export const Textarea = styled.textarea`
  ${fieldControl}
  min-height: 92px;
  padding: 12px;
  resize: vertical;
`;

export const ErrorText = styled.p`
  margin: 8px 0 0;
  color: #d33;
  font-size: 12px;
`;

export const BottomBar = styled.div`
  position: fixed;
  z-index: 20;
  bottom: 0;
  left: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: min(100%, 430px);
  padding: 12px 18px calc(12px + env(safe-area-inset-bottom));
  transform: translateX(-50%);
  border-top: 1px solid #ededed;
  background: rgba(255, 255, 255, 0.97);
`;

export const ActionButton = styled.button`
  min-height: 48px;
  border: 1px solid ${({ $primary }) => ($primary ? theme.colors.primary : '#dddfe3')};
  border-radius: 10px;
  background: ${({ $primary }) => ($primary ? theme.colors.primary : '#fff')};
  color: ${({ $primary }) => ($primary ? '#fff' : '#444')};
  font-size: 14px;
  font-weight: 800;

  &:disabled {
    opacity: 0.55;
  }
`;
