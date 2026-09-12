import css from './AppBody.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import type { Movie } from '../../types/movie';
import { Toaster, toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import fetchMovies from '../../services/movieService';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginateModule from 'react-paginate';
import type { ReactPaginateProps } from 'react-paginate';
import type { ComponentType } from 'react';
import TrendingMovieGrid from '../TrendingMovieGrid/TrendingMovieGrid';
import Hero from '../Hero/Hero';
import Footer from '../Footer/Footer';
import CommingSoon from '../CommingSoon/CommingSoon';

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function AppBody() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['query', query, page],
    queryFn: () => fetchMovies({ str: query, page }),
    enabled: Boolean(query),
    placeholderData: keepPreviousData
  });

  useEffect(() => {
    if (query && data && data?.results.length === 0) {
      toast.error('No movies found for your request.');
      setQuery('');
    }
  }, [data, query]);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Hero />
      <SearchBar
        onSubmit={(query) => {
          setQuery(query);
          setPage(1);
        }}
      />
      <Toaster position="top-center" reverseOrder={false} />
      <CommingSoon onSelect={openModal} />
      <TrendingMovieGrid onSelect={openModal} />
      {isLoading && <Loader />}
      {isError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid
          onSelect={openModal}
          movies={data?.results ?? []}
          title={data?.results ? query : ''}
        />
      )}
      {query && data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data?.total_pages ?? 0}
          onPageChange={({ selected }) => setPage(selected + 1)}
          pageRangeDisplayed={5}
          nextLabel="→"
          previousLabel="←"
          activeClassName={css.active}
          containerClassName={css.pagination}
          marginPagesDisplayed={1}
          forcePage={page - 1}
        />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie}></MovieModal>
      )}
      <Footer />
    </>
  );
}
