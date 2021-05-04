import { useContext } from "react";
import Card from "../../Card/Card";
import { IMovieMeta } from "../../../shared/interfaces";
import {
  NominationsContext,
  NominationReducerActions,
} from "../../../pages/HomePage/HomePage";

interface INominationCardProps {
  movie: IMovieMeta;
}

const NominationCard = ({ movie }: INominationCardProps) => {
  const { dispatchNominations } = useContext(NominationsContext);

  const removeNomination = () => {
    dispatchNominations({
      type: NominationReducerActions.REMOVE_MOVIE,
      payload: { id: movie.imdbID },
    });
  };

  return (
    <Card
      className="nomination-card__container"
      bgImage={movie.Poster}
      tint
      onClick={removeNomination}
    >
      <div className="grid-container">
        <div>
          <h1 className="title">{movie.Title}</h1>
          <h2 className="subtitle">{movie.Year}</h2>
        </div>
        <div className="delete-column">
          <img src="./delete.svg" alt="Delete nomination" />
        </div>
      </div>
    </Card>
  );
};

export default NominationCard;
