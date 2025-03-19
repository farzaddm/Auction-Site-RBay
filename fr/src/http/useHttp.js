import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

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
