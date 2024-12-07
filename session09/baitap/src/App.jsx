import { useState } from "react";
import "./App.css";
import DemoCallApi from "./components/DemoCallApi";
import Users from "./components/Users";
import Movies from "./components/Movies";
import Accounts from "./components/Accounts";
import ManagerEmployee from "./components/ManagerEmployee";

function App() {
  return (
    <>
      {/* <DemoCallApi /> */}
      {/* <Users /> */}
      {/* <Movies /> */}
      {/* <Accounts /> */}
      <ManagerEmployee />
    </>
  );
}

export default App;
