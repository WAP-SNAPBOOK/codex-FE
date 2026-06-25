import styled from 'styled-components';
import theme from '@/styles/theme';

export const Editor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const AddRow = styled.div`
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) 44px;
  gap: 8px;
  align-items: center;
`;

const fieldControl = `
  width: 100%;
  min-width: 0;
  height: 42px;
  padding: 0 12px;
  border: 1px solid #d9dde3;
  border-radius: 10px;
  background: #fff;
  color: #222;
  font: inherit;
  font-size: 13px;
  font-weight: 700;
  outline: none;
`;

export const Select = styled.select`
  ${fieldControl}
`;

export const AddButton = styled.button`
  width: 44px;
  height: 42px;
  border: 0;
  border-radius: 10px;
  background: ${theme.colors.primary};
  color: #fff;
  font-size: 20px;
  font-weight: 800;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MenuCard = styled.div`
  padding: 12px 12px 10px;
  border: 1px solid #eceff2;
  border-radius: 14px;
  background: #fff;
`;

export const MenuCardHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto 32px;
  gap: 8px;
  align-items: center;
`;

export const MenuTitleWrap = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const MenuTitle = styled.div`
  min-width: 0;
  color: #222;
  font-size: 14px;
  font-weight: 800;
  overflow-wrap: anywhere;
`;

export const MenuSubTitle = styled.div`
  color: #8a8f98;
  font-size: 11px;
  font-weight: 600;
`;

export const MenuPrice = styled.div`
  flex: 0 0 auto;
  color: #222;
  font-size: 13px;
  font-weight: 800;
  white-space: nowrap;
`;

export const RemoveButton = styled.button`
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 999px;
  background: #f4f5f7;
  color: #7b818a;
  font-size: 18px;
  font-weight: 700;
`;

export const MenuInputs = styled.div`
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eef0f2;
`;

export const EmptyState = styled.div`
  padding: 16px 12px;
  border: 1px dashed #dfe3e8;
  border-radius: 12px;
  color: #8a8f98;
  font-size: 13px;
  text-align: center;
`;
