import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Shelves from "./Shelves";
import Create from "./Create";

function Home() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Shelves />} />
        <Route path="/create" component={Create} />
      </Switch>
    </Router>
  );
}

export default Home;
