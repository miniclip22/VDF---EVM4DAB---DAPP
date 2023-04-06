import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./LicensePlateScanStyles.css";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import VerifiedIcon from "@mui/icons-material/Verified";

function LicensePlateScan(): JSX.Element {
  // useState hook to store the licence plate number
  const [licensePlate, setLicensePlate] = useState<string>("61A495J");

  const handleRescanLicensePlace = (): void => {
    setLicensePlate("61A49YX");
  };

  return (
    <div className={"license-plate-scan-container"}>
      <Container fluid>
        <Row>
          <Col>
            <h1>Licence Plate: {licensePlate}</h1>
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
                      sx={{ fontSize: "40px" }}
                      onClick={handleRescanLicensePlace}
                    />
                    <Row>
                      <Col>Rescan</Col>
                    </Row>
                  </Col>
                  <Col>
                    <VerifiedIcon sx={{ fontSize: "40px" }} />
                    <Row>
                      {/*TODO: Implement next flows*/}
                      <Col>Validate and Proceed</Col>
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
