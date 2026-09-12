import css from './CommingSoon.module.css';
import { fetchCommingSoonMovies } from '../../services/movieService';
import { useQuery } from '@tanstack/react-query';
import type { Movie } from '../../types/movie';
import Container from '../Container/Container';

interface CommingSoonProps {
  onSelect: (movie: Movie) => void;
}

export default function CommingSoon({ onSelect }: CommingSoonProps) {
  const { data } = useQuery({
    queryKey: ['upcoming-movies'],
    queryFn: () => fetchCommingSoonMovies()
  });

  return (
    <section className={css.commingSoon}>
      <Container>
        <h2 className={css.title}>Comming Soon</h2>
      </Container>
      <div className={css.container}>
        <ul className={css.grid}>
          {data?.results.map((movie) => (
            <li
              onClick={() => onSelect(movie)}
              key={movie.id}
              className={css.item}
            >
              <div className={css.card}>
                <img
                  className={css.image}
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  loading="lazy"
                />
                <h2 className={css.subtitle}>{movie.title}</h2>
                <p className={css.date}>{movie.release_date}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
