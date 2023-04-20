import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./LicensePlateScanStyles.css";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import VerifiedIcon from "@mui/icons-material/Verified";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { log } from "console";

interface LicensePlateProps {
  licensePlateButtonScanSuccessText: string;
  licensePlateButtonScanSucessRoute: string;
  licensePlateButtonRescanText: string;
  getExitGatelicensePlate?: (data: string) => void;


}

function LicensePlateScan({ licensePlateButtonScanSuccessText, licensePlateButtonScanSucessRoute, licensePlateButtonRescanText, getExitGatelicensePlate }: LicensePlateProps): JSX.Element {
  const navigate: NavigateFunction = useNavigate();
  // useState hook to store the licence plate number
  const [licensePlate, setLicensePlate] = useState<string>("61A495J");
  if (getExitGatelicensePlate) {
    getExitGatelicensePlate(licensePlate);
  }



  const handleRescanLicensePlace = (): void => {
    setLicensePlate("61A49YX");
  };

  const handleLicensePlateSuccess = (): void => {
    navigate(licensePlateButtonScanSucessRoute, {
      state: {
        licensePlate: licensePlate,
      }
    });
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
    <div className={"license-plate-scan-container"}>
      <Container fluid>
        <Row>
          <Col>
            <h1>License Plate: {licensePlate}</h1>
          </Col>
          
          <Col>
            <Row className={"license-plate-row"}>
              <Col>
                <h1>License Plate: {licensePlate}</h1>
              </Col>
              <Col className={"license-plate-scan-buttons-container"}>
                <Row>
                  <Col>
                    <DocumentScannerIcon
                      sx={{ fontSize: "50px" }}
                      onClick={handleRescanLicensePlace}
                    />
                    <Row>
                      <Col>
                      <br />
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={handleRescanLicensePlace}
                        >
                          {licensePlateButtonRescanText}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                  </Col>
                  <Col>
                  </Col>
                  <Col>
                    <VerifiedIcon sx={{ fontSize: "50px" }} />
                    <Row>
                      <Col>
                      <br />
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={handleLicensePlateSuccess}
                        >
                          {licensePlateButtonScanSuccessText}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default LicensePlateScan;
