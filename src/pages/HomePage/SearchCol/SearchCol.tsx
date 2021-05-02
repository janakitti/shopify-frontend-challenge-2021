import { TextField, Icon } from "@shopify/polaris";
import { SearchMajor } from "@shopify/polaris-icons";
import MovieCard from "./MovieCard/MovieCard";

const SearchCol = () => {
  return (
    <div className="section search-col-wrapper">
      <h3>the shoppies</h3>
      <h1>Nominate</h1>
      <TextField
        label="Search movies"
        value="hello"
        onChange={() => {}}
        prefix={<Icon source={SearchMajor} color="base" />}
      />
      <MovieCard />
    </div>
  );
};

export default SearchCol;
