import { useEffect, useState } from "react";
import CustomCard from "../../components/Card/Card";
import { TextField, Button, Form } from "@shopify/polaris";

const LoginPage = () => {
  return (
    <div className="login-card-container">
      <CustomCard className="login-card">
        <h1>the shoppies</h1>
        <h2>Sign in to nominate</h2>
        <Form onSubmit={() => {}}>
          <div className="form-container">
            <TextField label="Username" value="" onChange={() => {}} />
            <TextField
              label="Password"
              type="password"
              value=""
              onChange={() => {}}
            />
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
