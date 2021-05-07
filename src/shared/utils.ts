import { IMovieMeta, IError, IMovieSearch } from "./interfaces";

export const checkIfNominated = (
  movie: IMovieSearch,
  nominations: IMovieSearch[]
) => nominations.some((m: IMovieSearch) => movie.imdbID === m.imdbID);

export const isIMovieMeta = (
  movie: IMovieMeta | undefined
): movie is IMovieMeta => !!movie;

export const isIError = (res: IError | IMovieMeta): res is IError =>
  (res as IError).Error !== undefined;
