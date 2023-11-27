import {Container} from '../Container/Container';
import {Auth} from './Auth/Auth';
import style from './Header.module.scss';
import {Heading} from './Heading/Heading';
import {Logo} from './Logo/Logo';

export const Header = () => (
  <header className={style.header}>
    <Container className={style.header__container}>
      <Logo />
      <Heading />
      <Auth />
    </Container>
  </header>
);
