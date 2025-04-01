import { useInfiniteQuery } from '@tanstack/react-query';
import axiosInstance from './api';
import { TBook, TBookListRequest } from '@/types/book';
import { TListResponse } from '@/types/common';
import bookList from './keys/book';

export const getBookList = async (
  params: TBookListRequest,
): Promise<TListResponse<TBook>> => {
  const { data } = await axiosInstance.get('/search/book', {
    params,
  });
  return data;
};

export const useGetBookList = (params: TBookListRequest) => {
  return useInfiniteQuery({
    queryKey: bookList.list(params),
    queryFn: ({ pageParam = 1 }) => getBookList({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      if (params.size && lastPage.documents.length >= params.size) {
        const currentPage = allPages.flatMap(
          (page) => page.documents.length,
        ).length;
        return currentPage + 1;
      }
    },
    initialPageParam: 1,
    enabled: !!params.query,
  });
};
