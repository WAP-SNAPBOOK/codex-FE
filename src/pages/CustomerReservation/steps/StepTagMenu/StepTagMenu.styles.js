import styled from 'styled-components';
import theme from '@/styles/theme';

export const SectionTitle = styled.h2`
  margin: 0 0 8px;
  color: #000;
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  letter-spacing: -0.45px;
`;

export const SectionDescription = styled.p`
  margin: 0 0 22px;
  color: #8a8a8e;
  font-size: 12.25px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: -0.306px;
`;

export const ButtonGrid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  min-height: 42px;
  margin: 0 -29px 18px 0;
  padding: 12px 29px 16px 0;
  overflow-x: auto;
  border-bottom: 1px solid #e1e2e4;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const SelectButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid ${({ $selected }) => ($selected ? theme.colors.primary : '#e1e2e4')};
  background-color: ${({ $selected }) => ($selected ? theme.colors.primary : '#fff')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#000')};
  font-size: 15px;
  white-space: nowrap;
  font-weight: 600;
  cursor: pointer;
  transition:
    border-color 0.15s ease,
    background-color 0.15s ease,
    color 0.15s ease;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 390px;
  max-height: calc(100vh - 390px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

export const MenuCard = styled.div`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #eaebec;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

export const MenuSummary = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`;

export const RadioIndicator = styled.span`
  position: relative;
  flex: 0 0 24px;
  width: 24px;
  height: 24px;
  margin-top: 0;
  border: 1px solid ${({ $selected }) => ($selected ? theme.colors.primary : '#d1d3d8')};
  border-radius: 6px;
  background: ${({ $selected }) => ($selected ? theme.colors.primary : '#fff')};

  &::after {
    content: '✓';
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 15px;
    font-weight: 900;
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
    transition:
      opacity 0.15s ease;
  }
`;

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
`;

export const MenuName = styled.p`
  min-width: 0;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.3;
  letter-spacing: -0.43px;
  color: ${({ $disabled }) => ($disabled ? '#aaa' : '#000000')};
  margin: 0;
  overflow-wrap: anywhere;
`;

export const MenuPrice = styled.span`
  color: ${({ $disabled }) => ($disabled ? '#aaa' : '#000')};
  font-size: 15px;
  font-weight: 800;
  line-height: 1.35;
  white-space: nowrap;
`;

export const MenuDescription = styled.p`
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: -0.31px;
  color: ${({ $disabled }) => ($disabled ? '#ccc' : '#8a8a8e')};
  margin: 0;
  white-space: pre-line;
`;

export const MenuInputSlot = styled.div`
  margin-left: 36px;
`;
