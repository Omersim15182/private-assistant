// Routing.js

import React from "react";
import { Route, Routes } from "react-router-dom";
import MenuBar from "../Components/MenuBar";
import CreateBoard from "../Pages/CreateBoard";
import Boards from "./Board/Boards";
import Chat from "./chat/Chat";
import Profile from "./InfoAccount/Profile";
import Account from "./InfoAccount/Account";
import Logout from "./InfoAccount/Logout";
import Login from "./LoginSignup/Login";
import SignUp from "./LoginSignup/Signup";

function Routing() {
  return (
    <div>
      <MenuBar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
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
