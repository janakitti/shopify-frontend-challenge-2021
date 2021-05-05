import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IMovieMeta } from "../../shared/interfaces";
import { getMovieDetails } from "../../services/movieservice";
import SharedNominationItem from "../../components/SharedNominationItem/SharedNominationItem";
import { isIMovieMeta } from "../../shared/utils";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const NominationsPage = () => {
  const [nominations, setNominations] = useState<JSX.Element[]>([]);
  const [username, setUsername] = useState("");
  const query = useQuery();

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
            <SharedNominationItem movie={movie} key={movie.imdbID + index} />
          ));
        setUsername(username);
        setNominations(items);
      })();
    }
  }, []);

  return (
    <div className="shared-nominations__container">
      <h1>{username}</h1>
      {nominations}
    </div>
  );
};

export default NominationsPage;
