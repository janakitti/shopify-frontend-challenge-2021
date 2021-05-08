import { IMovieDetails, IError, IMovieSearch } from "./interfaces";

export const checkIfNominated = (
  movie: IMovieSearch,
  nominations: IMovieSearch[]
) => nominations.some((m: IMovieSearch) => movie.imdbID === m.imdbID);

// IMovieDetails type guard
export const isIMovieDetails = (
  movie: IMovieDetails | undefined
): movie is IMovieDetails => !!movie;

// IError type guard
export const isIError = (res: IError | IMovieDetails): res is IError =>
  (res as IError).Error !== undefined;
