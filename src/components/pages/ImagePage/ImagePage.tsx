import style from './ImagePage.module.scss';
import {useEffect} from 'react';
import {
  addLike,
  clearImage,
  imageRequestAsync,
  removeLike,
} from '../../../store/imageSlice/imageSlice';
import cn from 'classnames';
import {clearPhotos} from '../../../store/photo/photosSlice';
import {useNavigate, useParams} from 'react-router-dom';
import {ReactComponent as LikeIcon} from '../../../assets/clickLike.svg';
import {useAppSelector} from '../../../hooks/hookSelector';
import {useAppDispatch} from '../../../hooks/hookDispatch';

type ImagePageId = {
  id: string;
};

export const ImagePage = () => {
  const dispatch = useAppDispatch();
  const {id} = useParams<ImagePageId>();
  const token = useAppSelector((state) => state.token.token);
  const navigate = useNavigate();
  const data = useAppSelector((state) => state.image.image);
  console.log('data: ', data);
  const like = useAppSelector((state) => state.image.like);
  const likedUser = useAppSelector((state) => state.image.likedUser);
  const created = data?.created_at?.slice(0, 10);

  useEffect(() => {
    if (id) {
      dispatch(imageRequestAsync(id));
    }
  }, [id, token, dispatch]);

  const backClick = () => {
    navigate(`/`);
    dispatch(clearImage());
    dispatch(clearPhotos());
  };

  const handleLike = () => {
    if (!token) {
      alert('Пожалуйста авторизуйтесь');
      return;
    }

    if (!likedUser) {
      if (id) {
        dispatch(addLike(id));
      }
    } else {
      if (id) {
        dispatch(removeLike(id));
      }
    }
  };

  return (
    <section className={style.imagePage}>
      <img
        className={style.img}
        src={data?.urls?.regular}
        alt={data?.alt_description}
      />

      <a className={style.name} href={data?.user?.links.html} target='blank'>
        {data?.user?.name}
      </a>

      <p className={style.data}>{`Created: ${created}`}</p>

      <div className={style.like}>
        <button
          className={cn(style.btn, likedUser && style.colorLike)}
          onClick={handleLike}
        >
          <LikeIcon className={style.svg} />
        </button>
        <span className={style.count}>{like}</span>
      </div>

      <button className={style.back} onClick={backClick}>
        Вернуться назад
      </button>
    </section>
  );
};
