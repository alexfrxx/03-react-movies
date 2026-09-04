import './App.module.css';
import fetchMovies from '../../services/movieService';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import type { Movie } from '../../types/movie';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

function App() {
  const [loader, setLoader] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleSearch = async (query: string) => {
    try {
      setError(false);
      setMovies([]);
      setLoader(true);
      const res = await fetchMovies(query);
      console.log(res);

      if (res.length === 0) {
        toast.error('No movies found for your request.');
      }

      setMovies(res);
    } catch (error) {
      setMovies([]);
      setError(true);
    } finally {
      setLoader(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const movieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <Loader />}
      {error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid onSelect={movieClick} movies={movies} />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
