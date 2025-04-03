import styled from 'styled-components';
import variables from '@/styles/variables';
import { useEffect, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useRecoilValue } from 'recoil';
import { favoriteBooksState } from '@/state/favorite';
import { TBook } from '@/types/book';
import { SvgIcon } from '@/components/svgIcon/SvgIcon';
import TableItem from '@/components/tableItem/TableItem';
import { LoadingWrapper, NoListWrapper } from '@/styles/common';

const FavoriteList = () => {
  const favoriteBooks = useRecoilValue(favoriteBooksState);
  const [visibleBooks, setVisibleBooks] = useState<TBook[]>([]);
  const [openIsbns, setOpenIsbns] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const listWrapperRef = useRef<HTMLDivElement | null>(null);
  const handleExpandCollapse = (isbn: string) => {
    setOpenIsbns((prev) =>
      prev.includes(isbn) ? prev.filter((i) => i !== isbn) : [...prev, isbn],
    );
  };
  const handleScroll = debounce(() => {
    if (listWrapperRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = listWrapperRef.current;

      if (
        scrollTop + clientHeight >= scrollHeight &&
        visibleBooks.length < favoriteBooks.length
      ) {
        setPage(page + 1);
      }
    }
  }, 300);

  useEffect(() => {
    setIsLoading(true);
    const newBooks = favoriteBooks.slice(0, page * 10);
    setVisibleBooks(newBooks);
    setIsLoading(false);
  }, [favoriteBooks, page]);

  useEffect(() => {
    const wrapper = listWrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (wrapper) {
        wrapper.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  if (isLoading)
    return (
      <LoadingWrapper>
        <div className="loading"></div>
      </LoadingWrapper>
    );

  return (
    <FavoriteListWrapper>
      <TitleWrapper>내가 찜한 책</TitleWrapper>
      <ListContent>
        <ListInfo>
          <p>찜한 책</p>
          <span>
            총 <b>{favoriteBooks.length ?? 0}</b>건
          </span>
        </ListInfo>
        {visibleBooks.length > 0 ? (
          <TableWrapper ref={listWrapperRef}>
            {visibleBooks.map((book, idx) => (
              <TableItem
                key={idx}
                data={book}
                isOpen={openIsbns.includes(book.isbn)}
                onOpen={() => handleExpandCollapse(book.isbn)}
              ></TableItem>
            ))}
          </TableWrapper>
        ) : (
          <NoListWrapper>
            <SvgIcon iconName="icon-book" />
            <span>찜한 책이 없습니다.</span>
          </NoListWrapper>
        )}
      </ListContent>
    </FavoriteListWrapper>
  );
};

export default FavoriteList;

const FavoriteListWrapper = styled.div`
  padding: 100px 500px 0;
  height: calc(100% - 80px);
`;

const TitleWrapper = styled.div`
  ${variables['Title2']}
`;

const ListContent = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  height: calc(100% - 126px);
`;
const ListInfo = styled.div`
  ${variables['textPrimary']}
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  b {
    color: ${variables['palettePrimary']};
  }
`;

const TableWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;
