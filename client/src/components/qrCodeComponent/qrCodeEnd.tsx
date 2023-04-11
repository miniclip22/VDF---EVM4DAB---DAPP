import React, { useState } from 'react';
//@ts-ignore
import QrReader from 'react-qr-scanner';
import { Container, Card, CardContent, Grid } from '@mui/material';
import { useStopwatch } from 'react-timer-hook';

interface Props { }

const QrcodeEnd: React.FC<Props> = () => {

    const [delay, setDelay] = useState<number>(100);
    const [result, setResult] = useState<string>('No result');
    const [sessionStop, setSessionStop] = useState<boolean>(false);
  

    const handleScan = (data: any) => {
        if (data !== null) {
            console.log('data text', data.text);
            setResult(data.text);
            if (data.text === 'Stop Session Voda-App')
            {
                setSessionStop(true);
            }
        }
    };

    const handleError = (err: any) => {
        console.error(err);
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    console.log('result', result);


    if (sessionStop) {

        return (
            <div>
                <h1>Your Parking Session has ended</h1>
                
            </div>
        );
    } else {
        return (
            <>
                <Container>
                    <Card>
                        <h5>Scan Qr Code to stop Parking session</h5>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                                    <QrReader
                                        delay={delay}
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

export default QrcodeEnd;