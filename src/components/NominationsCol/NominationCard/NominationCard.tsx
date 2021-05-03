import Card from "../../Card/Card";
import { IMovieMeta } from "../../../shared/interfaces";

interface INominationCardProps {
  movie: IMovieMeta;
}

const NominationCard = ({ movie }: INominationCardProps) => {
  return (
    <Card className="nomination-card__container" bgImage={movie.Poster}>
      <div className="nomination-card_tint">
        <h1 className="title">{movie.Title}</h1>
        <h2 className="subtitle">{movie.Year}</h2>
      </div>
    </Card>
  );
};

export default NominationCard;
