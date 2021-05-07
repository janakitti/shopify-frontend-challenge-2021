import React, {
  useReducer,
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { Toast, Frame, Modal } from "@shopify/polaris";
import Header from "../../components/Header/Header";
import SearchCol from "../../components/SearchCol/SearchCol";
import NominationsCol from "../../components/NominationsCol/NominationsCol";
import { IMovieMeta } from "../../shared/interfaces";
import { NOMINATION_NUMBER, SCREEN_WIDTH_LG } from "../../shared/constants";
import { UserContext, UserReducerActions } from "../../AppContext";
import useScreenWidth from "../../shared/useScreenWidth";

const HomePage = () => {
  const {
    user: { nominations },
    dispatchUser,
  } = useContext(UserContext);
  const screenWidth = useScreenWidth();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleModal = useCallback(() => setIsModalOpen(!isModalOpen), [
    isModalOpen,
  ]);
  const displayMovieDetails = async (id: string) => {
    setIsModalOpen(true);
  };

  const [isNominatedToastActive, setIsNominatedToastActive] = useState(false);
  const toggleIsNominatedToastActive = useCallback(
    () => setIsNominatedToastActive((active) => !active),
    []
  );
  const nominatedToastMarkup =
    isNominatedToastActive && screenWidth && screenWidth < SCREEN_WIDTH_LG ? (
      <Toast
        content="Nomination added below!"
        onDismiss={toggleIsNominatedToastActive}
        duration={1500}
      />
    ) : null;

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
    <>
      <Frame>
        <div className="home-wrapper">
          <div className="home-wrapper__body">
            <SearchCol
              toggleCopiedToast={toggleIsCopiedToastActive}
              toggleNominatedToast={toggleIsNominatedToastActive}
              displayMovieDetails={displayMovieDetails}
            />
            <NominationsCol />
          </div>
        </div>
        {nominatedToastMarkup}
        {completedToastMarkup}
        {copiedToastMarkup}
      </Frame>
      <Modal open={isModalOpen} title="Details" onClose={handleModal}></Modal>
    </>
  );
};

export default HomePage;
