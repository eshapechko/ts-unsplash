type PropsSvg = {
  path: string;
  className?: string;
  id: string | number;
  alt?: string;
};

export const Svg = (prop: PropsSvg) => {
  const {path, className, id} = prop;
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className={className}>
      <use xlinkHref={`${path}#${id}`}></use>
    </svg>
  );
};
