import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./components/Login";
import Signup from "./components/Signup";
import HomepageLayout from "./components/Home";
import ItemList from "./components/ItemList";

const BaseRouter = () => (
  <Hoc>
    <Route path="/items" component={ItemList} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route exact path="/" component={ItemList} />
  </Hoc>
);

export default BaseRouter;
