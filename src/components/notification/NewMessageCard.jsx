import React from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import { truncateByVisualLength } from '../../utils/truncateByVisualLength';

/**
 * 새 메시지 알림 카드 컴포넌트
 * @param {string} preview - 미리보기 메시지 텍스트
 * @param {Function} onClick - 클릭 시 실행할 콜백
 * @param {boolean} visible - 표시 여부
 */
export default function NewMessageCard({ preview, onClick, visible }) {
  const truncated = truncateByVisualLength(preview ?? ' ', 24);
  return (
    <Card type="button" onClick={onClick} $visible={visible} tabIndex={visible ? 0 : -1}>
      {truncated}
    </Card>
  );
}

const Card = styled.button`
  position: absolute;
  bottom: 4rem; /* Tailwind bottom-16 */
  left: 50%;
  background-color: ${theme.colors.primary};
  border: 0;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 9999px; /* rounded-full */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.15s ease-in-out;
  max-width: 80%; /* 너무 긴 문장은 강제 제한 */
  z-index: ${({ $visible }) => ($visible ? 15 : -1)}; /* 닫힐 땐 완전히 뒤로 */

  opacity: ${({ $visible }) => ($visible ? 1 : 0)};

  transform: ${({ $visible }) => ($visible ? 'translate(-50%, 0)' : 'translate(-50%, 100%)')};
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;
