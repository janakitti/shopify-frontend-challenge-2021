import { useContext } from "react";
import { Avatar, Button } from "@shopify/polaris";
import { UserContext, UserReducerActions } from "../../UserContext";
import { useHistory } from "react-router-dom";

const UserAvatar = () => {
  let history = useHistory();
  const {
    user: { username },
    dispatchUser,
  } = useContext(UserContext);

  // Clear locally stored data
  const handleLogout = () => {
    dispatchUser({ type: UserReducerActions.LOGOUT });
    localStorage.setItem("shoppies-username", "");
    localStorage.setItem("shoppies-nominations", "");
    history.push("/");
  };

  return (
    <div className="username-container">
      <Button outline size="slim" onClick={handleLogout}>
        Logout
      </Button>
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
