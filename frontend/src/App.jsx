import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import History from "./Pages/History";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/history" element={ <History />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
