import { useState, useEffect, useCallback, useContext } from "react";
import CustomCard from "../../components/Card/Card";
import { TextField, Button, Form, InlineError } from "@shopify/polaris";
import { MAX_USERNAME_LENGTH, USER_PASSWORD } from "../../shared/constants";
import { useHistory } from "react-router-dom";
import { UserContext, UserReducerActions } from "../../AppContext";
import PopAnimationWrapper from "../../components/Motion/PopAnimationWrapper";

const LoginPage = () => {
  let history = useHistory();
  const { dispatchUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erroMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("shoppies-username");
    if (storedUsername) {
      history.push("/search");
    }
  }, [history, dispatchUser]);

  const handleLogin = useCallback(
    (_event) => {
      if (!username || !password) {
        setErrorMsg("Please enter your credentials.");
        return;
      } else if (password === USER_PASSWORD) {
        dispatchUser({ type: UserReducerActions.LOGIN, payload: { username } });
        localStorage.setItem("shoppies-username", username);
        history.push("/search");
      } else {
        setErrorMsg(`Pssst, the password is "shoppies"`);
      }
    },
    [username, password, history, dispatchUser]
  );

  return (
    <div className="login-card-container">
      <PopAnimationWrapper delay={0}>
        <CustomCard className="login-card">
          <div className="login-card__logo-container">
            <img src="./shopify_logo.svg" className="logo__img" alt="logo" />
            <h1 className="logo__name">the shoppies</h1>
          </div>
          <h2>Movie awards for entrepreneurs</h2>
          <Form onSubmit={handleLogin}>
            <div className="form-container">
              <TextField
                label="Username"
                value={username}
                onChange={setUsername}
                maxLength={MAX_USERNAME_LENGTH}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                aria-describedby="password-field"
              />
              {erroMsg && (
                <InlineError message={erroMsg} fieldID="password-field" />
              )}

              <Button primary fullWidth submit>
                Log in
              </Button>
            </div>
          </Form>
        </CustomCard>
      </PopAnimationWrapper>
    </div>
  );
};

export default LoginPage;
