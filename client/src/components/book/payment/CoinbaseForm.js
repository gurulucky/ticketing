import React, { useEffect, useState } from 'react';
import CoinbaseCommerceButton from 'react-coinbase-commerce';
import { Stack, Box, Button } from '@mui/material';

const CoinbaseForm = ({ onSucceed, isValid, checkValidation, payment }) => {
    const [coinbaseId, setCoinbaseId] = useState('');
    const [visibleCoinbase, setVisibleCoinbase] = useState('hidden');
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        // Create coinbase checkout with api
        if (!coinbaseId) {
            const body = {
                "name": "Token Purchase - " + (new Date()),
                "description": "Token purchase with coinbase",
                "local_price": {
                    "amount": 99,
                    "currency": "USD"
                },
                "pricing_type": "fixed_price",
                "requested_info": ["email"]
            }

            fetch(process.env.REACT_APP_COINBASE_API_ENDPOINT + '/checkouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CC-Api-Key': process.env.REACT_APP_COINBASE_API_KEY,
                    'X-CC-Version': '2018-03-22'
                },
                body: JSON.stringify(body)
            }).then(async res => {
                let result = await res.json();
                console.log('[cionbaseId]', result.data.id);
                setCoinbaseId(result.data.id);
            }).catch(err => {
                console.log('[coinbase error]', err);
            });
        }

        if (isValid && payment === 'coinbase' && clicked) {
            setVisibleCoinbase('visible');
            setClicked(false);
        }

    }, [isValid, payment, clicked])

    return (
        <Stack direction='column'>
            <Button variant='outlined'
                onClick={() => {
                    checkValidation();
                    setClicked(true);
                }}>Click me</Button>
            <Box sx={{ visibility: `${visibleCoinbase}` }}>
                <CoinbaseCommerceButton
                    checkoutId={coinbaseId}
                    styled={true}
                    onChargeSuccess={onSucceed}
                    onChargeFailure={() => console.log("Failure")}
                    onClick={()=>setVisibleCoinbase('hidden')}
                />
            </Box>
        </Stack>
    )
}

export default CoinbaseForm;