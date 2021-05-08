import { OMDB_API_URL } from "../shared/constants";
import {
  IMovieQueryResponse,
  IMovieSearch,
  IMovieDetails,
  IError,
} from "../shared/interfaces";
import { isIError, isIMovieDetails } from "../shared/utils";

export const queryMovies = async (query: string): Promise<IMovieSearch[]> => {
  const res = await fetch(
    `${OMDB_API_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}&type=movie&page=1`
  );
  const data: IMovieQueryResponse = await res?.json();
  const movies = data.Search;

  interface IUniqueMoviesAccumulator {
    movies: IMovieSearch[];
    ids: Set<string>;
  }
  const initAcc: IUniqueMoviesAccumulator = { movies: [], ids: new Set() };
  const uniqueMovies = movies?.reduce(
    (acc: IUniqueMoviesAccumulator, curr: IMovieSearch) => {
      if (!acc.ids.has(curr.imdbID)) {
        acc.movies.push(curr);
        acc.ids.add(curr.imdbID);
      }
      return acc;
    },
    initAcc
  );
  return uniqueMovies?.movies || [];
};

export const getMovieDetails = async (
  id: string,
  fullPlot?: boolean
): Promise<IMovieDetails | undefined> => {
  const res = await fetch(
    `${OMDB_API_URL}/?apikey=${
      process.env.REACT_APP_OMDB_API_KEY
    }&i=${id}&plot=${fullPlot ? "full" : "short"}`
  );
  const data: IMovieDetails | IError = await res?.json();
  return isIError(data) ? undefined : data;
};
