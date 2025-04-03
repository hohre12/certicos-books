import styled from 'styled-components';
import variables from '@/styles/variables';
import { useGetBookList } from '@/services/book';
import SearchBox from '@/components/searchBox/SearchBox';
import { useCallback, useEffect, useRef, useState } from 'react';
import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/svgIcon/SvgIcon';
import TableItem from '@/components/tableItem/TableItem';
import { debounce } from 'lodash';
import DetailSearchPopup from './components/detailSearchPopup/DetailSearchPopup';
import { TBookListTarget } from '@/types/book';
import { ErrorWrapper, LoadingWrapper, NoListWrapper } from '@/styles/common';

const BookList = () => {
  const [openIsbns, setOpenIsbns] = useState<string[]>([]);
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [detailSearchText, setDetailSearchText] = useState<string>('');
  const [isDetailSearchPopup, setIsDetailSearchPopup] =
    useState<boolean>(false);
  const listWrapperRef = useRef<HTMLDivElement | null>(null);
  const [searchTarget, setSearchTarget] = useState<TBookListTarget>('title');
  const { data, isLoading, error, fetchNextPage } = useGetBookList({
    query: searchText,
    sort: 'accuracy',
    size: 10,
    target: searchTarget,
  });
  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
      setDetailSearchText('');
      setSearchTarget('title');
      setIsDetailSearchPopup(false);
      setOpenIsbns([]);
    },
    [setSearchText],
  );
  const handleSearchTextDelete = useCallback(() => {
    setSearchText('');
    setDetailSearchText('');
    setSearchTarget('title');
    setIsDetailSearchPopup(false);
    setOpenIsbns([]);
  }, [setSearchText]);

  const handleDetailSearch = useCallback(
    (searchValue: string, searchTarget: TBookListTarget) => {
      setText('');
      setDetailSearchText(searchValue);
      setSearchText(searchValue);
      setSearchTarget(searchTarget);
      setIsDetailSearchPopup(false);
      setOpenIsbns([]);
    },
    [setSearchText, setSearchTarget],
  );

  const handleExpandCollapse = (isbn: string) => {
    setOpenIsbns((prev) =>
      prev.includes(isbn) ? prev.filter((i) => i !== isbn) : [...prev, isbn],
    );
  };

  const handleScroll = debounce(() => {
    if (listWrapperRef.current) {
      const { scrollTop, clientHeight, scrollHeight } = listWrapperRef.current;

      if (scrollTop + clientHeight >= scrollHeight) {
        fetchNextPage();
      }
    }
  }, 300);

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

  const list = data?.pages.flatMap((page) => page.documents) ?? [];

  if (isLoading)
    return (
      <LoadingWrapper>
        <div className="loading"></div>
      </LoadingWrapper>
    );
  if (error)
    return (
      <ErrorWrapper>
        <span className="error">{error.message}</span>
      </ErrorWrapper>
    );

  return (
    <BookListWrapper>
      <TitleWrapper>도서 검색</TitleWrapper>
      <SearchBoxWrapper>
        <SearchBox
          value={text}
          placeholder="검색어를 입력하세요"
          onTextChange={(text) => setText(text)}
          onRemoveClick={handleSearchTextDelete}
          onKeyDown={handleSearch}
          onRecentClick={handleSearch}
          recentKey="recentBook"
        ></SearchBox>
        <ButtonWrapper>
          <Button
            width={72}
            height={36}
            size="small"
            onClick={() => setIsDetailSearchPopup(!isDetailSearchPopup)}
          >
            상세검색
          </Button>
          {isDetailSearchPopup && (
            <DetailSearchPopup
              searchText={detailSearchText}
              searchTarget={searchTarget}
              handleDetailSearch={handleDetailSearch}
              onClose={() => setIsDetailSearchPopup(false)}
            ></DetailSearchPopup>
          )}
        </ButtonWrapper>
      </SearchBoxWrapper>
      <ListContent>
        <ListInfo>
          <p>도서 검색 결과</p>
          <span>
            총 <b>{list.length ?? 0}</b>건
          </span>
        </ListInfo>
        {list.length > 0 ? (
          <TableWrapper ref={listWrapperRef}>
            {list.map((book, idx) => (
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
            <span>검색된 결과가 없습니다.</span>
          </NoListWrapper>
        )}
      </ListContent>
    </BookListWrapper>
  );
};

export default BookList;

const BookListWrapper = styled.div`
  padding: 100px 500px 0;
  height: calc(100% - 80px);
`;

const TitleWrapper = styled.div`
  ${variables['Title2']}
`;

const SearchBoxWrapper = styled.div`
  margin-top: 28px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  position: relative;
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
