import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';



function OpenExitGate(): JSX.Element {
  
  return (
    <div>   
        <Container fluid style={{ marginTop: "100px", display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
            <Row>
                <Col>
                    <h1>Opening Exit Gate...</h1>
                </Col>

                <Col>
                    <h1>Thank you! Have a safe drive! </h1>
                </Col>
            </Row>

        </Container>
    </div>
  );

}

export default OpenExitGate;