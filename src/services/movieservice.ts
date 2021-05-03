import { OMDB_API_URL } from "../shared/constants";
import {
  IMovieQueryResponse,
  IMovieSearch,
  IMovieMeta,
} from "../shared/interfaces";

export const queryMovies = async (query: string): Promise<IMovieSearch[]> => {
  const res = await fetch(
    `${OMDB_API_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}&type=movie&page=1`
  );
  const movies: IMovieQueryResponse = await res.json();
  return movies.Search || [];
};

export const getMovieDetails = async (id: string): Promise<IMovieMeta> => {
  const res = await fetch(
    `${OMDB_API_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&i=${id}&plot=short`
  );
  const meta: IMovieMeta = await res.json();
  return meta;
};
