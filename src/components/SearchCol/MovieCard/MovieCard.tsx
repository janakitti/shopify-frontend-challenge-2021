import { useContext, useEffect, useState } from "react";
import { Button, Icon } from "@shopify/polaris";
import { PlayCircleMajor, FavoriteMajor } from "@shopify/polaris-icons";
import CustomCard from "../../Card/Card";
import { IMovieMeta } from "../../../shared/interfaces";
import { checkIfNominated } from "../../../shared/utils";
import { NOMINATION_NUMBER } from "../../../shared/constants";
import { UserContext, UserReducerActions } from "../../../AppContext";

interface IMovieCardProps {
  movie: IMovieMeta;
  toggleNominatedToast: () => void;
}

const MovieCard = ({ movie, toggleNominatedToast }: IMovieCardProps) => {
  const { user: nominations, dispatchUser: dispatchNominations } = useContext(
    UserContext
  );
  const [isNominationComplete, setIsNominationComplete] = useState(false);

  useEffect(() => {
    setIsNominationComplete(
      nominations.nominations.length === NOMINATION_NUMBER
    );
  }, [nominations]);

  const nominateMovie = () => {
    if (nominations.nominations.length < NOMINATION_NUMBER - 1) {
      toggleNominatedToast();
    }
    dispatchNominations({
      type: UserReducerActions.ADD_MOVIE,
      payload: {
        movie,
      },
    });
  };
  const removeNominatedMovie = () => {
    dispatchNominations({
      type: UserReducerActions.REMOVE_MOVIE,
      payload: {
        id: movie.imdbID,
      },
    });
  };

  const generateNominateButton = ((): JSX.Element => {
    const isNominated = checkIfNominated(movie, nominations.nominations);
    return (
      <Button
        primary
        onClick={nominateMovie}
        disabled={isNominated || isNominationComplete}
      >
        {isNominated ? "Nominated" : "Nominate"}
      </Button>
    );
  })();

  const generateMoviePoster = ((): JSX.Element => {
    if (movie.Poster === "N/A") {
      return (
        <div className="movie-card__poster-container">
          <Icon source={PlayCircleMajor} color="subdued" />
        </div>
      );
    } else {
      return (
        <img
          className="movie-card__poster-container"
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
      );
    }
  })();

  const generateMovieInfo = ((): JSX.Element => {
    const imdbRating =
      movie.imdbRating === "N/A" ? "No rating" : movie.imdbRating;
    const rated = movie.Rated === "N/A" ? "Not rated" : movie.Rated;
    return (
      <div className="movie-card__info-col-top">
        <h1 className="movie-title">{movie.Title}</h1>
        <h2>
          {movie.Year} &bull; {movie.Genre} {movie.imdbID}
        </h2>
        <div className="rating-container">
          <img src="./star.svg" alt="movie rating" className="star" />
          <span>
            {imdbRating} &bull; {rated}
          </span>
        </div>
        <div className="plot-container">
          <p className="plot">{movie.Plot}</p>
        </div>
      </div>
    );
  })();

  return (
    <div className="movie-card__container">
      <CustomCard>
        <div className="movie-card">
          <div className="movie-card__poster-col">{generateMoviePoster}</div>
          <div className="movie-card__info-col">
            {generateMovieInfo}
            <div className="movie-card__button-group">
              {generateNominateButton}
            </div>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

export default MovieCard;
