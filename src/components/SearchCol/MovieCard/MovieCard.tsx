import { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup, Icon } from "@shopify/polaris";
import { PlayCircleMajor } from "@shopify/polaris-icons";
import CustomCard from "../../Card/Card";
import { IMovieSearch } from "../../../shared/interfaces";
import { checkIfNominated, isIMovieMeta } from "../../../shared/utils";
import { NOMINATION_NUMBER } from "../../../shared/constants";
import { UserContext, UserReducerActions } from "../../../AppContext";
import { getMovieDetails } from "../../../services/movie.service";

interface IMovieCardProps {
  movie: IMovieSearch;
  toggleNominatedToast: () => void;
  displayMovieDetails: (id: string) => Promise<void>;
}

const MovieCard = ({
  movie,
  toggleNominatedToast,
  displayMovieDetails,
}: IMovieCardProps) => {
  const {
    user: { nominations },
    dispatchUser,
  } = useContext(UserContext);
  const [isNominationComplete, setIsNominationComplete] = useState(false);

  useEffect(() => {
    setIsNominationComplete(nominations.length === NOMINATION_NUMBER);
  }, [nominations]);

  const nominateMovie = async () => {
    const movieDetails = await getMovieDetails(movie.imdbID);
    if (isIMovieMeta(movieDetails)) {
      if (nominations.length < NOMINATION_NUMBER - 1) {
        toggleNominatedToast();
      }

      dispatchUser({
        type: UserReducerActions.ADD_MOVIE,
        payload: {
          movie: movieDetails,
        },
      });
    }
  };
  const removeNominatedMovie = () => {
    dispatchUser({
      type: UserReducerActions.REMOVE_MOVIE,
      payload: {
        id: movie.imdbID,
      },
    });
  };

  const generateNominateButton = ((): JSX.Element => {
    const isNominated = checkIfNominated(movie, nominations);
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
    return (
      <div className="movie-card__info-col-top">
        <h1 className="title">{movie.Title}</h1>
        <h2 className="year">{movie.Year}</h2>
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
              <ButtonGroup>
                <Button
                  outline
                  onClick={() => displayMovieDetails(movie.imdbID)}
                >
                  View
                </Button>
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
