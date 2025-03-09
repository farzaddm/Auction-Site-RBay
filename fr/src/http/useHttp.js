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
      url: `http://localhost:3000/${endpoint}`,
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

export const useGetItem = () =>
  useQuery({
    // enabled: false,
    queryKey: ['item'],
    queryFn: (filter) =>
      sendHttp({
        endpoint: `api/profile?${filter}`,
        method: 'GET',
      }),
  });

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
        endpoint: `api/signup`,
        body: body,
        method: 'POST',
      }),
  });

export const usePageRelation = () =>
  useMutation({
    mutationFn: (body) => {
      return sendHttp({
        endpoint: '/api/v1/page-relation',
        method: 'PUT',
        headers: getHeaders(),
        body,
      });
    },
  });

export default sendHttp;
