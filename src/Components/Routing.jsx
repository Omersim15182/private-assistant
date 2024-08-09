// Routing.js

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./Menu";
import CreateBoard from "../Pages/CreateBoard";
import Boards from "./Board/Boards";
import Chat from "./Chat/Chat";
import Profile from "./InfoAccount/Profile";
import Account from "./InfoAccount/Account";
import Logout from "./InfoAccount/Logout";
import SignIn from "./LoginSignup/SignIn";

function Routing() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/CreateBoard" element={<CreateBoard />} />
        <Route path="/Boards" element={<Boards />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default Routing;
