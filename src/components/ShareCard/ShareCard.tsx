import { useContext, useEffect, useState, useCallback } from "react";
import { Button, TextField, Icon, Toast, Frame } from "@shopify/polaris";
import { ClipboardMinor } from "@shopify/polaris-icons";
import CustomCard from "../Card/Card";
import { UserContext, UserReducerActions } from "../../AppContext";
import { IMovieMeta } from "../../shared/interfaces";

const ShareCard = () => {
  const { nominations, dispatchNominations } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const [isToastActive, setIsToastActive] = useState(false);
  const toggleIsToastActive = useCallback(
    () => setIsToastActive((active) => !active),
    []
  );
  const toastMarkup = isToastActive ? (
    <Toast content="Copied 📋" onDismiss={toggleIsToastActive} />
  ) : null;

  useEffect(() => {
    const newShareLink = nominations.nominations.reduce(
      (acc: string, cur: IMovieMeta) => {
        acc += cur.imdbID + "-";
        return acc;
      },
      `${process.env.REACT_APP_BASE_URL}/nominations?data=`
    );
    setShareLink(newShareLink.slice(0, newShareLink.length - 1));
  }, [nominations]);

  const restart = () => {
    dispatchNominations({ type: UserReducerActions.CLEAR_MOVIES });
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    toggleIsToastActive();
  };

  const generateShareCardContents = ((): JSX.Element => {
    if (!isSubmitted) {
      return (
        <>
          <img
            src="./nominations_complete.svg"
            height={200}
            width={200}
            alt="Nominations complete"
          />
          <div>
            <h1 className="title">Nominations complete!</h1>
            <p className="body">You can delete nomination if you want.</p>
          </div>
          <div className="button-container">
            <Button primary onClick={() => setIsSubmitted(true)}>
              Submit Nominations
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <img
            src="./nominations_complete.svg"
            height={200}
            width={200}
            alt="Nominations complete"
          />
          <div>
            <h1 className="title">You've got good taste!</h1>
            <p className="body">
              Copy the link and share your nominations with the world
            </p>
          </div>
          <div className="button-container">
            <div onClick={copyShareLink}>
              <TextField
                label="Share link"
                labelHidden
                value={shareLink}
                onChange={() => {}}
                prefix={<Icon source={ClipboardMinor} color="base" />}
              />
            </div>
          </div>
          <div className="button-container">
            <Button outline size="slim" onClick={restart}>
              Restart
            </Button>
          </div>
        </>
      );
    }
  })();

  return (
    <Frame>
      <div className="movie-card__container">
        <CustomCard>
          <div className="share-card__inner-container">
            {generateShareCardContents}
          </div>
        </CustomCard>
      </div>
      {toastMarkup}
    </Frame>
  );
};

export default ShareCard;
