import { useContext, useEffect, useState } from "react";
import NominationCard from "../NominationsCol/NominationCard/NominationCard";
import { IMovieMeta } from "../../shared/interfaces";
import { UserContext } from "../../AppContext";
import Header from "../Header/Header";
import { Avatar } from "@shopify/polaris";

const NominationsCol = () => {
  const {
    user: { username, nominations },
  } = useContext(UserContext);
  const [nominationCards, setNominationCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setNominationCards(
      nominations.map((movie: IMovieMeta) => (
        <NominationCard movie={movie} key={movie.imdbID} />
      ))
    );
  }, [nominations]);

  return (
    <div className="section nomination-col-wrapper">
      <Header>
        <div className="username-container">
          <p>{username}</p>
          <Avatar
            size="small"
            name="username"
            accessibilityLabel="User's username"
          />
        </div>
      </Header>
      {nominationCards}
    </div>
  );
};

export default NominationsCol;
