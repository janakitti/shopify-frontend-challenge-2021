import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IMovieDetails } from "../../shared/interfaces";
import { getMovieDetails } from "../../services/movie.service";
import SharedNominationItem from "../../components/SharedNominationItem/SharedNominationItem";
import { isIMovieDetails } from "../../shared/utils";
import { Button, Spinner } from "@shopify/polaris";
import { useHistory } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const NominationsPage = () => {
  let history = useHistory();
  const [nominations, setNominations] = useState<JSX.Element[]>([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const query = useQuery();

  const handleClick = () => {
    history.push("/");
  };

  // Read the query parameters from the URL and set the states
  useEffect(() => {
    const user = query.get("user");
    const ids = query.get("ids")?.split("-");
    if (user && ids) {
      (async () => {
        const metaResuts = await Promise.all(
          ids?.map((id: string) => getMovieDetails(id))
        );
        const items = metaResuts
          .filter(isIMovieDetails)
          .map((movie: IMovieDetails, index: number) => (
            <SharedNominationItem
              movie={movie}
              key={movie.imdbID}
              index={index}
            />
          ));
        setUsername(user);
        setNominations(items);
        setIsLoading(false);
      })();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Logic for rendering contents of the page
  const generatePage = ((): JSX.Element => {
    if (isLoading) {
      return <Spinner />;
    } else if (username && nominations.length) {
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
      <div>{generatePage}</div>
    </div>
  );
};

export default NominationsPage;
