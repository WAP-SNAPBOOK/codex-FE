import styled from 'styled-components';
import theme from '@/styles/theme';

export const StepTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
`;

export const Field = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #eee;
  padding: 0 44px 0 16px; /* 오른쪽 아이콘 공간 확보 */
  font-size: 15px;
  background-color: #f9fafb;

  &::placeholder {
    color: #bbb;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const InputIcon = styled.div`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;
`;

/* 색션 메인 헤더*/
export const SectionHeading = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 20px;
`;

/* 날짜 선택 / 시간 선택 같은 섹션 타이틀 */
export const SectionTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 16px;
  font-weight: 600;
  margin: 28px 0 16px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 96px;
  border-radius: 12px;
  border: 1px solid #ddd;
  padding: 12px;
  resize: none;
`;

/* 오른쪽에 표시되는 선택된 날짜 */
export const SelectedDateText = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: ${theme.colors.primary};
`;
