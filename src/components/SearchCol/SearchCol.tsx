import { TextField, Icon, Spinner } from "@shopify/polaris";
import { SearchMajor } from "@shopify/polaris-icons";
import { useState, useEffect, useContext } from "react";
import MovieCard from "./MovieCard/MovieCard";
import { IMovieSearch, IMovieMeta } from "../../shared/interfaces";
import { queryMovies, getMovieDetails } from "../../services/movieservice";
import Header from "../Header/Header";
import useDebounce from "../../shared/useDebounce";
import { NOMINATION_NUMBER } from "../../shared/constants";
import ShareCard from "../ShareCard/ShareCard";
import { UserContext } from "../../AppContext";
import { isIMovieMeta } from "../../shared/utils";

const SearchCol = () => {
  const { user: nominations } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IMovieMeta[]>([]);
  const [movieCards, setMovieCards] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (input: string) => {
    setSearchInput(input);
  };

  useEffect(() => {
    (async () => {
      const cards = await searchResults?.map((movie: IMovieMeta) => (
        <MovieCard movie={movie} key={movie.imdbID} />
      ));
      setMovieCards(cards);
    })();
  }, [searchResults]);

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    (async () => {
      if (debouncedSearch) {
        setIsLoading(true);
        const queryResults = await queryMovies(debouncedSearch);
        const metaResuts = await Promise.all(
          queryResults?.map((movie: IMovieSearch) =>
            getMovieDetails(movie.imdbID)
          )
        );
        setSearchResults(metaResuts.filter(isIMovieMeta));
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    })();
  }, [debouncedSearch]);

  const resultsSection = ((): JSX.Element => {
    if (nominations.nominations.length === NOMINATION_NUMBER) {
      return <ShareCard />;
    } else if (isLoading) {
      return (
        <div className="search-col__results--loading">
          <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
      );
    } else if (movieCards.length) {
      return <>{movieCards}</>;
    } else if (debouncedSearch) {
      return (
        <div className="search-col__results--empty">
          <img
            src="./no_results_found.svg"
            height={300}
            width={300}
            alt="No movies found"
          ></img>
          <p>No movies found</p>
        </div>
      );
    } else {
      return (
        <div className="search-col__results--empty">
          <img
            src="./begin_search.svg"
            height={300}
            width={300}
            alt="Search for movies"
          ></img>
          <p>Search!</p>
        </div>
      );
    }
  })();

  return (
    <div className="section search-col-wrapper">
      <Header>
        <img src="./shopify_logo.svg" className="header__logo" alt="logo" />
        <h1 className="header__title">the shoppies</h1>
      </Header>
      <h1 className="title">Nominate</h1>
      <p className="body">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution
      </p>
      <TextField
        label="Search movies"
        value={searchInput}
        onChange={handleSearch}
        prefix={<Icon source={SearchMajor} color="base" />}
      />
      <div className="search-col__results">{resultsSection}</div>
    </div>
  );
};

export default SearchCol;
