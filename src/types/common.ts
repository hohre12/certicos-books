type TMeta = {
  total_count: number;
  pageable_count: number;
  is_end: boolean;
};

export type TListResponse<T> = {
  meta: TMeta;
  documents: T[];
};
