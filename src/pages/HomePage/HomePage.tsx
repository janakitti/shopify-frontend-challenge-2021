import SearchCol from "../../components/SearchCol/SearchCol";
import NominationsCol from "../../components/NominationsCol/NominationsCol";
import { queryMovies } from "../../services/movieservice";
import { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    (async () => {
      const movies = await queryMovies("");
      console.log(movies);
    })();
  });
  return (
    <div className="home-wrapper">
      <SearchCol />
      <NominationsCol />
    </div>
  );
};

export default HomePage;
