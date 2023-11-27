import {ReactNode} from 'react';
import style from './Container.module.scss';
import cn from 'classnames';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container = ({className, children}: Props) => (
  <div className={cn(style.container, className)}>{children}</div>
);
