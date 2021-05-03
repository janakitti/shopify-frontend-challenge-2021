import Card from "../../Card/Card";
import { IMovieMeta } from "../../../shared/interfaces";

interface INominationCardProps {
  movie: IMovieMeta;
}

const NominationCard = ({ movie }: INominationCardProps) => {
  return (
    <Card>
      <h1>{movie.Title}</h1>
      <h2>{movie.Year}</h2>
    </Card>
  );
};

export default NominationCard;
