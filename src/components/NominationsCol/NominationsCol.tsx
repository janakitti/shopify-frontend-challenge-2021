import { useContext, useEffect, useState } from "react";
import NominationCard from "../NominationsCol/NominationCard/NominationCard";
import { IMovieMeta } from "../../shared/interfaces";
import { UserContext } from "../../AppContext";
import Header from "../Header/Header";

const NominationsCol = () => {
  const { nominations } = useContext(UserContext);
  const [nominationCards, setNominationCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setNominationCards(
      nominations.nominations.map((movie: IMovieMeta) => (
        <NominationCard movie={movie} key={movie.imdbID} />
      ))
    );
  }, [nominations]);

  return (
    <div className="section nomination-col-wrapper">
      <Header>the nommies</Header>
      {nominationCards}
    </div>
  );
};

export default NominationsCol;
