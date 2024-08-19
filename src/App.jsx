import React from "react";
import "./App.css";
import Routing from "./Components/Routing";
import { DataProvider } from "./Pages/DataContext";

function App() {
  return (
    <div>
      <DataProvider>
        <Routing />
      </DataProvider>
    </div>
  );
}

export default App;
