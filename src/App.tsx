import {Routes, Route} from 'react-router-dom';
import {Header} from './components/Header/Header';
import {useAppDispatch} from './hooks/hookDispatch';
import {getToken} from './api/token';
import {useEffect} from 'react';
import {Main} from './components/Main/Main';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getToken());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path='*'
          element={
            <>
              <Header />
              <Main />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
