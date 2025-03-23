import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import getQueryClient from '../query_client/query_client';

const sendHttp = async ({
  endpoint,
  method = 'GET',
  body = null,
  headers = {},
}) => {
  try {
    const response = await axios({
      url: `http://localhost:3000${endpoint}`,
      method,
      data: body,
      headers,
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const useLogin = () =>
  useMutation({
    mutationFn: (body) => {
      return sendHttp({
        endpoint: '/api/login',
        method: 'POST',
        body,
      });
    },
  });

export const useSignup = () =>
  useMutation({
    mutationFn: (body) =>
      sendHttp({
        endpoint: `/api/signup`,
        body: body,
        method: 'POST',
      }),
  });

export const useGetItem = (query) => {
  return useQuery({
    queryKey: ['item'],
    queryFn: async () => {
      console.log(query);
      // return await sendHttp({
      //   endpoint: `/api/items?${query}`,
      //   method: 'GET',
      // });
      return [
        {
          id: '1',
          price: 19,
          badgeList: ['mozakhraf'],
          expire: '2 days',
          isFollowed: false,
          image: 'https://thispersondoesnotexist.com/',
          isLiked: true,
          title: 'ashghal',
          userImage: 'https://thispersondoesnotexist.com/',
          userName: 'haghir',
        },
      ];
    },
  });
};

export const useAddItem = () =>
  useMutation({
    mutationFn: (body) => {
      console.log(body);
      return sendHttp({
        endpoint: '/api/items/',
        method: 'POST',
        body,
      });
    },
  });

export const useGetItembyId = (id) =>
  useQuery({
    queryKey: ['itemById'],
    queryFn: () =>
      sendHttp({
        endpoint: `/api/items/${id}`,
        method: 'GET',
      }),
  });

export const useLikeItem = () =>
  useMutation({
    mutationFn: (body) =>
      sendHttp({
        endpoint: '/api/items/like',
        method: 'POST',
        body: body,
      }),
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries(['itemById']);
    },
  });

export const useBidOnItem = () =>
  useMutation({
    mutationFn: (body) =>
      sendHttp({
        endpoint: '/api/items/bid',
        method: 'POST',
        body,
      }),
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries(['itemById']);
    },
  });

export const useDashboardData = (userId) =>
  useQuery({
    queryKey: ['dashboard'],
    queryFn: () =>
      sendHttp({
        endpoint: `/api/items/dashboard/${userId}`,
        method: 'GET',
      }),
  });

export const useDeleteItem = () =>
  useMutation({
    mutationFn: (id) =>
      sendHttp({
        endpoint: `/api/items/${id}`,
        method: 'DELETE',
      }),
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries(['dashboard']);
    },
  });

export const useGetChat = (id) =>
  useQuery({
    queryKey: ['chat'],
    queryFn: () =>
      sendHttp({
        endpoint: `/api/chat/${id}`,
        method: 'GET',
      }),
  });

export const usePostChat = (id) =>
  useMutation({
    mutationFn: (body) =>
      sendHttp({
        endpoint: `/api/chat/${id}`,
        method: 'POST',
        body,
      }),
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries(['chat']);
    },
  });

export const useSearchItem = (text) =>
  useQuery({
    enabled: false,
    queryKey: ['search'],
    queryFn: () => {
      console.log(text);
      return sendHttp({
        endpoint: `/api/item/search?searchQuery=${text}`,
        method: 'GET',
      });
    },
  });

// export const usePageRelation = () =>
//   useMutation({
//     mutationFn: (body) => {
//       return sendHttp({
//         endpoint: '/api/v1/page-relation',
//         method: 'PUT',
//         headers: getHeaders(),
//         body,
//       });
//     },
//   });

export default sendHttp;
