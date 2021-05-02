import SearchCol from "./SearchCol/SearchCol";
import NominationsCol from "./NominationsCol/NominationsCol";

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <SearchCol />
      <NominationsCol />
    </div>
  );
};

export default HomePage;
