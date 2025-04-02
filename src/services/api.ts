import axios, { AxiosError, AxiosResponse } from 'axios';

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onErrorResponse = (error: AxiosError): Promise<AxiosError> => {
  try {
    const { status, data } = error.response as AxiosResponse;
    console.warn(status);
    console.warn(data);
    return Promise.reject(error);
  } catch (error) {
    return Promise.reject(error);
  }
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 30000,
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_APP_API_KEY}`,
  },
});

axiosInstance.interceptors.response.use(onResponse, onErrorResponse);

export default axiosInstance;
