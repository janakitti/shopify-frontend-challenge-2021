import CustomCard from "../../Card/Card";

const MovieCard = () => {
  return (
    <>
      <CustomCard>
        <div className="movie-card">
          <div className="movie-card__poster-col">
            <div className="movie-card__poster"></div>
          </div>
          <div className="movie-card__info-col">
            <h1>Title</h1>
            <h2>2021 Sci-fi</h2>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution
            </p>
          </div>
        </div>
      </CustomCard>
    </>
  );
};

export default MovieCard;
