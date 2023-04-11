
import React, { Component, useState } from 'react';
//@ts-ignore
import QrReader from 'react-qr-scanner';
import { Container, Card, CardContent, Grid } from '@mui/material';
import MyTime from '../MyTime';
import QrcodeEnd from './qrCodeEnd';
import { useStopwatch } from 'react-timer-hook';

interface StateProps {
  delay: number;
  result: string;
}

interface Props {

}

const Qrcode: React.FC<Props> = () => {
  const [state, setState] = useState<StateProps>({
    delay: 100,
    result: 'No result',
  });

  const handleScan = (data: any) => {
    if (data !== null) {
      console.log('data text', data.text);
      setState({
        ...state,
        result: data.text,
      });
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  const { result } = state;
  console.log('result', result);

  if (result === 'Start Session Voda-App') {
    return (
      <>
        <MyTime />
        <QrcodeEnd />
        OrganizationId:
        <br />
        DeviceID:
      </>
    );
  } else {
    return (
      <>
        <Container>
          <Card>
            <h5>Scan Qr Code to start Parking session</h5>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <QrReader
                    delay={state.delay}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </>
    );
  }
};

export default Qrcode

