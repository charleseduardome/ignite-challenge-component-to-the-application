import { HeardProps } from './types';

export function Header({title}: HeardProps) {
  return(
    <header>
      <span className="category">Categoria:<span> {title}</span></span>
    </header>
  );
}