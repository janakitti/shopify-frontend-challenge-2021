import SearchCol from "../../components/SearchCol/SearchCol";
import NominationsCol from "../../components/NominationsCol/NominationsCol";

const HomePage = () => {
  return (
    <div className="home-wrapper">
      <SearchCol />
      <NominationsCol />
    </div>
  );
};

export default HomePage;
