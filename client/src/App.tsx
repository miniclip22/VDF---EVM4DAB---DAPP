import { EthProvider } from "./contexts/EthContext"; 
import Demo from "./components/Demo"; 
import React from "react"; 
import "./styles/Home.css"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home";
import Session from "./pages/Session";




function App() {
   return (<EthProvider>      
    {/*<div id="App">*/}      
    {/*  <div className="container">*/}      
    {/*    /!*<Demo />*!/*/}      
    {/*  </div>*/}      
    {/*</div>*/}      
    <div>        
      <Router>          
        <Routes>            
          <Route path="/" element={<Home/>} />                     
          <Route path="/session" element={<Session />} />                    
        </Routes>        
      </Router>      
    </div>    
    </EthProvider>); }

export default App;
