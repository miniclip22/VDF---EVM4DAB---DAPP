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

  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSessionId("session-id-1234");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenGateScreen = (): void => {
    navigate("/exit-gate");
  };


  return (
    <div className={"open-gate-container"}>
      <Container fluid>
        <Row>
          <Col>
            <h1>Getting DAB device ID for licence plate {licensePlate}</h1>
          </Col>
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
            >
              Simulate Parking Exit!
            </Button>
          </Col>
        </Row>

        <Row>
          {/* // TODO: Optionally remove the react grid (column and rows) and do this with pure CSS */}
          {sessionId === '' ? (<Col>
            <Row>
              <Col xs={11}>
                Checking with DAB to see if the car can enter the park (open gate)
              </Col>
              <Col xs={1}><Spinner animation="border" variant="primary" /></Col>
            </Row>

          </Col>) : (
            <Col>
              <Row>
                <Col>
                  Success. Opening gate. Session ID: {sessionId}.
                </Col>
              </Row>
              <Row>
                <Col>
                  <CheckCircleIcon sx={{ fontSize: "40px" }} />
                </Col>
              </Row>
            </Col>
          )}
          <Col></Col>
        </Row>
        <br />
      </Container>
    </div>
  );
}

export default OpenGateScreen;