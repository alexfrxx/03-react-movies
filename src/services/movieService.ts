import axios from 'axios';
import type { Movie } from '../types/movie';
const key = import.meta.env.VITE_TMDB_TOKEN;
const url = 'https://api.themoviedb.org/3/search/movie';

interface FetchMoviesProps {
  page: number;
  results: Movie[];
}

export default async function fetchMovies(str: string): Promise<Movie[]> {
  const response = await axios.get<FetchMoviesProps>(url, {
    params: {
      query: str
    },
    headers: {
      Authorization: `Bearer ${key}`
    }
  });

  return response.data.results;
}
