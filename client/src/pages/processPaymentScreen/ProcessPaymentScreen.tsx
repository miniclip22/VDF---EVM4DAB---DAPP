import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useLocation } from "react-router-dom";



function ProcessPaymentScreen(): JSX.Element {
    const location = useLocation();
    let licensePlate = location.state.licensePlate;
    // TODO: Get entry time from location.state.entryTime
    // TODO: Get exit time from location.state.exitTime

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <h1>Calculate time incurred</h1>
                    </Col>

                    <Col>
                        <h1>{licensePlate}</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>

                    </Col>

                    <Col>
                        <h1>Your Session will cost xxxx ETH</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>

                    </Col>

                    <Col>
                        <h1>Do you agree?</h1>
                    </Col>

                </Row>

                <Row>
                    <Col>

                    </Col>

                    <Col>

                    </Col>
                </Row>


            </Container>



        </div>
    );
}

export default ProcessPaymentScreen;