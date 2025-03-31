import { useQuery } from '@tanstack/react-query';
import axiosInstance from './api';
import { TBook, TBookListRequest } from '@/types/book';
import { TListResponse } from '@/types/common';

export const getBookList = async (
  params: TBookListRequest,
): Promise<TListResponse<TBook>> => {
  const { data } = await axiosInstance.get('/search/book', {
    params,
  });
  return data;
};

export const useGetBookList = (params: TBookListRequest) => {
  return useQuery({
    queryKey: ['bookList'],
    queryFn: () => getBookList(params),
  });
};
