import { TextField } from "@shopify/polaris";
import { Icon } from "@shopify/polaris";
import { SearchMajor } from "@shopify/polaris-icons";

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
    </div>
  );
};

export default SearchCol;
