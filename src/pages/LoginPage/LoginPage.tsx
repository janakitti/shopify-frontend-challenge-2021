import { useState, useCallback, useContext } from "react";
import CustomCard from "../../components/Card/Card";
import { TextField, Button, Form, InlineError } from "@shopify/polaris";
import { USER_PASSWORD } from "../../shared/constants";
import { useHistory } from "react-router-dom";
import { UserContext, UserReducerActions } from "../../AppContext";

const LoginPage = () => {
  let history = useHistory();
  const { dispatchUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erroMsg, setErrorMsg] = useState("");

  const handleLogin = useCallback(
    (_event) => {
      if (!username || !password) {
        setErrorMsg("Please enter your credentials.");
        return;
      } else if (password === USER_PASSWORD) {
        dispatchUser({ type: UserReducerActions.LOGIN, payload: { username } });
        history.push("/search");
      } else {
        setErrorMsg("Username or password is incorrect.");
      }
    },
    [username, password]
  );

  return (
    <div className="login-card-container">
      <CustomCard className="login-card">
        <h1>the shoppies</h1>
        <h2>Sign in to nominate</h2>
        <Form onSubmit={handleLogin}>
          <div className="form-container">
            <TextField
              label="Username"
              value={username}
              onChange={setUsername}
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
    </div>
  );
};

export default LoginPage;
