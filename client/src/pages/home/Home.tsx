import { Button, Col, Container, Row } from "react-bootstrap";
import React from "react";
import "./homeStyles.css";
import { NavigateFunction, useNavigate } from "react-router-dom";


function Home(): JSX.Element {
  const navigate: NavigateFunction = useNavigate();

  const handleStartParkingSessionClick = (): void => {
    // navigate to licence plate scan page
    navigate("/license-plate-scan");
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
    <div className={"home-container"}>
      <Container fluid>
        <Row>
          <Col>
            <h1>License Plate: </h1>
          </Col>
          
          <Col>
            <Row className={"parking-intro-row"}>
              <Col>
                <h1>Welcome to the Parking Service.</h1>
              </Col>
              <br />
              <Col>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleStartParkingSessionClick}
                >
                  <h4>Start Parking Session</h4>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default Home;
