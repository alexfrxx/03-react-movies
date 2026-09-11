import type { ReactNode } from 'react';
import css from './Container.module.css';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return <div className={css.container}>{children}</div>;
}
