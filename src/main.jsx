import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App.jsx';
import './index.css';

async function bootstrap() {
  if (import.meta.env.DEV) {
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
    onNeedRefresh() {
      if (confirm('새 버전이 있습니다. 새로고침할까요?')) {
        window.location.reload();
      }
    },
    onOfflineReady() {
      console.log('이제 오프라인에서도 사용 가능합니다!');
    },
  });
}
