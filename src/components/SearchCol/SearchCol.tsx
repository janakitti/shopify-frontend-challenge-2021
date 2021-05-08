import { TextField, Icon, Spinner } from "@shopify/polaris";
import { SearchMajor } from "@shopify/polaris-icons";
import { useState, useEffect, useContext } from "react";
import MovieCard from "./MovieCard/MovieCard";
import { IMovieSearch, IMovieDetails } from "../../shared/interfaces";
import { queryMovies, getMovieDetails } from "../../services/movieservice";
import Header from "../Header/Header";
import useDebounce from "../../shared/useDebounce";
import { NOMINATION_NUMBER } from "../../shared/constants";
import ShareCard from "../ShareCard/ShareCard";
import { UserContext } from "../../AppContext";
import { isIMovieMeta } from "../../shared/utils";
import UserAvatar from "../UserAvatar/UserAvatar";
import PopAnimationWrapper from "../../components/Motion/PopAnimationWrapper";

interface ISearchColProps {
  toggleCopiedToast: () => void;
  toggleNominatedToast: () => void;
  displayMovieDetails: (id: string) => Promise<void>;
}

const SearchCol = ({
  toggleCopiedToast,
  toggleNominatedToast,
  displayMovieDetails,
}: ISearchColProps) => {
  const {
    user: { nominations },
  } = useContext(UserContext);
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<IMovieSearch[]>([]);
  const [movieCards, setMovieCards] = useState<JSX.Element[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (input: string) => {
    setSearchInput(input);
  };

  useEffect(() => {
    (async () => {
      const cards = await searchResults?.map((movie: IMovieSearch) => (
        <MovieCard
          movie={movie}
          key={movie.imdbID}
          toggleNominatedToast={toggleNominatedToast}
          displayMovieDetails={displayMovieDetails}
        />
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
        const movies = queryResults.map((movie: IMovieSearch) => movie);
        setSearchResults(movies);
      } else {
        setSearchResults([]);
      }
      setIsLoading(false);
    })();
  }, [debouncedSearch]);

  const resultsSection = ((): JSX.Element => {
    if (nominations.length === NOMINATION_NUMBER) {
      return <ShareCard toggleCopiedToast={toggleCopiedToast} />;
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
          <h1>Looks like we couldn't find that movie!</h1>
          <p>Try using a different search term</p>
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
          <h1>Search for movies above</h1>
        </div>
      );
    }
  })();

  return (
    <div className="section search-col-wrapper">
      <Header>
        <div className="search-col-wrapper__header-container">
          <div className="search-col__logo-container">
            <img src="./shopify_logo.svg" className="logo__img" alt="logo" />
            <h1 className="logo__name">the shoppies</h1>
          </div>
          <div className="header__avatar">
            <UserAvatar />
          </div>
        </div>
      </Header>
      <PopAnimationWrapper delay={0}>
        <h1 className="title">Nominate</h1>
        <p className="body">
          The Shoppies are just around the corner and entrepreneurs from all
          over the world are putting in their movie nominations. Search for
          movies below and select <b>5 movies</b> that <i>you</i> feel are
          worthy of a Shoppy this year!
        </p>
      </PopAnimationWrapper>
      <PopAnimationWrapper delay={0.1}>
        <TextField
          label="Search movies"
          value={searchInput}
          onChange={handleSearch}
          prefix={<Icon source={SearchMajor} color="base" />}
          disabled={nominations.length === NOMINATION_NUMBER}
        />
      </PopAnimationWrapper>
      <div className="search-col__results">{resultsSection}</div>
    </div>
  );
};

export default SearchCol;
