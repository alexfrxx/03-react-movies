import css from './TrendingMovieGrid.module.css';
import type { Movie } from '../../types/movie';
import Container from '../Container/Container';
import { useQuery } from '@tanstack/react-query';
import { fetchFirstMovies } from '../../services/movieService';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

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
        <Swiper
          spaceBetween={16}
          slidesPerView={5}
          slidesPerGroup={5}
          modules={[Navigation]}
          navigation
        >
          {data?.results.map((movie) => (
            <SwiperSlide
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
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}
