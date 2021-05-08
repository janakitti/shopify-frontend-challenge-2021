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
    const user = query.get("user");
    const ids = query.get("ids")?.split("-");
    if (user && ids) {
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
        setUsername(user);
        setNominations(items);
      })();
    }
  }, []);

  const renderPage = ((): JSX.Element => {
    if (username && nominations.length) {
      return (
        <>
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
              Submit your own nominations!
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="shared-nominations__title-container">
            <div className="shared-nominations__logo-container">
              <img src="./shopify_logo.svg" className="logo__img" alt="logo" />
              <h1 className="logo__name">the shoppies</h1>
            </div>
            <div className="shared-nominations__graphic">
              <img
                src="./invalid_share_link.svg"
                height={300}
                width={300}
                alt="Search for movies"
              ></img>
              <h1>We weren't able to find the nominations for this link</h1>
              <p>
                If you would like, you can submit you own nominations by
                clicking the button below.
              </p>
            </div>
          </div>
          <div className="shared-nominations__container">{nominations}</div>
          <div className="shared-nominations__button-container">
            <Button primary size="slim" onClick={handleClick}>
              Get nominating!
            </Button>
          </div>
        </>
      );
    }
  })();

  return (
    <div className="shared-nominations__page-wrapper">
      <div>{renderPage}</div>
    </div>
  );
};

export default NominationsPage;
