import { useState } from "react";
import "./App.css";
import DemoFetchApi from "./components/DemoFetchApi";
import DemoAxios from "./components/DemoAxios";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <DemoFetchApi /> */}
      <DemoAxios />
    </>
  );
}

export default App;
