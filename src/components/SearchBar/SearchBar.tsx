import styles from './SearchBar.module.css';
import Container from '../Container/Container';
import { toast } from 'react-hot-toast';

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
    <section className={styles.searchBar} id="search-bar">
      <Container>
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
      </Container>
    </section>
  );
}
