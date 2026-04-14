import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthRedirectPage from './pages/redirect/AuthRedirectPage';
import SignupGatePage from './pages/signup/SignupGatePage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/login/LoginPage';
import GlobalStyle from './styles/GlobalStyled';
import CustomerSignupPage from './pages/signup/CustomerSignupPage';
import OwnerSignupPage from './pages/signup/owner/OwnerSignupPage';
import HomePage from './pages/home/HomePage';
import { useAuth } from './context/AuthContext';
import ChatListPage from './pages/chat/ChatListPage';
import ChatRoomPage from './pages/chat/ChatRoomPage';
import Mypage from './pages/profile/Mypage';
import OwnerReservationList from './pages/OwnerReservation/ownerReservationList';
import CustomerReservationList from './pages/CustomerReservation/CustomerReservationList';
import LinkRedirectPage from './pages/redirect/LinkRedirectPage';
import ReservationCreatePage from './pages/CustomerReservation/ReservationCreatePage';
import { blockZoom } from './utils/gesture/zoomBlocker';
const queryClient = new QueryClient();

function App() {
  // 줌 차단
  useEffect(() => {
    const cleanup = blockZoom();
    return cleanup;
  }, []);

  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes /> {/* AuthProvider 내부로 분리 */}
          </BrowserRouter>
        </AuthProvider>

        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      </QueryClientProvider>
    </>
  );
}

function AppRoutes() {
  const { auth } = useAuth();
  return (
    <Routes>
      {/* 로그인 여부에 따라 분기 */}
      <Route path="/" element={auth ? <HomePage /> : <LoginPage />} />
      <Route path="/auth" element={<AuthRedirectPage />} />
      {/* 인스타 링크 리다이렉트 */}
      <Route path="/s/:slugOrCode" element={<LinkRedirectPage />} />
      <Route path="/signup" element={<SignupGatePage />} />
      <Route path="/signup/customer" element={<CustomerSignupPage />} />
      <Route path="/signup/owner" element={<OwnerSignupPage />} />
      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <ChatListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat/:chatRoomId"
        element={
          <ProtectedRoute>
            <ChatRoomPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shops/:shopId/reservations/create"
        element={
          <ProtectedRoute>
            <ReservationCreatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reservations"
        element={
          <ProtectedRoute>
            <ReservationRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mypage"
        element={
          <ProtectedRoute>
            <Mypage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function ProtectedRoute({ children }) {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function ReservationRoute() {
  const { auth } = useAuth();

  return auth.userType === 'CUSTOMER' ? <CustomerReservationList /> : <OwnerReservationList />;
}

export default App;
