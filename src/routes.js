import React from "react";
import { Route, Switch } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./components/Login";
import Signup from "./components/Signup";
import HomepageLayout from "./components/Home";
import ItemList from "./components/ItemList";
import TripDetail from "./components/TripDetail";
import Slider from "./components/Slider";
import Error from "./components/Error";
const BaseRouter = () => (
  <Hoc>
    <Switch>
      <Route exact path="/trips" component={ItemList} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/" component={HomepageLayout} />
      <Route exact path="/trips/:slug" component={TripDetail} />
      <Route component={Error} />
    </Switch>
  </Hoc>
);

export default BaseRouter;
