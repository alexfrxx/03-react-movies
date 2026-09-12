import css from './SupportList.module.css';

interface SupportListProps {
  items: String[];
  title: string;
}

export default function SupportList({ items, title }: SupportListProps) {
  return (
    <ul className={css.list}>
      <h3>{title}</h3>
      {items.map((i) => {
        return (
          <li>
            <a href="#" target="blank" className={css.supportLink}>
              {i}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
