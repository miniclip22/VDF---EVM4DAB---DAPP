import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./OpenGateScreen.css";
import { useLocation, useNavigate } from "react-router-dom";
import SyncIcon from "@mui/icons-material/Sync";
import Spinner from 'react-bootstrap/Spinner';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function OpenGateScreen(): JSX.Element {
  const location = useLocation();
  let licensePlate = location.state.licensePlate;
  const navigate = useNavigate();

  const [sessionHash, setSessionHash] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSessionHash("Session-Hash-1234");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenGateScreen = (): void => {
    navigate("/exit-gate");
  };


  return (
    <>
    <Row>
      <Col className="page-name-container">
        <h1>System</h1>
      </Col>
      <Col className="page-name-container">
      <h1>User</h1>
      </Col>
    </Row>
    <div className={"open-gate-container"}>
      <Container fluid>
        <Row>
          <Col>
            <h1>Getting DAB device ID for licence plate {licensePlate}</h1>
          </Col>
          {/* <Col xs="auto" className="left-border"></Col> */}
          <Col>
            <h1>
              Please move forward when the gate opens. <br /> Welcome to our
              service.
            </h1>
            <br />
            <Button
              variant="primary"
              size="lg"
              onClick={handleOpenGateScreen}
              disabled={sessionHash === ''}
            >
              <h3>Simulate Parking Exit!</h3>
            </Button>
          </Col>
        </Row>

        <Row>
          {/* // TODO: Optionally remove the react grid (column and rows) and do this with pure CSS */}
          {sessionHash === '' ? (<Col>
            <Row>
              <Col xs={11}>
                <h2>Checking with DAB to see if the car <br /> can enter the park (open gate)</h2>
                <br />
                <br />
                <Spinner animation="border" variant="primary" style={{ width: "50px", height: "50px" }}/>
              </Col>
              
            </Row>

          </Col>) : (
            <Col>
              <Row>
                <Col>
                  <h2>Success. Opening gate. Session Hash: {sessionHash}.</h2>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <CheckCircleIcon sx={{ fontSize: "50px" }} />
                </Col>
              </Row>
            </Col>
          )}
          <Col></Col>
        </Row>
        <br />
      </Container>
    </div>
    </>
  );
}

export default OpenGateScreen;