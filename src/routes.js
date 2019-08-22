import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import HomepageLayout from "./containers/Home";
import ItemList from "./containers/ItemList";

const BaseRouter = () => (
  <Hoc>
    <Route path="/items" component={ItemList} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={ItemList} />
  </Hoc>
);

export default BaseRouter;
