import { useContext, useEffect, useState } from "react";
import { Button, TextField, Icon } from "@shopify/polaris";
import { ClipboardMinor } from "@shopify/polaris-icons";
import CustomCard from "../Card/Card";
import { NominationsContext } from "../../pages/HomePage/HomePage";
import { IMovieMeta } from "../../shared/interfaces";

const ShareCard = () => {
  const { nominations } = useContext(NominationsContext);
  const [shareLink, setShareLink] = useState("");

  useEffect(() => {
    const newShareLink = nominations.nominations.reduce(
      (acc: string, cur: IMovieMeta) => {
        acc += cur.imdbID + "-";
        return acc;
      },
      "baseurl/"
    );
    setShareLink(newShareLink);
  }, [nominations]);
  return (
    <div className="movie-card__container">
      <CustomCard>
        <div className="share-card__inner-container">
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
            <TextField
              label="Search movies"
              labelHidden
              value={shareLink}
              onChange={() => {}}
              prefix={<Icon source={ClipboardMinor} color="base" />}
            />
            <Button primary>Submit Nominations</Button>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

export default ShareCard;
