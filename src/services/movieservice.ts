import { OMDB_API_URL } from "../shared/constants";
import {
  IMovieQueryResponse,
  IMovieSearch,
  IMovieMeta,
  IError,
} from "../shared/interfaces";
import { isIError, isIMovieMeta } from "../shared/utils";

export const queryMovies = async (query: string): Promise<IMovieSearch[]> => {
  const res = await fetch(
    `${OMDB_API_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}&type=movie&page=1`
  );
  const movies: IMovieQueryResponse = await res?.json();
  return movies.Search || [];
};

export const getMovieDetails = async (
  id: string,
  fullPlot?: boolean
): Promise<IMovieMeta | undefined> => {
  const res = await fetch(
    `${OMDB_API_URL}/?apikey=${
      process.env.REACT_APP_OMDB_API_KEY
    }&i=${id}&plot=${fullPlot ? "full" : "short"}`
  );
  const data: IMovieMeta | IError = await res?.json();
  return isIError(data) ? undefined : data;
};
