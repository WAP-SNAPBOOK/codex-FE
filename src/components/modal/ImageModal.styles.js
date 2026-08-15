import styled, { keyframes } from 'styled-components';

/* 확대 애니메이션 */
const zoomIn = keyframes`
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 9999;
`;

export const ImageWrapper = styled.div`
  position: relative;
  animation: ${zoomIn} 0.35s ease-out;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  display: inline-flex;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.68);
  color: #fff;
  font-size: 24px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
  }
`;

export const Image = styled.img`
  max-width: 90vw;
  max-height: 85vh;

  border-radius: 12px;
  object-fit: contain;

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;
