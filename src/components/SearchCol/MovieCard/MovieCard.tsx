import CustomCard from "../../Card/Card";
import { IMovieMeta } from "../../../shared/interfaces";

interface IMovieCardProps {
  movie: IMovieMeta;
}

const MovieCard = ({ movie }: IMovieCardProps) => {
  return (
    <>
      <CustomCard>
        <div className="movie-card">
          <div className="movie-card__poster-col">
            <img
              className="movie-card__poster-container"
              src={movie.Poster}
              alt={`${movie.Title} poster`}
            />
          </div>
          <div className="movie-card__info-col">
            <h1>{movie.Title}</h1>
            <h2>
              {movie.Year} &bull; {movie.Genre}
            </h2>
            <p>{movie.Plot}</p>
          </div>
        </div>
      </CustomCard>
    </>
  );
};

export default MovieCard;
