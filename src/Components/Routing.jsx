// Routing.js

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../Components/LoginSignup/Home";
import Menu from "./Menu";
import CreateBoard from "../Pages/CreateBoard";
import Boards from "./Board/Boards";
import Chat from "./Chat/Chat";
import Profile from "./InfoAccount/Profile";
import Account from "./InfoAccount/Account";
import Logout from "./InfoAccount/Logout";

function Routing() {
  return (
    <Router>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Home" exact component={Home} />
        <Route path="/Chat" component={Chat} />
        <Route path="/CreateBoard" component={CreateBoard} />
        <Route path="/Boards" component={Boards} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Account" component={Account} />
        <Route path="/Logout" component={Logout} />
      </Switch>
    </Router>
  );
}

export default Routing;
