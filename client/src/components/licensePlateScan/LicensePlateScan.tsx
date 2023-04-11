import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./LicensePlateScanStyles.css";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import VerifiedIcon from "@mui/icons-material/Verified";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface LicensePlateProps {
  licensePlateButtonScanSuccessText: string;
  licensePlateButtonScanSucessRoute: string;
  getExitGatelicensePlate?: (data: string) => void;


}

function LicensePlateScan({ licensePlateButtonScanSuccessText, licensePlateButtonScanSucessRoute, getExitGatelicensePlate }: LicensePlateProps): JSX.Element {
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
                      <Col>Rescan</Col>
                    </Row>
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
  );
}

export default LicensePlateScan;
