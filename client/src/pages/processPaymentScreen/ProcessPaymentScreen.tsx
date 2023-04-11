import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate, useLocation } from "react-router-dom";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import VerifiedIcon from "@mui/icons-material/Verified";


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
                <Row>
                    <Col xs={6}>
                        <h3>Calculating time elapsed. Please wait.</h3>
                    </Col>
                    <Col xs={1}>
                        <Spinner animation="border" variant="primary" />
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Col>
                       <h3> Time elapsed: {timeElapsedinMinutes} minutes. <br /> </h3>
                    </Col>
                </Row>
            );
        }
    };

    const renderSystemPaymentInformation = (): JSX.Element => {
        if (totalPayment === 0) {
            return (
                <Row>
                    <Col xs={6}>
                       <h3>Calculating total payment. Please wait. </h3> 
                    </Col>
                    <Col xs={1}>
                        <Spinner animation="border" variant="primary" />
                    </Col>
                </Row>
            );
        } else {
            return (
                <Row>
                    <Col>
                       <h3> Total Payment: {totalPayment} Euro. <br /> </h3>
                    </Col>
                </Row>
            );
        }
    };

    const renderPaymentConfirmation = (): JSX.Element => {
        if (paymentBeingProcessed) {
            return (
                <>
                    <Row>
                        <Col>
                            <h2>Payment autorized and being processed...</h2>
                        </Col>

                        <Col>

                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Spinner animation="border" variant="primary" />
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

                    </>
                    );
        }
                    else {
            return null;
        }
    }
    




    const renderPaymentIcons = () => {
        return (<Col>
                        <Row>
                            <Col className={""}>
                                <Row>
                                    {paymentBeingProcessed === false ? (
                                        <Col>
                                            <DocumentScannerIcon sx={{ fontSize: '50px' }} />
                                            <Row>
                                                <Col>
                                                <h6>Rescan</h6>
                                                </Col>
                                            </Row>
                                        </Col>
                                    ) : null}
                                    <Col>
                                        <VerifiedIcon sx={{ fontSize: "50px" }} />
                                        <Row>
                                            <Col>
                                                <br />
                                                <Button
                                                    variant="primary"
                                                    size="lg"
                                                    onClick={handlePaymentConfirmation}
                                                    disabled={paymentBeingProcessed}
                                                >
                                                    {paymentBeingProcessed ? (
                                                        "Payment received and being processed. Please wait..."
                                                    ) : (
                                                        "Pay"
                                                    )}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>);
    }

    const renderUserTimeInformation = (): JSX.Element => {
        if (timeElapsedinMinutes > 0) {
            return (<Col>
                        <Row>
                            <Col>
                               <h3> License Plate: {licensePlate}, <br /> Entry time: 12:00, <br /> Exit time: 12:50 </h3>
                            </Col>
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
                            <h1>  Your session will cost {totalPayment} Euro. <br /> </h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            <h3>   Do you agree? </h3>
                            </Col>
                        </Row>
                    </Col>);
        }


    }



                    return (
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
                    );
};

                    export default ProcessPaymentScreen;


