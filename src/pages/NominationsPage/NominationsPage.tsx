import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IMovieMeta } from "../../shared/interfaces";
import { getMovieDetails } from "../../services/movieservice";
import SharedNominationItem from "../../components/SharedNominationItem/SharedNominationItem";
import { isIMovieMeta } from "../../shared/utils";
import { Button } from "@shopify/polaris";
import { useHistory } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const NominationsPage = () => {
  let history = useHistory();
  const [nominations, setNominations] = useState<JSX.Element[]>([]);
  const [username, setUsername] = useState("");
  const query = useQuery();

  const handleClick = () => {
    history.push("/");
  };

  useEffect(() => {
    const data = query.get("data")?.split("-");
    const [username, ids] = [data?.[0], data?.slice(1, data?.length)];
    if (username && ids) {
      (async () => {
        const metaResuts = await Promise.all(
          ids?.map((id: string) => getMovieDetails(id))
        );
        const items = metaResuts
          .filter(isIMovieMeta)
          .map((movie: IMovieMeta, index: number) => (
            <SharedNominationItem
              movie={movie}
              key={movie.imdbID}
              index={index}
            />
          ));
        setUsername(username);
        setNominations(items);
      })();
    }
  }, []);

  return (
    <div className="shared-nominations__page-wrapper">
      <div className="shared-nominations__title-container">
        <div className="shared-nominations__logo-container">
          <img src="./shopify_logo.svg" className="logo__img" alt="logo" />
          <h1 className="logo__name">the shoppies</h1>
        </div>
        <h1 className="title">{username}'s Nominations</h1>
      </div>
      <div className="shared-nominations__container">{nominations}</div>
      <div className="shared-nominations__button-container">
        <Button primary size="slim" onClick={handleClick}>
          Cast your own nominations!
        </Button>
      </div>
    </div>
  );
};

export default NominationsPage;
