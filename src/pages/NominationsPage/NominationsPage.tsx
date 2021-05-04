import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IMovieMeta } from "../../shared/interfaces";
import { getMovieDetails } from "../../services/movieservice";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const NominationsPage = () => {
  const [nominations, setNominations] = useState<IMovieMeta[]>([]);
  const query = useQuery();

  useEffect(() => {
    const data = query.get("nominations");
    const ids = data?.split("-");
    if (ids) {
      (async () => {
        const metaResuts = await Promise.all(
          ids?.map((id: string) => getMovieDetails(id))
        );
        setNominations(metaResuts);
      })();
    }
  }, []);

  return <h1>{JSON.stringify(nominations)}</h1>;
};

export default NominationsPage;
