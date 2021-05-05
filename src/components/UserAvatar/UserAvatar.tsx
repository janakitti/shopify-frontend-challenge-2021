import { useContext } from "react";
import { Avatar } from "@shopify/polaris";
import { UserContext } from "../../AppContext";

const UserAvatar = () => {
  const {
    user: { username },
  } = useContext(UserContext);
  return (
    <div className="username-container">
      <p>{username}</p>
      <Avatar
        size="small"
        name="username"
        accessibilityLabel="User's username"
      />
    </div>
  );
};

export default UserAvatar;
