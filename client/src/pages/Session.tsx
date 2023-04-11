import React, { useState } from "react";
import { Link } from "react-router-dom";
import StartSession from "../components/MyTime";
import Qrcode from "../components/qrCodeComponent/qrCode";





function Session() {
   

    return (
        <>
         <div className="container">
            <Qrcode />
        </div> 
        </>
    );
    
}




export default Session; 