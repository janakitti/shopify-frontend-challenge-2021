import { TextField, Icon } from "@shopify/polaris";
import { SearchMajor } from "@shopify/polaris-icons";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard/MovieCard";
import { IMovieSearch, IMovieMeta } from "../../shared/interfaces";
import { queryMovies, getMovieDetails } from "../../services/movieservice";
import Header from "../Header/Header";
import useDebounce from "../../shared/useDebounce";

const SearchCol = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IMovieMeta[]>([]);
  const [movieCards, setMovieCards] = useState<JSX.Element[]>([]);

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

  const debouncedSearch = useDebounce(searchInput, 1000);

  useEffect(() => {
    (async () => {
      if (debouncedSearch) {
        const queryResults = await queryMovies(debouncedSearch);
        const metaResuts = await Promise.all(
          queryResults?.map((movie: IMovieSearch) =>
            getMovieDetails(movie.imdbID)
          )
        );
        setSearchResults(metaResuts);
      } else {
        setSearchResults([]);
      }
    })();
  }, [debouncedSearch]);

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
      {movieCards}
    </div>
  );
};

export default SearchCol;
