import styled from 'styled-components';
import variables from '@/styles/variables';

const BookList = () => {
  return (
    <BookListWrapper>
      <TitleWrapper>도서 검색</TitleWrapper>
      {/* <SearchBoxWrapper>
        <SearchBox></SearchBox>
        <Button></Button>
      </SearchBoxWrapper> */}
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
