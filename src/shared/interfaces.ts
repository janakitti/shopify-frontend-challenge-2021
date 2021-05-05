export interface IMovieQueryResponse {
  Response: string;
  Search: IMovieSearch[];
  totalResults: string;
}

export interface IMovieSearch {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IMovieMeta {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IMovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface IMovieRating {
  Source: string;
  Value: string;
}

export interface IError {
  Error: string;
  Response: string;
}
