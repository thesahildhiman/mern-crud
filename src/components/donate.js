import React from 'react';
import { Container, Row } from 'react-bootstrap';
import GooglePayButton from '@google-pay/button-react';
const Donate = () => {
	const paymentRequest = {
		apiVersion: 2,
		apiVersionMinor: 0,
		allowedPaymentMethods: [
			{
				type: 'CARD',
				parameters: {
					allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
					allowedCardNetworks: ['MASTERCARD', 'VISA'],
				},
				tokenizationSpecification: {
					type: 'PAYMENT_GATEWAY',
					parameters: {
						gateway: 'example',
					},
				},
			},
		],
		merchantInfo: {
			merchantId: '12345678901234567890',
			merchantName: 'Demo Merchant',
		},
		transactionInfo: {
			totalPriceStatus: 'FINAL',
			totalPriceLabel: 'Total',
			totalPrice: '100.00',
			currencyCode: 'USD',
			countryCode: 'US',
		},
	};
	return (
		<Container>
			<h1>Donate</h1>
			<Row>
				{/* <Col xs={12} sm={6} md={4} lg={3}> */}
				<GooglePayButton
					environment='TEST'
					paymentRequest={paymentRequest}
					onLoadPaymentData={(paymentRequest) => {
						console.log('load payment data', paymentRequest);
					}}
				/>
				{/* </Col> */}
			</Row>
		</Container>
	);
};

export default Donate;
