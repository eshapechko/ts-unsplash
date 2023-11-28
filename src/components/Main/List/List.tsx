import {Card} from './Card/Card';
import style from './List.module.scss';
import {useEffect, useRef} from 'react';
import {clearPhotos, updatePage} from '../../../store/photo/photosSlice';
import {Outlet} from 'react-router-dom';
import Masonry from 'react-masonry-css';
import {useAppSelector} from '../../../hooks/hookSelector';
import {useAppDispatch} from '../../../hooks/hookDispatch';
import {photosRequestAsync} from '../../../store/photo/photoAction';

export const List = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token.token);
  const photos = useAppSelector((state) => state.photos.photos);
  const status = useAppSelector((state) => state.photos.status);
  const endList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (token) {
      dispatch(clearPhotos());
    }
    dispatch(photosRequestAsync());
    dispatch(updatePage());
  }, [token, dispatch]);

  useEffect(() => {
    if (!status) return;

    const current = endList?.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && status === 'fulfilled') {
          dispatch(photosRequestAsync());
          dispatch(updatePage());
        }
      },
      {
        rootMargin: '400px',
      },
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [status, dispatch]);

  const breakpointColumnsObj = {
    default: 6,
    1100: 4,
    860: 3,
    760: 2,
    500: 1,
  };

  return (
    <section className={style.gallery}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={style.myMasonryGrid}
        columnClassName={style.myMasonryGridColumn}
      >
        {photos?.map((item) => (
          <Card key={item.id} cardData={item} />
        ))}
      </Masonry>

      <div ref={endList} className={style.end} />

      <Outlet />
    </section>
  );
};
