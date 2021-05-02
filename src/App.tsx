import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import enTranslations from "@shopify/polaris/locales/en.json";

import HomePage from "./pages/HomePage/HomePage";
import NominationsPage from "./pages/NominationsPage/NominationsPage";

import "./styles/main.scss";
import "@shopify/polaris/dist/styles.css";

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <AppProvider i18n={enTranslations}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/nominations" component={NominationsPage} />
          </Switch>
        </AppProvider>
      </Router>
    </div>
  );
}

export default App;
