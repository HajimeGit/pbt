import axios, { AxiosRequestConfig } from 'axios';
import storage from './storage';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config?.requiresAuth) {
      const user = storage.getUser();

      if (user?.access_token) {
        config.headers.Authorization = `Bearer ${user.access_token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const axiosClient = async <T>(
  method: string,
  url: string,
  data?: any,
  config: AxiosRequestConfig = {}
) => {
  const response = await axiosInstance.request<T>({
    method,
    url,
    data,
    ...config,
  });

  return response.data;
};
