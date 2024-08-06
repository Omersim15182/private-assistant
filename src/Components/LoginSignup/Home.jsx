import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Button from "@mui/material/Button";

export default function Home() {
  const [displayLogin, setDisplayLogin] = useState(true);

  const showLogin = () => {
    setDisplayLogin(true);
  };

  const showSignup = () => {
    setDisplayLogin(false);
  };

  return (
    <div>
      {displayLogin ? (
        <div>
          <Login />
          <Button variant="contained" color="primary" onClick={showSignup}>
            Go to Signup
          </Button>
        </div>
      ) : (
        <div>
          <Signup />
          <Button variant="contained" color="primary" onClick={showLogin}>
            Go to Login
          </Button>
        </div>
      )}
    </div>
  );
}
