import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import "./LicensePlateScanScreenStyles.css";
import LicensePlateScan from "../../components/licensePlateScan/LicensePlateScan";

function LicensePlateScanScreen(): JSX.Element {
  return (
    <div>
      <LicensePlateScan
        licensePlateButtonScanSuccessText="Validate!"
        licensePlateButtonScanSucessRoute="/open-gate"
      />
    </div>
  );
}

export default LicensePlateScanScreen;
