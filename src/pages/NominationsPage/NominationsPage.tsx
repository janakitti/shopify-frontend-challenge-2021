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
  const query = useQuery();

  useEffect(() => {
    const data = query.get("data");
    const ids = data?.split("-");
    if (ids) {
      (async () => {
        const metaResuts = await Promise.all(
          ids?.map((id: string) => getMovieDetails(id))
        );
        const items = metaResuts
          .filter(isIMovieMeta)
          .map((movie: IMovieMeta, index: number) => (
            <SharedNominationItem movie={movie} key={movie.imdbID + index} />
          ));
        setNominations(items);
      })();
    }
  }, []);

  return <div className="shared-nominations__container">{nominations}</div>;
};

export default NominationsPage;
