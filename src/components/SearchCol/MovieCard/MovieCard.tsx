import CustomCard from "../../Card/Card";

const MovieCard = () => {
  return (
    <>
      <CustomCard>
        <div className="movie-card">
          <div className="movie-card__poster-col">
            <div className="movie-card__poster"></div>
          </div>
          <div className="movie-card__info-col">Info</div>
        </div>
      </CustomCard>
    </>
  );
};

export default MovieCard;
