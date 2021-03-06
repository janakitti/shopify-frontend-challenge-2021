import { useContext, useEffect, useState } from "react";
import NominationCard from "../NominationsCol/NominationCard/NominationCard";
import { IMovieDetails } from "../../shared/interfaces";
import { UserContext } from "../../UserContext";
import Header from "../Header/Header";
import UserAvatar from "../UserAvatar/UserAvatar";
import { NOMINATION_NUMBER } from "../../shared/constants";

const NominationsCol = () => {
  const {
    user: { nominations },
  } = useContext(UserContext);
  const [nominationCards, setNominationCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setNominationCards(
      nominations.map((movie: IMovieDetails) => (
        <NominationCard movie={movie} key={movie.imdbID} />
      ))
    );
  }, [nominations]);

  return (
    <div
      className={`section nomination-col-wrapper ${
        nominations.length ? "nomination-col-wrapper--populated" : null
      }`}
    >
      <div className="nomination-col__header-container">
        <Header>
          <UserAvatar />
        </Header>
      </div>
      <div className="nomination-progress">
        {!nominations.length
          ? null
          : `${nominations.length}/${NOMINATION_NUMBER} nominations`}
      </div>
      {nominationCards}
    </div>
  );
};

export default NominationsCol;
