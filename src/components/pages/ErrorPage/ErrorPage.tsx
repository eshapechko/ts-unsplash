import style from './ErrorPage.module.scss';

export const ErrorPage = () => (
  <div className={style.error}>
    <h2 className={style.title}>Произошла ошибка, проверьте URL</h2>
  </div>
);
