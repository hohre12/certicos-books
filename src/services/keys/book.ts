import { TBookListRequest } from '@/types/book';

const MAINKEY = ['bookList'];

const bookList = {
  list: (params: TBookListRequest) => [...MAINKEY, ...Object.values(params)],
};

export default bookList;
