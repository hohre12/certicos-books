import styled from 'styled-components';
import variables from '@/styles/variables';

const FavoriteList = () => {
  return (
    <FavoriteListWrapper>
      <TitleWrapper>내가 찜한 책</TitleWrapper>
    </FavoriteListWrapper>
  );
};

export default FavoriteList;

const FavoriteListWrapper = styled.div`
  padding: 100px 500px 0;
`;

const TitleWrapper = styled.div`
  ${variables['Title2']}
`;
