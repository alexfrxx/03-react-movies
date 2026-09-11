import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';
import Container from '../Container/Container';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const value = formData.get('query') as string;

    if (!value) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(value);
  };

  return (
    <Container>
      <header className={styles.header}>
        <div className={styles.container}>
          <a className={styles.link} href="/index.html">
            <svg width="30" height="30">
              <use href="/sprite.svg#tv"></use>
            </svg>
            <p>
              Movi<span className={styles.x}>X</span>
            </p>
          </a>
          <form className={styles.form} action={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={styles.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
    </Container>
  );
}
