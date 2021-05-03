import CustomCard from "../../Card/Card";
import { IMovieMeta } from "../../../shared/interfaces";

interface IMovieCardProps {
  movie: IMovieMeta;
}

const MovieCard = ({ movie }: IMovieCardProps) => {
  return (
    <div className="movie-card__container">
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
            <h1 className="movie-card__title">{movie.Title}</h1>
            <h2>
              {movie.Year} &bull; {movie.Genre}
            </h2>
            <p className="movie-card__plot">{movie.Plot}</p>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

export default MovieCard;
