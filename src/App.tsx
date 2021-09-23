import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./components/pages/HomePage";
import OverView from "./components/pages/OverView";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/overview" component={OverView} exact />
        <Route path="/" component={HomePage} exact />
      </Switch>
    </Router>
  );
};

export default App;
