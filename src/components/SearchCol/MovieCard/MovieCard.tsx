import { useContext, useEffect, useState } from "react";
import { Button, Icon } from "@shopify/polaris";
import { PlayCircleMajor } from "@shopify/polaris-icons";
import CustomCard from "../../Card/Card";
import { IMovieMeta } from "../../../shared/interfaces";
import { checkIfNominated } from "../../../shared/utils";
import { NOMINATION_NUMBER } from "../../../shared/constants";
import { UserContext, UserReducerActions } from "../../../AppContext";

interface IMovieCardProps {
  movie: IMovieMeta;
}

const MovieCard = ({ movie }: IMovieCardProps) => {
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

  return (
    <div className="movie-card__container">
      <CustomCard>
        <div className="movie-card">
          <div className="movie-card__poster-col">
            {movie.Poster === "N/A" ? (
              <div className="movie-card__poster-container">
                <Icon source={PlayCircleMajor} color="subdued" />
              </div>
            ) : (
              <img
                className="movie-card__poster-container"
                src={movie.Poster}
                alt={`${movie.Title} poster`}
              />
            )}
          </div>
          <div className="movie-card__info-col">
            <div className="movie-card__info-col-top">
              <h1 className="movie-card__title">{movie.Title}</h1>
              <h2>
                {movie.Year} &bull; {movie.Genre}
              </h2>
              <p className="movie-card__plot">{movie.Plot}</p>
            </div>
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
