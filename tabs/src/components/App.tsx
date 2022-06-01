import React from "react";
// https://fluentsite.z22.web.core.windows.net/quick-start
import { Button, FluentProvider, Spinner } from "@fluentui/react-components";

import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import { useTeamsFx } from "./sample/lib/useTeamsFx";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import OneProductivityHub from "./OneProductivityHub";
import "./App.css";
import TabConfig from "./TabConfig";
import { useGraphToolkit } from "./sample/lib/useGraphToolkit";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { loading } = useTeamsFx();
  const { teamsTheme } = useGraphToolkit();
  return (
    <FluentProvider theme={teamsTheme}>    
      <Router>
        <Route exact path="/">
          <Redirect to="/tab" />
        </Route>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/termsofuse" component={TermsOfUse} />
            <Route exact path="/tab" component={OneProductivityHub} />
            <Route exact path="/config" component={TabConfig} />
          </>
        )}
      </Router>
    </FluentProvider>
  );
}
