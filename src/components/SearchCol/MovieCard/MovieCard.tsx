import { useContext, useEffect, useState } from "react";
import { ButtonGroup, Button } from "@shopify/polaris";
import CustomCard from "../../Card/Card";
import { IMovieMeta } from "../../../shared/interfaces";
import { checkIfNominated } from "../../../shared/utils";
import { NOMINATION_NUMBER } from "../../../shared/constants";
import {
  NominationsContext,
  NominationReducerActions,
} from "../../../pages/HomePage/HomePage";

interface IMovieCardProps {
  movie: IMovieMeta;
}

const MovieCard = ({ movie }: IMovieCardProps) => {
  const { nominations, dispatchNominations } = useContext(NominationsContext);
  const [isNominationComplete, setIsNominationComplete] = useState(false);

  useEffect(() => {
    setIsNominationComplete(
      nominations.nominations.length === NOMINATION_NUMBER
    );
  }, [nominations]);

  const nominateMovie = () => {
    dispatchNominations({
      type: NominationReducerActions.ADD_MOVIE,
      payload: {
        movie,
      },
    });
  };
  const removeNominatedMovie = () => {
    dispatchNominations({
      type: NominationReducerActions.REMOVE_MOVIE,
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
            <img
              className="movie-card__poster-container"
              src={movie.Poster}
              alt={`${movie.Title} poster`}
            />
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
              <ButtonGroup>
                <Button>View</Button>
                {generateNominateButton}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

export default MovieCard;
