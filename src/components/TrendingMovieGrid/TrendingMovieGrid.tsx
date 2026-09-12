import css from './TrendingMovieGrid.module.css';
import type { Movie } from '../../types/movie';
import Container from '../Container/Container';
import { useQuery } from '@tanstack/react-query';
import { fetchFirstMovies } from '../../services/movieService';

interface TrendingMovieProps {
  onSelect: (movie: Movie) => void;
}

export default function TrendingMovieGrid({ onSelect }: TrendingMovieProps) {
  const { data } = useQuery({
    queryKey: ['movie'],
    queryFn: () => fetchFirstMovies()
  });

  return (
    <section className={css.trendingMovie}>
      <Container>
        <h2 className={css.title}>Trending</h2>
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
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
