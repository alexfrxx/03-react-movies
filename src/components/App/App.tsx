import css from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import MovieModal from '../MovieModal/MovieModal';
import fetchMovies from '../../services/movieService';
import type { Movie } from '../../types/movie';
import { toast, Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

function App() {
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
      <SearchBar
        onSubmit={(query) => {
          setQuery(query);
          setPage(1);
        }}
      ></SearchBar>
      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data?.total_pages ?? 0}
          onPageChange={({ selected }) => setPage(selected + 1)}
          pageRangeDisplayed={5}
          nextLabel=">"
          previousLabel="<"
          activeClassName={css.active}
          containerClassName={css.pagination}
        />
      )}

      <Toaster position="top-center" reverseOrder={false} />
      {isLoading && <Loader />}
      {isError ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={openModal} movies={data?.results ?? []} />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal onClose={closeModal} movie={selectedMovie}></MovieModal>
      )}
    </>
  );
}

export default App;
