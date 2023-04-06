// function App() {
//   return (
//     <EthProvider>
//       <div id="App">
//         <div className="container">
//           <Demo />
//         </div>
//       </div>
//     </EthProvider>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { EthProvider } from "./contexts/EthContext";
import Home from "./pages/home/Home";
import LicensePlateScan from "./pages/LicensePlateScan/LicensePlateScan";

function App(): JSX.Element {
  return (
    <EthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/license-plate-scan" element={<LicensePlateScan />} />
        </Routes>
      </Router>
    </EthProvider>
  );
}

export default App;
