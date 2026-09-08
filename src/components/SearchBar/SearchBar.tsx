import { Formik, Form, Field, type FormikHelpers } from 'formik';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (value: string) => void;
}

interface FormikInit {
  query: string;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (
    values: FormikInit,
    actions: FormikHelpers<FormikInit>
  ) => {
    const value = values.query.trim();

    if (!value) {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(value);
    actions.resetForm();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik initialValues={{ query: '' }} onSubmit={handleSubmit}>
          <Form className={styles.form}>
            <Field
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
          </Form>
        </Formik>
      </div>
    </header>
  );
}
