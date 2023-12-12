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
      <Header />
      <Main />
    </>
  );
}

export default App;
