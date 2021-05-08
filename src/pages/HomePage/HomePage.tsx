import React, {
  useReducer,
  createContext,
  useCallback,
  useState,
  useEffect,
  useContext,
} from "react";
import { Toast, Frame, Modal, TextContainer, Caption } from "@shopify/polaris";
import Header from "../../components/Header/Header";
import SearchCol from "../../components/SearchCol/SearchCol";
import NominationsCol from "../../components/NominationsCol/NominationsCol";
import { IMovieDetails } from "../../shared/interfaces";
import { NOMINATION_NUMBER, SCREEN_WIDTH_LG } from "../../shared/constants";
import { UserContext, UserReducerActions } from "../../AppContext";
import useScreenWidth from "../../shared/useScreenWidth";
import { getMovieDetails } from "../../services/movieservice";

const HomePage = () => {
  const {
    user: { nominations },
    dispatchUser,
  } = useContext(UserContext);
  const screenWidth = useScreenWidth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<IMovieDetails>();

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
      window.scroll({ top: 0, behavior: "smooth" });
      toggleIsCompletedToastActive();
    }
  }, [nominations]);

  const handleModal = useCallback(() => setIsModalOpen(!isModalOpen), [
    isModalOpen,
  ]);
  const displayMovieDetails = async (id: string) => {
    const details = await getMovieDetails(id, true);
    setCurrentMovie(details);
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

  const generateMovieInfo = ((): JSX.Element => {
    const imdbRating =
      !currentMovie?.imdbRating || currentMovie?.imdbRating === "N/A"
        ? "No rating"
        : currentMovie?.imdbRating;
    const rated =
      !currentMovie?.Rated || currentMovie?.Rated === "N/A"
        ? "Not rated"
        : currentMovie?.Rated;
    const runtime =
      !currentMovie?.Runtime || currentMovie?.Runtime === "N/A"
        ? "Unknown runtime"
        : currentMovie?.Runtime;
    const director =
      !currentMovie?.Director || currentMovie?.Director === "N/A" ? (
        "Unknown director"
      ) : (
        <>
          <b>Director</b>: {currentMovie?.Director}
        </>
      );
    const actors =
      !currentMovie?.Actors || currentMovie?.Actors === "N/A" ? (
        "Unknown actor(s)"
      ) : (
        <>
          <b>Actors</b>: {currentMovie?.Actors}
        </>
      );
    const plot =
      !currentMovie?.Plot || currentMovie?.Plot === "N/A"
        ? "No plot description available."
        : currentMovie?.Plot;
    return (
      <div className="details-modal__inner-container">
        <div className="poster-col">
          <img
            className="poster-container"
            src={currentMovie?.Poster}
            alt={`${currentMovie?.Title} poster`}
          />
        </div>
        <div className="info-col">
          <div>
            <h1 className="movie-title">{currentMovie?.Title}</h1>
            <h2>
              {currentMovie?.Year} &bull; {currentMovie?.Genre}
            </h2>
            <div className="rating-container">
              <img src="./star.svg" alt="movie rating" className="star" />
              <span>
                {imdbRating} &bull; {rated} &bull; {runtime}
              </span>
            </div>
            <Caption>{director}</Caption>
            <Caption>{actors}</Caption>
            <div className="plot-container">
              <p className="plot">{plot}</p>
            </div>
          </div>
        </div>
      </div>
    );
  })();

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
      <Modal
        open={isModalOpen}
        title={currentMovie?.Title}
        onClose={handleModal}
      >
        <Modal.Section>
          <TextContainer>{generateMovieInfo}</TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
};

export default HomePage;
