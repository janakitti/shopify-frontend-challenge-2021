import { useContext } from "react";
import Card from "../../Card/Card";
import { IMovieDetails } from "../../../shared/interfaces";
import { UserContext, UserReducerActions } from "../../../UserContext";
import PopAnimationWrapper from "../../../components/Motion/PopAnimationWrapper";

interface INominationCardProps {
  movie: IMovieDetails;
}

const NominationCard = ({ movie }: INominationCardProps) => {
  const { dispatchUser: dispatchNominations } = useContext(UserContext);

  const removeNomination = () => {
    dispatchNominations({
      type: UserReducerActions.REMOVE_MOVIE,
      payload: { id: movie.imdbID },
    });
  };

  return (
    <PopAnimationWrapper delay={0}>
      <Card className="nomination-card__container" bgImage={movie.Poster} tint>
        <div className="grid-container">
          <div>
            <h1 className="title">{movie.Title}</h1>
            <h2 className="subtitle">{movie.Year}</h2>
          </div>
          <div className="delete-column">
            <img
              src="./delete.svg"
              alt="Delete nomination"
              className="delete-icon"
              onClick={removeNomination}
            />
          </div>
        </div>
      </Card>
    </PopAnimationWrapper>
  );
};

export default NominationCard;
