import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { Button, Stack, Typography } from '@mui/material';
import api from '../../../utils/api';

const StripeForm = ({ onSucceed, isValid, checkValidation, payment }) => {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [clicked, setClicked] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    useEffect(() => {
        const getClientSecret = async () => {
            try {
                console.log("post create-payment");
                const res = await api.post('/stripe/create-payment-intent', { items: [{ id: "xl-tshirt" }] });
                setClientSecret(res.data.clientSecret);
                console.log('getclientsecret', res.data.clientSecret);
            } catch (err) {
                console.log('getclientsecret err', err);
            }
        }
        if (!clientSecret) {
            getClientSecret();
        }
        if (isValid && payment === 'stripe' && clicked) {
            console.log('dopay');
            doPayment();
            setClicked(false);
        }
    }, [isValid, payment, clicked]);

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
        setpostalCode(event.value.postalCode);
    };

    const handleSubmit = ev => {
        ev.preventDefault();
        checkValidation();
        setClicked(true);
    };

    const doPayment = async () => {
        setProcessing(true);
        console.log('clientSecret', clientSecret);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            // receipt_email: email,
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        // console.log('payload', payload);
        // console.log("card",elements.getElement(CardElement));

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            console.log('stripe success');
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            // props.onSucceed(email, postalCode);
            onSucceed(postalCode);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack direction="column" justifyContent="center" spacint={2}>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                <Button type='submit' color='primary' variant="contained"
                    disabled={processing || disabled || succeeded}
                    id="submit" sx={{ width: "100%" }}
                >
                    <span id="button-text">
                        {processing ? (
                            // <div className="spinner" id="spinner"></div>
                            `wait a moment...`
                        ) : (
                            `CONFIRM & PAY`
                        )}
                    </span>
                </Button>

                {/* Show any error that happens when processing the payment */}
                {error && (
                    <Typography variant='body1' color='error' role="alert">
                        {error}
                    </Typography>
                )}
                {/* Show a success message upon completion */}
                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment succeeded.
                    {/* <a
                        href={`https://dashboard.stripe.com/test/payments`}
                    >
                        {" "}
                        Stripe dashboard.
                    </a> Refresh the page to pay again. */}
                </p>
            </Stack>
        </form>
    );
}

export default StripeForm

