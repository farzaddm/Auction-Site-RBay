import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      onError: (error) => {
        if (error?.response?.status === 401 || error?.status === 401) {
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('pic');
        }
      },
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        if (error?.response?.status === 401 || error?.status === 401) {
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('userName');
          sessionStorage.removeItem('pic');
        }
      },
    },
  },
});

export default function getQueryClient() {
  return queryClient;
}
