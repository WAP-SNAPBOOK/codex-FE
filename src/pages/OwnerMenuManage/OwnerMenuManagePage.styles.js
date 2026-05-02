import styled from 'styled-components';
import { BaseButton } from '@/components/common/Button';
import theme from '@/styles/theme';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background: ${theme.colors.white};
`;

export const Content = styled.main`
  flex: 1;
  padding: 14px 20px 110px;
`;

export const TopActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 42px;
  margin-bottom: 16px;
`;

export const BackButton = styled(BaseButton).attrs({
  $height: '36px',
  $padding: '0',
})`
  width: 36px;
  background: transparent;
  color: ${theme.colors.black.DEFAULT};

  img {
    width: 23px;
    height: 23px;
  }
`;

export const PrimaryTextButton = styled(BaseButton).attrs({
  $height: '36px',
  $padding: '0',
})`
  background: transparent;
  color: ${theme.colors.primary};
  font-size: 15px;
  font-weight: 800;
`;

export const TagScroller = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  min-height: 42px;
  margin: 0 -20px;
  padding: 12px 20px 16px;
  overflow-x: auto;
  border-bottom: 1px solid #e1e2e4;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TagButtonWrapper = styled.div`
  position: relative;
  flex: 0 0 auto;
`;

export const TagEditButton = styled.button`
  position: absolute;
  top: -10px;
  right: -2px;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 2px solid #fff;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: #fff;

  img {
    width: 12px;
    height: 12px;
    display: block;
  }
`;

export const TagStatus = styled.span`
  display: inline-flex;
  align-items: center;
  height: 42px;
  color: #8a8a8e;
  font-size: 14px;
  white-space: nowrap;
`;

export const TagButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  height: 42px;
  padding: 0 14px;
  border: 1px solid ${({ $selected }) => ($selected ? theme.colors.primary : '#e1e2e4')};
  border-radius: 999px;
  background: ${({ $selected }) => ($selected ? theme.colors.primary : '#fff')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#000')};
  font-size: 15px;
  font-weight: 600;
  white-space: nowrap;
`;

export const AddTagButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  border: 1px solid #e1e2e4;
  border-radius: 50%;
  background: #fff;
  color: #000;
  font-size: 26px;
  font-weight: 300;
  line-height: 1;
`;

export const ToolButtons = styled.div`
  display: flex;
  gap: 8px;
  flex: 0 0 auto;
`;

export const SecondaryButton = styled(BaseButton).attrs({
  $height: '36px',
  $padding: '0 12px',
  $radius: '10px',
})`
  background: #f7f7f9;
  color: #8a8a8e;
  font-size: 14px;
  font-weight: 800;
`;

export const DangerButton = styled(SecondaryButton)`
  color: #e94949;
`;

export const GhostDangerButton = styled(BaseButton).attrs({
  $height: '36px',
  $padding: '0 4px',
})`
  background: transparent;
  color: #e94949;
  font-size: 13px;
  font-weight: 800;
`;

export const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4px;
`;

export const AddMenuInlineButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  width: 100%;
  min-height: 64px;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #eaebec;
  background: #fff;
  color: #000;
  text-align: left;
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

export const AddMenuText = styled.span`
  display: inline-flex;
  align-items: center;
  min-width: 0;
  height: 24px;
`;

export const AddMenuTitle = styled.span`
  color: #000;
  font-size: 15px;
  font-weight: 800;
  line-height: 24px;
`;

export const MenuRow = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 84px;
  padding: 20px 0;
  border-bottom: 1px solid #eaebec;
`;

export const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

export const MenuName = styled.h3`
  margin: 0;
  color: #000;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.3;
  overflow-wrap: anywhere;
`;

export const MenuDescription = styled.p`
  margin: 0;
  color: #8a8a8e;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.45;
  overflow-wrap: anywhere;
`;

export const MenuTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
`;

export const MenuTagBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 9px;
  border-radius: 999px;
  background: #f7f7f9;
  color: #5d5d5d;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
`;

export const MenuActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
`;

export const StateMessage = styled.p`
  margin: 24px 20px 0;
  color: #8a8a8e;
  font-size: 14px;
  line-height: 1.5;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 44px 0;
  color: #8a8a8e;
  text-align: center;
  font-size: 14px;
  line-height: 1.45;

  strong {
    color: #000;
    font-size: 16px;
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
  font-weight: 800;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FieldLabel = styled.span`
  color: #000;
  font-size: 14px;
  font-weight: 800;
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
  gap: 8px;
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid ${({ $selected }) => ($selected ? '#000' : '#e1e2e4')};
  border-radius: 999px;
  background: ${({ $selected }) => ($selected ? '#000' : '#fff')};
  color: ${({ $selected }) => ($selected ? '#fff' : '#000')};
  font-size: 14px;
  font-weight: 700;
`;

export const CategoryCheckMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  font-size: 11px;
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
  font-weight: 600;

  &::placeholder {
    color: #8a8a8e;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid #e1e2e4;
  border-radius: 12px;
  background: #fff;
  color: #000;
  font-size: 15px;
  font-weight: 600;
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
  font-weight: 600;
  line-height: 1.45;
  resize: none;

  &::placeholder {
    color: #8a8a8e;
  }
`;

export const ErrorText = styled.p`
  margin: 0;
  color: #e94949;
  font-size: 13px;
  font-weight: 700;
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
  background: #000;
  color: #fff;
`;
