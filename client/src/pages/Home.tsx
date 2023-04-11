import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import NavBar from "../components/NavBar";




function Home(props: any) {
  return (
    <>
      <NavBar />

      <div className="img">

      </div>
      <br />
      <div className="container">
        <Card body>
          <Link to="/session">
            Start Parking Session
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