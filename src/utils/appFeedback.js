let toastHandler = null;
let confirmHandler = null;

export const registerToastHandler = (handler) => {
  toastHandler = handler;
  return () => {
    if (toastHandler === handler) toastHandler = null;
  };
};

export const registerConfirmHandler = (handler) => {
  confirmHandler = handler;
  return () => {
    if (confirmHandler === handler) confirmHandler = null;
  };
};

export const notify = (message, options = {}) => {
  if (!message) return;

  const inferredTone = /(완료|성공|확정|수정되었습니다|비활성화되었습니다|제거되었습니다)/.test(
    message
  )
    ? 'success'
    : /(오류|실패|못했|문제가|이미 존재|입력해주세요|선택해주세요|설정해주세요)/.test(message)
      ? 'error'
      : 'neutral';

  if (toastHandler) {
    toastHandler(message, { ...options, tone: options.tone || inferredTone });
    return;
  }

  console.warn(message);
};

export const requestConfirmation = (options) => {
  if (!confirmHandler) return Promise.resolve(false);
  return confirmHandler(options);
};
