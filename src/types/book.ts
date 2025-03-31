export type TBookListSort = 'accuracy' | 'latest';
export type TBookListTarget = 'title' | 'isbn' | 'publisher' | 'person';

export type TBookListRequest = {
  query: string;
  sort?: TBookListSort;
  page?: number;
  size?: number;
  target?: TBookListTarget;
};

export type TBook = {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
};
