import style from './Auth.module.scss';
import {Svg} from '../../../UI/SVG/Svg';
import AuthIconPath from '../../../assets/auth.svg';
import {urlAuth} from '../../../api/auth';
import {useEffect, useState} from 'react';
import {authLogout, authRequestAsync} from '../../../store/auth/authSlice';
import {deleteToken} from '../../../store/token/tokenSlice';
import {useAppSelector} from '../../../hooks/hookSelector';
import {useAppDispatch} from '../../../hooks/hookDispatch';

export const Auth = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token.token);
  const authData = useAppSelector((state) => state.auth.data);

  const [buttonLogout, setButtonLogout] = useState<boolean>(false);

  useEffect(() => {
    dispatch(authRequestAsync());
  }, [token, dispatch]);

  const delToken = () => {
    dispatch(deleteToken());
    dispatch(authLogout());
    localStorage.removeItem('Bearer');
  };

  const handleClick = () => {
    setButtonLogout(!buttonLogout);
  };

  return (
    <div className={style.authContainer}>
      {authData?.name ? (
        <>
          <button onClick={handleClick} className={style.btn}>
            <img
              className={style.img}
              src={authData.authImg}
              title={authData.name}
              alt={`Аватар ${authData.name}`}
            />
          </button>
          {buttonLogout && (
            <button className={style.logout} onClick={delToken}>
              Выйти
            </button>
          )}
          <p className={style.authName}>{authData.name}</p>
        </>
      ) : (
        <a className={style.authLink} href={urlAuth}>
          <Svg path={AuthIconPath} id='auth' className={style.svg} />
        </a>
      )}
    </div>
  );
};
