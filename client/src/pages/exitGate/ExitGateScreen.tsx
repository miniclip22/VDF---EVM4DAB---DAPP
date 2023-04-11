import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";


// TODO: put this in reusable components

const ExitGateScreen = (): JSX.Element => {
    const [licensePlate, setLicensePlate] = useState<string>("61A495J");
    const [sessionHash, setSessionHash] = useState<string>("");
    const [sessionHashDecrypted, setSessionHashDecrypted] =
        useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setSessionHash("session-id-1234");
        }, 3000);

        const timeout2 = setTimeout(() => {
            setSessionHashDecrypted(true);
        }, 5000);

        // Cleanup function to clear timeouts if component unmounts or data is set
        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, []);

    const handleProceedToPaymentScreen = (): void => {
        console.log("licence plate ", licensePlate)
        navigate("/process-exit-payment", {
            state: {
                licensePlate: licensePlate,
            }
        });
    };


    const renderSystemInformation = (): JSX.Element => {
        // TODO: impelment case when sessionHash is not found
        if (sessionHash === "") {
            return (
                <Row>
                    <Col xs={11}>
                        Getting DAB session ID for licence plate {licensePlate}
                    </Col>
                    <Col xs={1}>
                        <Spinner animation="border" variant="primary" />
                    </Col>
                </Row>
            );
        } else if (sessionHash !== "" && !sessionHashDecrypted) {
            // TODO: implement case when sessionHash is found but not decrypted
            return (
                <Row>
                    <Col>
                        Success. Session hash found for car with license plate{" "}
                        {licensePlate}: {sessionHash}. <br /> Decrypting session hash...
                    </Col>
                </Row>
            );
        }
        // TODO: decrypt somehow the session hash and get the data from it to be displayed above

        else if (sessionHash !== "" && sessionHashDecrypted) {
            console.log("sessionHashDecrypted", sessionHashDecrypted)
            return (
                <>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <ul>
                                        <li>Rate: rate</li>
                                        <li>Started at block: startedAtBlock</li>
                                        <li>User: user</li>
                                        <li>Car: car</li>
                                        <li>Organisation: organisation</li>
                                        <li>Arm device: armDevice</li>
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CheckCircleIcon sx={{ fontSize: "40px" }} />
                        </Col>
                    </Row>
                </>
            );
        }
    };

    const renderUserInformation = () => {
        // TODO: impelment case when sessionHash is not found
        if (sessionHash === "") {
            return (
                <Row>
                </Row>
            );
        } else if (sessionHash !== "" && !sessionHashDecrypted) {
            // TODO: implement case when sessionHash is found but not decrypted
            return (
                <Row>
                    <Col>
                        Processing data for {licensePlate} <br /> Please wait.
                    </Col>
                </Row>
            );
        }
        // TODO: decrypt somehow the session hash and get the data from it to be displayed above

        else if (sessionHash !== "" && sessionHashDecrypted) {
            console.log("sessionHashDecrypted", sessionHashDecrypted)
            return (
                <>
                    <Row>
                        <Col>

                            Data processing successful. Car: Mercedes, Model: C200, organization: Vodafone. <br />
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleProceedToPaymentScreen}
                            >
                                Please proceed to payment.
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <CheckCircleIcon sx={{ fontSize: "40px" }} />
                        </Col>
                    </Row>
                </>
            );
        }
    }

    return (
        // TODO: send via props the lienense plate number to the exit gate screen
        <Container fluid>
            <Row>
                <Col>
                    <h1>License Plate: {licensePlate}</h1>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    {renderSystemInformation()}
                </Col>
                <Col>
                    {renderUserInformation()}
                </Col>
            </Row>
        </Container>
    );
};

export default ExitGateScreen;


