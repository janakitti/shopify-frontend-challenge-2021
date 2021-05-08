import { IMovieDetails } from "../../shared/interfaces";
import PopAnimationWrapper from "../../components/Motion/PopAnimationWrapper";

interface ISharedNominationItemProps {
  movie: IMovieDetails;
  index: number;
}

const SharedNominationItem = ({ movie, index }: ISharedNominationItemProps) => {
  return (
    <PopAnimationWrapper delay={index / 10}>
      <div className="nomination-item__container">
        <img src={movie.Poster} alt="Poster" />
        <h1>{movie.Title}</h1>
        <h2>{movie.Year}</h2>
      </div>
    </PopAnimationWrapper>
  );
};

export default SharedNominationItem;
