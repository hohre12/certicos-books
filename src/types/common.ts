type TMeta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
};

export type TListResponse<T> = {
  meta: TMeta;
  documents: T[];
};

export type TDropdownOptionsProps = {
  id?: any;
  value?: any;
  name?: any;
};

export type TVariant =
  | 'primary'
  | 'red'
  | 'gray'
  | 'lightGray'
  | 'white'
  | 'black';
