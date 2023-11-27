import style from './Card.module.scss';
import {ReactComponent as LikeIcon} from '../../../../assets/like.svg';
import {Link} from 'react-router-dom';
import {FC} from 'react';
import {photo} from '../../../../store/photo/photosSlice';

type CardProps = {
  cardData: photo;
};

export const Card: FC<CardProps> = ({cardData}) => {
  const src: string = cardData.urls.small_s3;
  const alt: string = cardData.alt_description;
  const profile: string = cardData.user.links.html;
  const id: string = cardData.id;
  const width: number = cardData.width;
  const height: number = cardData.height;
  const name: string = cardData.user.name;

  return (
    <li className={style.card}>
      <Link className={style.link} to={`/image/${id}`}>
        <img
          className={style.img}
          style={{
            aspectRatio: `${width}/${height}`,
          }}
          src={src}
          alt={alt}
        />
      </Link>

      <a className={style.name} target='blank' href={profile}>
        {name}
      </a>

      <button className={style.like}>
        <LikeIcon className={style.svg} />
        <p className={style.count}>{cardData.likes}</p>
      </button>
    </li>
  );
};
