import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import * as S from './ImageModal.styles';

export default function ImageModal({ src, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <S.Overlay role="dialog" aria-modal="true" aria-label="예약 이미지 크게 보기" onClick={onClose}>
      <S.ImageWrapper onClick={(e) => e.stopPropagation()}>
        <S.CloseButton
          ref={closeButtonRef}
          type="button"
          aria-label="이미지 닫기"
          onClick={onClose}
        >
          ×
        </S.CloseButton>
        <S.Image src={src} alt="예약 첨부 이미지 확대" />
      </S.ImageWrapper>
    </S.Overlay>,
    document.body
  );
}
