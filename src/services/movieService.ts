import axios from 'axios';
import type { Movie } from '../types/movie';

const key = import.meta.env.VITE_TMDB_TOKEN;
const url = 'https://api.themoviedb.org/3/search/movie';

interface FetchMovieParams {
  page: number;
  str: string;
}
interface FetchMoviesProps {
  page: number;
  results: Movie[];
  total_pages: number;
}

export default async function fetchMovies({
  str,
  page
}: FetchMovieParams): Promise<FetchMoviesProps> {
  const response = await axios.get<FetchMoviesProps>(url, {
    params: {
      page,
      query: str
    },
    headers: {
      Authorization: `Bearer ${key}`
    }
  });

  return response.data;
}
