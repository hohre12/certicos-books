import styled from 'styled-components';
import variables from '@/styles/variables';
import { useLocation, useNavigate } from 'react-router-dom';

const GlobalNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <GlobalNavigationBarWrapper>
      <LogoWrapper>CERTICOS BOOKS</LogoWrapper>
      <MenuWrapper>
        <MenuItem
          $isActive={location.pathname.includes('/book')}
          onClick={() => navigate('/book')}
        >
          도서 검색
        </MenuItem>
        <MenuItem
          $isActive={location.pathname.includes('/favorite')}
          onClick={() => navigate('/favorite')}
        >
          내가 찜한 책
        </MenuItem>
      </MenuWrapper>
    </GlobalNavigationBarWrapper>
  );
};

export default GlobalNavigationBar;

const GlobalNavigationBarWrapper = styled.div`
  padding: 0px 160px;
  display: flex;
  align-items: center;
  height: 80px;
`;

const LogoWrapper = styled.div`
  ${variables['Title1']}
`;

const MenuWrapper = styled.ul`
  display: flex;
  gap: 56px;
  align-items: center;
  margin-left: 400px;
`;

const MenuItem = styled.li<{ $isActive: boolean }>`
  ${variables['Body1']}
  position: relative;
  padding-bottom: 5px;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: ${({ $isActive }) => ($isActive ? '100%' : '0')};
    height: 2px;
    background-color: ${({ $isActive }) =>
      $isActive ? variables['palettePrimary'] : 'transparent'};
    /* transition:
      width 0.3s ease,
      background-color 0.3s ease; */
  }
`;
