import React, {
  useReducer,
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { Toast, Frame } from "@shopify/polaris";
import Header from "../../components/Header/Header";
import SearchCol from "../../components/SearchCol/SearchCol";
import NominationsCol from "../../components/NominationsCol/NominationsCol";
import { IMovieMeta } from "../../shared/interfaces";
import { NOMINATION_NUMBER } from "../../shared/constants";
import { UserContext } from "../../AppContext";

const HomePage = () => {
  const { nominations } = useContext(UserContext);

  useEffect(() => {
    if (nominations.nominations.length === NOMINATION_NUMBER) {
      toggleIsToastActive();
    }
  }, [nominations]);

  const [isToastActive, setIsToastActive] = useState(false);
  const toggleIsToastActive = useCallback(
    () => setIsToastActive((active) => !active),
    []
  );
  const toastMarkup = isToastActive ? (
    <Toast content="Nominations complete 🎉" onDismiss={toggleIsToastActive} />
  ) : null;

  return (
    <Frame>
      <div className="home-wrapper">
        <div className="home-wrapper__body">
          <SearchCol />
          <NominationsCol />
        </div>
      </div>
      {toastMarkup}
    </Frame>
  );
};

export default HomePage;
