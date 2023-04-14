import { useEffect, useState } from "react";
import "./ExitGateScreenStyles.css"
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
        }, 5000);

        const timeout2 = setTimeout(() => {
            setSessionHashDecrypted(true);
        }, 10000);

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
                <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <Row>
                        <Col xs={11}>
                            <h3>Getting DAB session ID for <br /> licence plate {licensePlate}</h3>

                            <Spinner animation="border" variant="primary" />
                        </Col>
                        <Col xs={1}>

                        </Col>
                    </Row>
                </Container>

            );

        } else if (sessionHash !== "" && !sessionHashDecrypted) {
            // TODO: implement case when sessionHash is found but not decrypted
            return (
                <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                    <Row>
                        <Col>
                            <h3>Success. <br /> Session hash found for car with license plate{" "}
                                {licensePlate}: {sessionHash}. <br /> Decrypting session hash...</h3>
                        </Col>
                    </Row>
                </Container>
            );
        }
        // TODO: decrypt somehow the session hash and get the data from it to be displayed above

        else if (sessionHash !== "" && sessionHashDecrypted) {
            console.log("sessionHashDecrypted", sessionHashDecrypted)
            return (
                <>
                    <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <ul className="list">
                                            <li><h3>Rate: rate</h3></li>
                                            <li><h3>Started at block: startedAtBlock</h3></li>
                                            <li><h3>User: user</h3></li>
                                            <li><h3>Car: car</h3></li>
                                            <li><h3>Organisation: organisation</h3></li>
                                            <li><h3>Arm device: armDevice</h3></li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        
                    </Container>
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
                <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                    <Row>
                        <Col>
                            <h3>Processing data for {licensePlate} <br /> Please wait.</h3>
                        </Col>
                    </Row>
                </Container>
            );
        }
        // TODO: decrypt somehow the session hash and get the data from it to be displayed above

        else if (sessionHash !== "" && sessionHashDecrypted) {
            console.log("sessionHashDecrypted", sessionHashDecrypted)
            return (
                <>
                    <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>

                        <Row>
                            <Col>
                                <CheckCircleIcon sx={{ fontSize: "40px" }} />
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>

                                <h3>Data processing successful. <br /> Car: Mercedes, <br /> Model: C200, <br /> organization: Vodafone.</h3> <br />
                                <Button
                                    variant="primary"
                                    size="lg"
                                    onClick={handleProceedToPaymentScreen}
                                >
                                    <h3>Please proceed to payment.</h3>
                                </Button>
                            </Col>
                        </Row>

                    </Container>
                </>
            );
        }
    }

    return (
        // TODO: send via props the lienense plate number to the exit gate screen

        <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
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


