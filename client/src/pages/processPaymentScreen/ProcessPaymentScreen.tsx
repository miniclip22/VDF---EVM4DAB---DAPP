import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useLocation } from "react-router-dom";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import VerifiedIcon from "@mui/icons-material/Verified";
import "./ProcessPaymentScreenStyles.css";


// TODO: put this in reusable components

const ProcessPaymentScreen = (): JSX.Element => {


    const location = useLocation();
    const navigate = useNavigate();
    let licensePlate = location.state.licensePlate;
    // TODO: retrieve session hash
    // TODO: get current block number

    const [timeElapsedinMinutes, setTimeElapsedInMinutes] =
        useState<number>(0);

    // TODO: have a service that converts the ETH payment from the session hash to Euros, Pounds, etc
    const [totalPayment, setTotalPayment] =
        useState<number>(0);
    const [paymentBeingProcessed, setPaymentBeingProcessed] = useState<boolean>(false);
    const [paymentProcessed, setPaymentProcessed] = useState<boolean>(false);

    const [localLicensePlate, setLocalLicensePlate] = useState<string>(licensePlate);


    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setTimeElapsedInMinutes(50);
        }, 3000);

        const timeout2 = setTimeout(() => {
            setTotalPayment(5);
        }, 5000);



        // Cleanup function to clear timeouts if component unmounts or data is set
        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, []);

    const handlePaymentConfirmation = (): void => {
        setPaymentBeingProcessed(true);
        setTimeout(() => {
            setPaymentProcessed(true);
            navigate("/open-exit-gate", {
                state: {
                    licensePlate: licensePlate,
                }
            });
        }, 5000);

    };


    const renderSystemTimeInformation = (): JSX.Element => {
        if (timeElapsedinMinutes === 0) {
            return (
                <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                    <Row className="rowStyle">
                        <Col xs={6}>
                            <h3>Calculating time elapsed. Please wait.   <Spinner animation="border" variant="primary" /></h3>

                        </Col>

                    </Row>
                </Container>
            );
        } else {
            return (
                <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                    <Row>
                        <Col>
                            <h3> Time elapsed: {timeElapsedinMinutes} minutes. <br /> </h3>
                        </Col>
                    </Row>
                </Container>
            );
        }
    };

    const renderSystemPaymentInformation = (): JSX.Element => {
        if (totalPayment === 0) {
            return (
                <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                    <Row className="rowStyle">
                        <Col xs={6}>
                            <h3>Calculating total payment. Please wait.   <Spinner animation="border" variant="primary" /></h3>
                        </Col>

                    </Row>
                </Container>

            );
        } else {
            return (
                <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                    <Row>

                        <h3> Total Payment: {totalPayment} Euro. <br /> </h3>

                    </Row>
                </Container>
            );
        }
    };

    const renderPaymentConfirmation = (): JSX.Element => {
        if (paymentBeingProcessed) {
            return (
                <>
                    <Container fluid className="payment-confirmation-container">
                        <Row>
                            <Col id="payment-confirmation-text2" className="payment-confirmation-text">
                            <div>
                                <h2>Payment autorized and being processed...</h2>
                            </div>
                            <div className="payment-confirmation-spinner">
                                <Spinner animation="border" variant="primary" />
                            </div>
                            </Col>


                            <Col>

                            </Col>
                        </Row>

                        <Row>
                            <Col>

                            </Col>

                            <Col>

                            </Col>
                        </Row>

                        <br />

                        <Row>
                            <Col>
                                <h2>Calling DAB for payment confirmation and waiting for release.</h2>
                            </Col>

                            <Col>

                            </Col>
                        </Row>
                    </Container>
                </>
            );
        }
        else {
            return null;
        }
    }



    const handleRescanLicensePlace = (): void => {
        setLocalLicensePlate("61A49YX");
      };







    const renderPaymentIcons = () => {
        let paymentElement = <>  </>

        if (!paymentBeingProcessed && totalPayment > 0 && timeElapsedinMinutes > 0) {
            paymentElement = <Col className="btns">
            <VerifiedIcon sx={{ fontSize: "50px" }} />
            <Row>
                <Col >
                    <br />
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handlePaymentConfirmation}
                        disabled={paymentBeingProcessed}
                    >
                        Pay
                    </Button>
                </Col>
            </Row>
        </Col>
        } else if (paymentBeingProcessed){
            paymentElement = <Col className="btns">
            <VerifiedIcon sx={{ fontSize: "50px" }} />
            <Row>
                <Col >
                    <br />
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handlePaymentConfirmation}
                        disabled={paymentBeingProcessed}
                    >
                        Payment received and being processed. Please wait...
                    </Button>
                </Col>
            </Row>
        </Col>

        }

        return (<Col>
            <Row>
                <Col className="payment-Buttons-Container">
                    <Row className="btnsRow">
                        {!paymentBeingProcessed && totalPayment > 0 && timeElapsedinMinutes > 0 ? (
                            <Col className="btns">
                                <DocumentScannerIcon sx={{ fontSize: '50px' }} />
                                <Row>
                                    <Col>
                                        <br />
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={handleRescanLicensePlace}
                                        >
                                            Rescan
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        ) : null}
                        {paymentElement}
                    </Row>
                </Col>
            </Row>
        </Col>);
    }

    const renderUserTimeInformation = (): JSX.Element => {
        if (timeElapsedinMinutes > 0) {
            return (<Col>
                <Row>


                    <h3 className="center"> License Plate: {localLicensePlate}, <br /> Entry time: 12:00, <br /> Exit time: 12:50 </h3>

                </Row>
            </Col>);
        }
        else {
            return (<Col>
            </Col>);
        }
    }

    const renderUserPaymentMessageAndConfirmation = (): JSX.Element => {
        if (totalPayment === 0) {
            return (<Col>
            </Col>);
        } else if (totalPayment > 0 && timeElapsedinMinutes > 0) {
            return (<Col>
                <Row>
                    <Col>
                        <h1 className="center">  Your session will cost {totalPayment} Euro. <br /> </h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h3 className="center">   Do you agree? </h3>
                    </Col>
                </Row>
            </Col>);
        }


    }



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
        <Container fluid>
            <Row>
                <Col>
                    {renderSystemTimeInformation()}
                </Col>
                {renderUserTimeInformation()}
            </Row>
            <Row>
                <Col>
                    {renderSystemPaymentInformation()}
                </Col>
                {renderUserPaymentMessageAndConfirmation()}
            </Row>
            <Row>
                <Col>
                </Col>
                {renderPaymentIcons()}
            </Row>
            {renderPaymentConfirmation()}
        </Container>
        </>
    );
};

export default ProcessPaymentScreen;


