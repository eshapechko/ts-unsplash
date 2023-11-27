import {Route, Routes} from 'react-router-dom';
import {Container} from '../Container/Container';
import {List} from './List/List';
import style from './Main.module.scss';
import {ImagePage} from '../pages/ImagePage/ImagePage';
import {ErrorPage} from '../pages/ErrorPage/ErrorPage';

export const Main = () => (
  <main className={style.main}>
    <Container>
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/?code' element={<List />} />
        <Route path='/image/:id' element={<ImagePage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </Container>
  </main>
);
