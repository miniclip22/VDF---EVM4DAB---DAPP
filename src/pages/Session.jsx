//create a page with a onclick button that says "stat session" and when clicked, replace the button to another button saying "end Session" and add a timer that counts up from 0


import React, { useState } from "react";
import MyTime from "../components/useTime";
import Html5QrcodePlugin from "../components/qrCode";
import Metamask from "../components/metamask";
import Button from 'react-bootstrap/Button';
import { useAddress } from "@thirdweb-dev/react"



function Session() {
    const [session, setSession] = useState(false);
   
    
    const address = useAddress()
   


    const startSession = () => {
        setSession(true);
        console.log("session started");
        console.log("address",address);
    };

    const endSession = () => {
        setSession(false);
        console.log("session ended");
        console.log("address",address);
    };  

    return (
        <>
         <div className="container">
            <br /> <br />
            {!session && <Button onClick={startSession}>Start Session</Button>}
            {session && <MyTime />}
            {session && <button onClick={endSession}>End Session</button>}
        </div> 
       
      
      
        
        </>
    );
    
}




export default Session;

//if metamask is connected, then show the qr code and timer, if not, then show the connect metamask button



