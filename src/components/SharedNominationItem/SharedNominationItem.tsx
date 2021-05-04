import { IMovieMeta } from "../../shared/interfaces";

interface ISharedNominationItemProps {
  movie: IMovieMeta;
}

const SharedNominationItem = ({ movie }: ISharedNominationItemProps) => {
  return (
    <div>
      <img src={movie.Poster} alt="Poster" />
      <h1>{movie.Title}</h1>
      <h2>{movie.Year}</h2>
    </div>
  );
};

export default SharedNominationItem;
