import { IMovieDetails, IError, IMovieSearch } from "./interfaces";

export const checkIfNominated = (
  movie: IMovieSearch,
  nominations: IMovieSearch[]
) => nominations.some((m: IMovieSearch) => movie.imdbID === m.imdbID);

export const isIMovieMeta = (
  movie: IMovieDetails | undefined
): movie is IMovieDetails => !!movie;

export const isIError = (res: IError | IMovieDetails): res is IError =>
  (res as IError).Error !== undefined;
