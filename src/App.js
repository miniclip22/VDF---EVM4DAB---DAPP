
import "./styles/Home.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Session from "./pages/Session";
import Help from "./pages/Help";
import About from "./pages/About";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/session" element={<Session />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;