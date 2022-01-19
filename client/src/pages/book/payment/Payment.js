import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Stack, Typography, Box } from "@mui/material";
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import StripeForm from "./StripeForm";
import "./stripe.css";
import PaypalForm from "./PaypalForm";
import CoinbaseForm from "./CoinbaseForm";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBKEY_TEST);

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


const Payment = ({ onSucceed, isValid, checkValidation }) => {
    const [expanded, setExpanded] = React.useState('stripe');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };



    return (
        <>
            <Typography variant='h5' className='caption'>
                PAYMENT METHOD
            </Typography>
            <Accordion expanded={expanded === 'stripe'} onChange={handleChange('stripe')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Box component='img' src='/image/stripe.png' width='60px' height='auto' />
                </AccordionSummary>
                <AccordionDetails>
                    <Elements stripe={promise}>
                        <StripeForm onSucceed={onSucceed} isValid={isValid} checkValidation={checkValidation} payment={expanded} />
                    </Elements>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'paypal'} onChange={handleChange('paypal')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Box component='img' src='/image/paypal.png' width='90px' height='auto' />
                </AccordionSummary>
                <AccordionDetails>
                    <PaypalForm onSucceed={onSucceed} isValid={isValid} checkValidation={checkValidation} payment={expanded} />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'coinbase'} onChange={handleChange('coinbase')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Box component='img' src='/image/coinbase.svg' width='90px' height='auto' />
                </AccordionSummary>
                <AccordionDetails>
                    <CoinbaseForm onSucceed={onSucceed} isValid={isValid} checkValidation={checkValidation} payment={expanded} />
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Payment;