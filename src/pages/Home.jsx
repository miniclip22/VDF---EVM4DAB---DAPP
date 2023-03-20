import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import Metamask from "../components/metamask";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import NavBar from "../components/NavBar";






function Home() {
    return (
      <>
        <NavBar />

        <div className="img">

        </div>
        <br />
        <div className="container">
        <Card body>
          <Link to="/session"> 
            <Metamask />
          </Link>
        </Card>
        </div>
        <br />
        <div className="container2">
        
        </div>
        
      </>    
    );
    
}



export default Home;  

/* import { useAddress, useMetamask } from '@thirdweb-dev/react'
import Main from '../pages/Profile'


export default function Home() {

  const connectWithMetamask = useMetamask()
  const address = useAddress()

  console.log(address)
  
  const Auth = () => {
    return(
    <div>
      <button 
        onClick={connectWithMetamask}
      >
        Connect Metamask
      </button>
    </div>
    )
  }
  
  return <>{address ? <Main/> : Auth()}</>
} */


//if the user is connected, show the session page
//if the user is not connected, show the connect wallet button



