import { IMovieMeta } from "./interfaces";

export const checkIfNominated = (
  movie: IMovieMeta,
  nominations: IMovieMeta[]
) => nominations.some((m: IMovieMeta) => movie.imdbID === m.imdbID);
