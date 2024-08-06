import React from "react";
import "./App.css";
import Routing from "./Components/Routing";
import { DataProvider } from "./Pages/DataContext";

require("dotenv").config();

function App() {
  return (
    <div>
      <DataProvider>
        <Routing></Routing>
      </DataProvider>
    </div>
  );
}

export default App;
