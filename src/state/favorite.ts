import { FAVORITE_BOOKS_KEY } from '@/constants/common';
import { TBook } from '@/types/book';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: FAVORITE_BOOKS_KEY,
  storage: localStorage,
});

export const favoriteBooksState = atom<TBook[]>({
  key: 'favoriteBooksState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});
