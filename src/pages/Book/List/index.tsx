import styled from 'styled-components';
import variables from '@/styles/variables';
import { useGetBookList } from '@/services/book';
import SearchBox from '@/components/searchBox/SearchBox';
import { useCallback, useState } from 'react';
import Button from '@/components/button/Button';
import { SvgIcon } from '@/components/svgIcon/SvgIcon';
import TableItem from './components/tableItem/TableItem';

const BookList = () => {
  const [text, setText] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const { data, isLoading, error } = useGetBookList({
    query: searchText,
  });
  const handleSearch = useCallback(
    (value: string) => {
      setSearchText(value);
    },
    [setSearchText],
  );
  const handleSearchTextDelete = useCallback(() => {
    setSearchText('');
  }, [setSearchText]);

  // TODO
  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{String(error)}</div>;

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
          recentKey="book"
        ></SearchBox>
        <Button
          width={72}
          height={36}
          size="small"
        >
          상세검색
        </Button>
      </SearchBoxWrapper>
      <ListContent>
        <ListInfo>
          <p>도서 검색 결과</p>
          <span>
            총 <b>{data?.documents?.length ?? 0}</b>건
          </span>
        </ListInfo>
        {data && data.documents.length > 0 ? (
          data.documents.map((book, idx) => (
            <TableItem
              key={idx}
              data={book}
            ></TableItem>
          ))
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

const ListContent = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 36px;
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
const NoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin: auto;
  align-items: center;
  justify-content: center;
  padding: 120px;
  & > span {
    ${variables['Caption']}
    color: ${variables['textSecondary']};
  }
`;
