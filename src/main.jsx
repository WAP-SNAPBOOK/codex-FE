import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import { requestConfirmation } from './utils/appFeedback';
import App from './App.jsx';
import './index.css';

async function clearDevServiceWorkers() {
  if (!import.meta.env.DEV || !('serviceWorker' in navigator)) return;

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((registration) => registration.unregister()));
}

async function bootstrap() {
  await clearDevServiceWorkers();

  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK !== 'false') {
    const { worker } = await import('./mocks/browser');
    await worker.start({ onUnhandledRequest: 'bypass' });
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

bootstrap();

if (!import.meta.env.DEV) {
  registerSW({
    async onNeedRefresh() {
      const confirmed = await requestConfirmation({
        title: '새 버전이 준비됐어요',
        description: '최신 버전을 적용하려면 화면을 새로고침해주세요.',
        confirmLabel: '새로고침',
      });
      if (confirmed) {
        window.location.reload();
      }
    },
    onOfflineReady() {
      console.log('이제 오프라인에서도 사용 가능합니다!');
    },
  });
}
