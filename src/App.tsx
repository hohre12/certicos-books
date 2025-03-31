import './App.css';
import GlobalNavigationBar from './components/globalNavigationBar/GlobalNavigationBar';
import { Routes, Route, Navigate } from 'react-router-dom';
import BookList from './pages/Book/List';
import styled from 'styled-components';

function App() {
  return (
    <AppWrapper>
      <GlobalNavigationBar />
      <Routes>
        <Route path="/book">
          <Route
            index
            element={<BookList></BookList>}
          />
        </Route>
        <Route
          path="*"
          element={
            <Navigate
              replace
              to="/book"
            />
          }
        />
      </Routes>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  height: 100vh;
`;
