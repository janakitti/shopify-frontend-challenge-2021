import { useContext, useEffect, useState } from "react";
import { Button, TextField, Icon } from "@shopify/polaris";
import { ClipboardMinor } from "@shopify/polaris-icons";
import CustomCard from "../Card/Card";
import { UserContext, UserReducerActions } from "../../AppContext";
import { IMovieDetails, IMovieSearch } from "../../shared/interfaces";

interface IShareCardProps {
  toggleCopiedToast: () => void;
}

const ShareCard = ({ toggleCopiedToast }: IShareCardProps) => {
  const {
    user: { username, nominations },
    dispatchUser: dispatchNominations,
  } = useContext(UserContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    const newShareLink = nominations.reduce(
      (acc: string, cur: IMovieSearch) => {
        acc += cur.imdbID + "-";
        return acc;
      },
      `${process.env.REACT_APP_BASE_URL}/nominations?user=${username}&ids=`
    );
    setShareLink(newShareLink.slice(0, newShareLink.length - 1));
  }, [nominations]);

  const restart = () => {
    dispatchNominations({ type: UserReducerActions.CLEAR_MOVIES });
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    toggleCopiedToast();
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
            <h1 className="title">What a fine selection!</h1>
            <p className="body">
              Your nominations are ready to go! You can still remove a
              nomination if you'd like to edit your selection. Once you are
              ready, hit the button below.
            </p>
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
            src="./sent.svg"
            height={200}
            width={200}
            alt="Nominations complete"
          />
          <div>
            <h1 className="title">Your nominations are on their way!</h1>
            <p className="body">
              While we await the results of the Shoppies, you can copy this link
              and share your nominations with the world!
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
    <div className="movie-card__container">
      <CustomCard>
        <div className="share-card__inner-container">
          {generateShareCardContents}
        </div>
      </CustomCard>
    </div>
  );
};

export default ShareCard;
