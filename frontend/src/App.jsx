import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import History from "./Pages/History";
import Reports from "./Pages/Reports";
import Login from "./Pages/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/history" element={ <History />} />
          <Route path="/reports" element={ <Reports />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
