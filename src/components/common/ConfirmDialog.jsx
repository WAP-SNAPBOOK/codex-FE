import { useEffect, useId, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  tone = 'default',
  onConfirm,
  onCancel,
}) {
  const titleId = useId();
  const descriptionId = useId();
  const cancelButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousActiveElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCancel();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = dialogRef.current?.querySelectorAll(
        'button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActiveElement?.focus?.();
    };
  }, [onCancel, open]);

  if (!open) return null;

  return (
    <Backdrop
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <Dialog
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
      >
        <DialogTitle id={titleId}>{title}</DialogTitle>
        {description ? (
          <DialogDescription id={descriptionId}>{description}</DialogDescription>
        ) : null}
        <DialogActions>
          <CancelButton ref={cancelButtonRef} type="button" onClick={onCancel}>
            {cancelLabel}
          </CancelButton>
          <ConfirmButton type="button" $tone={tone} onClick={onConfirm}>
            {confirmLabel}
          </ConfirmButton>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 110;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 16px;
  background: rgba(17, 24, 39, 0.42);
`;

const Dialog = styled.section`
  width: min(100%, 420px);
  padding: 22px 20px calc(20px + env(safe-area-inset-bottom));
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.surface.DEFAULT};
  box-shadow: ${theme.shadow.modal};

  @media (min-width: 600px) {
    margin: auto;
  }
`;

const DialogTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: 19px;
  font-weight: 800;
  line-height: 1.4;
`;

const DialogDescription = styled.p`
  margin: 8px 0 0;
  color: ${theme.colors.text.secondary};
  font-size: 14px;
  line-height: 1.55;
`;

const DialogActions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 22px;
`;

const DialogButton = styled.button`
  min-height: 48px;
  padding: 0 14px;
  border: 0;
  border-radius: ${theme.radius.md};
  font-size: 14px;
  font-weight: 800;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

const CancelButton = styled(DialogButton)`
  background: ${theme.colors.surface.subtle};
  color: ${theme.colors.text.secondary};
`;

const ConfirmButton = styled(DialogButton)`
  background: ${({ $tone }) =>
    $tone === 'danger' ? theme.colors.status.error.text : theme.colors.primary};
  color: ${theme.colors.text.inverse};
`;
