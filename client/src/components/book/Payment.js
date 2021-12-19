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


const Payment = () => {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <>
            <Typography variant='h5' color='white' sx={{ backgroundColor: '#17a2b8', p: '5px', my: '10px' }}>
                PAYMENT METHOD
            </Typography>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Box component='img' src='./image/stripe.png' width='60px' height='auto' />
                </AccordionSummary>
                <AccordionDetails>
                    <Elements stripe={promise}>
                        <StripeForm onSucceed={() => null} />
                    </Elements>
                </AccordionDetails>
            </Accordion>   
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Box component='img' src='./image/paypal.png' width='90px' height='auto' />
                </AccordionSummary>
                <AccordionDetails>
                    <PaypalForm />
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Coinbase</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CoinbaseForm />
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default Payment;