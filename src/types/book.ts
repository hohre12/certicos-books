export type TBookListSort = 'accuracy' | 'latest';
export type TBookListTarget = 'title' | 'person' | 'publisher';

export type TBookListRequest = {
  query: string; // 검색어
  sort?: TBookListSort; // 정렬 방식
  page?: number; // 페이지 번호
  size?: number; // 문서 수
  target?: TBookListTarget; // 검색 필드
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
