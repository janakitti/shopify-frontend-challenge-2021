import { IMovieMeta, IError } from "./interfaces";

export const checkIfNominated = (
  movie: IMovieMeta,
  nominations: IMovieMeta[]
) => nominations.some((m: IMovieMeta) => movie.imdbID === m.imdbID);

export const isIMovieMeta = (
  movie: IMovieMeta | undefined
): movie is IMovieMeta => !!movie;

export const isIError = (res: IError | IMovieMeta): res is IError =>
  (res as IError).Error !== undefined;
