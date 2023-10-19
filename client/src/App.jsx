import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="callback" element={<Callback />} />
    </Routes>
  );
}

export default App;
