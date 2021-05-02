import { OMDB_API_URL } from "../shared/constants";
import { IMovieResponse, IMovie } from "../shared/interfaces";

export const queryMovies = async (query: string): Promise<IMovie[]> => {
  const res = await fetch(
    `${OMDB_API_URL}/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${query}&type=movie&page=1`
  );
  const movies: IMovieResponse = await res.json();
  return movies.Search;
};
