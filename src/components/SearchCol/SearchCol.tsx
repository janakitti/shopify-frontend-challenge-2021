import { TextField, Icon, Form } from "@shopify/polaris";
import { SearchMajor } from "@shopify/polaris-icons";
import { useState, useCallback, useEffect } from "react";
import MovieCard from "./MovieCard/MovieCard";
import { IMovie } from "../../shared/interfaces";
import { queryMovies } from "../../services/movieservice";

const SearchCol = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IMovie[]>([]);
  const [movieCards, setMovieCards] = useState<JSX.Element[]>([]);

  const handleSearch = (input: string) => {
    setSearchInput(input);
  };

  const handleSubmit = useCallback(
    async (_event) => {
      const results = await queryMovies(searchInput);
      setSearchResults(results);
    },
    [searchInput]
  );

  useEffect(() => {
    const cards = searchResults?.map((movie: IMovie) => (
      <MovieCard movie={movie} />
    ));
    setMovieCards(cards);
  }, [searchResults]);

  return (
    <div className="section search-col-wrapper">
      <h3>the shoppies</h3>
      <h1>Nominate</h1>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Search movies"
          value={searchInput}
          onChange={handleSearch}
          prefix={<Icon source={SearchMajor} color="base" />}
        />
      </Form>
      {movieCards}
    </div>
  );
};

export default SearchCol;
