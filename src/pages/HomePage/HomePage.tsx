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
      toggleIsCompletedToastActive();
    }
  }, [nominations]);

  const [isCompletedToastActive, setIsCompletedToastActive] = useState(false);
  const toggleIsCompletedToastActive = useCallback(
    () => setIsCompletedToastActive((active) => !active),
    []
  );
  const completedToastMarkup = isCompletedToastActive ? (
    <Toast
      content="Nominations complete 🎉"
      onDismiss={toggleIsCompletedToastActive}
    />
  ) : null;

  const [isCopiedToastActive, setIsCopiedToastActive] = useState(false);
  const toggleIsCopiedToastActive = useCallback(
    () => setIsCopiedToastActive((active) => !active),
    []
  );
  const copiedToastMarkup = isCopiedToastActive ? (
    <Toast content="Copied 📋" onDismiss={toggleIsCopiedToastActive} />
  ) : null;

  return (
    <Frame>
      <div className="home-wrapper">
        <div className="home-wrapper__body">
          <SearchCol toggleCopiedToast={toggleIsCopiedToastActive} />
          <NominationsCol />
        </div>
      </div>
      {completedToastMarkup}
      {copiedToastMarkup}
    </Frame>
  );
};

export default HomePage;
