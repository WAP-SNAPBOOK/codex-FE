import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import theme from '../../styles/theme';
import ConfirmDialog from './ConfirmDialog';
import { registerConfirmHandler, registerToastHandler } from '../../utils/appFeedback';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const timerRef = useRef(null);

  const dismissToast = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setToast(null);
  }, []);

  const showToast = useCallback(
    (message, options = {}) => {
      if (!message) return;

      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      const nextToast = {
        id: Date.now(),
        message,
        tone: options.tone || 'neutral',
      };
      setToast(nextToast);
      timerRef.current = window.setTimeout(dismissToast, options.duration || 2600);
    },
    [dismissToast]
  );

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    []
  );

  useEffect(() => registerToastHandler(showToast), [showToast]);

  useEffect(
    () =>
      registerConfirmHandler(
        (options) =>
          new Promise((resolve) => {
            setConfirmation({
              title: options?.title || '확인이 필요해요',
              description: options?.description,
              confirmLabel: options?.confirmLabel || '확인',
              cancelLabel: options?.cancelLabel || '취소',
              tone: options?.tone || 'default',
              resolve,
            });
          })
      ),
    []
  );

  const closeConfirmation = (confirmed) => {
    confirmation?.resolve(confirmed);
    setConfirmation(null);
  };

  return (
    <ToastContext.Provider value={{ showToast, dismissToast }}>
      {children}
      <ToastViewport aria-live="polite" aria-atomic="true">
        {toast ? (
          <ToastCard
            key={toast.id}
            $tone={toast.tone}
            role={toast.tone === 'error' ? 'alert' : 'status'}
          >
            <ToastMessage>{toast.message}</ToastMessage>
            <ToastClose type="button" aria-label="알림 닫기" onClick={dismissToast}>
              ×
            </ToastClose>
          </ToastCard>
        ) : null}
      </ToastViewport>
      <ConfirmDialog
        open={!!confirmation}
        title={confirmation?.title}
        description={confirmation?.description}
        confirmLabel={confirmation?.confirmLabel}
        cancelLabel={confirmation?.cancelLabel}
        tone={confirmation?.tone}
        onCancel={() => closeConfirmation(false)}
        onConfirm={() => closeConfirmation(true)}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast는 ToastProvider 안에서 사용해야 합니다.');
  }
  return context;
}

const enter = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const getToastTone = (tone) => theme.colors.status[tone] || theme.colors.status.neutral;

const ToastViewport = styled.div`
  position: fixed;
  bottom: calc(90px + env(safe-area-inset-bottom));
  left: 50%;
  z-index: 120;
  width: min(calc(100% - 40px), 420px);
  transform: translateX(-50%);
  pointer-events: none;
`;

const ToastCard = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  gap: 12px;
  padding: 10px 10px 10px 15px;
  border: 1px solid ${({ $tone }) => getToastTone($tone).background};
  border-radius: ${theme.radius.md};
  background: ${theme.colors.text.primary};
  color: ${theme.colors.text.inverse};
  box-shadow: ${theme.shadow.floating};
  pointer-events: auto;
  animation: ${enter} 0.18s ease-out both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ToastMessage = styled.span`
  min-width: 0;
  flex: 1;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
`;

const ToastClose = styled.button`
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  border: 0;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-size: 20px;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 1px;
  }
`;
