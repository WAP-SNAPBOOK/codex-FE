import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '../src/context/AuthContext';
import { authStorage } from '../src/utils/auth/authStorage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const withAppProviders = (Story, context) => {
  const auth =
    context.parameters.auth ?? {
      userId: 1,
      userType: 'CUSTOMER',
      name: 'Storybook User',
      phoneNumber: '010-0000-0000',
    };

  authStorage.save(auth);

  return React.createElement(
    QueryClientProvider,
    { client: queryClient },
    React.createElement(AuthProvider, null, React.createElement(Story))
  );
};

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  decorators: [withAppProviders],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
