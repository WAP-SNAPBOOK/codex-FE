import styled from 'styled-components';
import { BaseButton } from '@/components/common/Button';
import theme from '@/styles/theme';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 420px;
`;

export const CategoryScroller = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 54px;
  margin: 0 -24px 18px;
  padding: 4px 24px 12px;
  overflow-x: auto;
  border-bottom: 1px solid #eaebec;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  height: 40px;
  padding: 0 14px;
  border: 1px solid ${({ $selected }) => ($selected ? theme.colors.primary : '#e1e2e4')};
  border-radius: 999px;
  background: ${({ $selected }) => ($selected ? theme.colors.primary : '#fff')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#000')};
  font-size: 14px;
  font-weight: 800;
  white-space: nowrap;
`;

export const AddCategoryButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 40px;
  height: 40px;
  border: 1px solid #e1e2e4;
  border-radius: 50%;
  background: #fff;
  color: #000;
  font-size: 24px;
  font-weight: 300;
  line-height: 1;
`;

export const CategoryActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 38px;
`;

export const CategoryTitle = styled.h2`
  margin: 0;
  color: #000;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.3;
  overflow-wrap: anywhere;
`;

export const TextButton = styled.button`
  flex: 0 0 auto;
  min-width: 44px;
  height: 34px;
  padding: 0 8px;
  border: 0;
  border-radius: 10px;
  background: #f7f7f9;
  color: #8a8a8e;
  font-size: 13px;
  font-weight: 800;
`;

export const DangerButton = styled(TextButton)`
  background: transparent;
  color: #e94949;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;

export const MenuRow = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 86px;
  padding: 18px 0;
  border-bottom: 1px solid #eaebec;
`;

export const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex: 1;
  min-width: 0;
`;

export const MenuName = styled.h3`
  margin: 0;
  min-width: 0;
  color: #000;
  font-size: 16px;
  font-weight: 900;
  line-height: 1.3;
  overflow-wrap: anywhere;
`;

export const MenuDescription = styled.p`
  margin: 0;
  color: #8a8a8e;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.45;
  overflow-wrap: anywhere;
`;

export const MenuPrice = styled.span`
  color: #000;
  font-size: 14px;
  font-weight: 900;
  line-height: 1.35;
`;

export const MenuActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  flex: 0 0 auto;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 38px 0 30px;
  color: #8a8a8e;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.45;

  strong {
    color: #000;
    font-size: 16px;
    font-weight: 900;
  }
`;

export const AddMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  min-height: 62px;
  margin-top: 4px;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #eaebec;
  background: #fff;
  color: #000;
  text-align: left;

  span {
    color: #000;
    font-size: 15px;
    font-weight: 900;
  }
`;

export const AddMenuIcon = styled.span`
  position: relative;
  display: block;
  flex: 0 0 auto;
  width: 24px;
  height: 24px;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 14px;
    height: 2px;
    border-radius: 999px;
    background: ${theme.colors.primary};
    transform: translate(-50%, -50%);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 18px;
  background: rgba(0, 0, 0, 0.38);
`;

export const Modal = styled.div`
  width: min(100%, 420px);
  padding: 22px 20px 20px;
  border-radius: 20px;
  background: #fff;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 18px;
  color: #000;
  font-size: 18px;
  font-weight: 900;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldLabel = styled.span`
  color: #000;
  font-size: 14px;
  font-weight: 900;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid #e1e2e4;
  border-radius: 12px;
  background: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 700;

  &::placeholder {
    color: #8a8a8e;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 13px 14px;
  border: 1px solid #e1e2e4;
  border-radius: 12px;
  background: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.45;
  resize: none;

  &::placeholder {
    color: #8a8a8e;
  }
`;

export const CategoryPicker = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 138px;
  padding: 2px 0;
  overflow-y: auto;
`;

export const CategoryOptionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ $selected }) => ($selected ? theme.colors.primary : '#e1e2e4')};
  border-radius: 999px;
  background: ${({ $selected }) => ($selected ? theme.colors.primary : '#fff')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#000')};
  font-size: 14px;
  font-weight: 800;
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #e94949;
  font-size: 13px;
  font-weight: 800;
`;

export const DeleteCategoryButton = styled(BaseButton).attrs({
  $height: '44px',
  $radius: '12px',
})`
  margin-top: 2px;
  background: #fff;
  color: #e94949;
  border: 1px solid #f1c9c9;
`;

export const ModalActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 10px;
`;

export const CancelButton = styled(BaseButton).attrs({
  $height: '48px',
  $radius: '12px',
})`
  background: #f7f7f9;
  color: #000;
`;

export const SaveButton = styled(BaseButton).attrs({
  $height: '48px',
  $radius: '12px',
})`
  background: ${theme.colors.primary};
  color: #fff;
`;
