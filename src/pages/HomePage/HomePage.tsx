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
import { UserContext, UserReducerActions } from "../../AppContext";

const HomePage = () => {
  const {
    user: { nominations },
    dispatchUser,
  } = useContext(UserContext);

  useEffect(() => {
    const storedUsername = localStorage.getItem("shoppies-username");
    const storedNominations = localStorage.getItem("shoppies-nominations");
    if (storedUsername) {
      dispatchUser({
        type: UserReducerActions.LOGIN,
        payload: { username: storedUsername },
      });
    }
    if (storedNominations) {
      dispatchUser({
        type: UserReducerActions.SET_MOVIES,
        payload: { movies: JSON.parse(storedNominations) },
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppies-nominations", JSON.stringify(nominations));
    if (nominations.length === NOMINATION_NUMBER) {
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
