import { useContext } from "react";
import { ButtonGroup, Button } from "@shopify/polaris";
import CustomCard from "../../Card/Card";
import { IMovieMeta } from "../../../shared/interfaces";
import { checkIfNominated } from "../../../shared/utils";
import {
  NominationsContext,
  NominationReducerActions,
} from "../../../pages/HomePage/HomePage";

interface IMovieCardProps {
  movie: IMovieMeta;
}

const MovieCard = ({ movie }: IMovieCardProps) => {
  const { nominations, dispatchNominations } = useContext(NominationsContext);
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
            <div className="movie-card__button-group">
              <ButtonGroup>
                <Button>View</Button>
                {checkIfNominated(movie, nominations.nominations) ? (
                  <Button primary onClick={removeNominatedMovie}>
                    Nominated
                  </Button>
                ) : (
                  <Button primary onClick={nominateMovie}>
                    Nominate
                  </Button>
                )}
              </ButtonGroup>
            </div>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

export default MovieCard;
