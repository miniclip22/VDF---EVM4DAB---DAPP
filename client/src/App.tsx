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
import LicensePlateScanScreen from "./pages/licensePlateScanScreen/LicensePlateScanScreen";
import OpenGateScreen from "./pages/openGate/OpenGateScreen";
import ExitGateScreen from "./pages/exitGate/ExitGateScreen";
import ProcessPaymentScreen from "./pages/processPaymentScreen/ProcessPaymentScreen";
import OpenExitGate from "./pages/openExitGate/OpenExitGate";
// create a css file global for all pages 


function App(): JSX.Element {
  return (
    <EthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/license-plate-scan" element={<LicensePlateScanScreen />} />
          <Route path="/open-gate" element={<OpenGateScreen />} />
          <Route path="/exit-gate" element={<ExitGateScreen />} />
          <Route path="/process-exit-payment" element={<ProcessPaymentScreen />} />
          <Route path="/open-exit-gate" element={<OpenExitGate/>} />

        </Routes>
      </Router>
    </EthProvider>
  );
}

export default App;
