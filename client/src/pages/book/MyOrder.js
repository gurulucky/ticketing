import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography, } from '@mui/material';
import { Box} from '@mui/system';
import { formatDateTime } from '../../utils/formatDate';
import {OrderDivider} from '../styled/StyledInput';


const MyOrder = ({ tickets, orders, curEvent }) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        orders?.forEach(order => {
            let price = tickets.find(ticket => ticket.id === order[0])?.price;
            total += price * order[1];
        });
        setTotalPrice(total);
        // console.log('order', orders);
    }, [orders?.length, tickets?.length])

    return (
        <Stack direction="column" sx={{ width: '40%' }}>
            <Typography variant='h5' className='caption'>
                MY ORDER
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: '10px' }}>
                <Box component='img' src={curEvent?.image || '/empty.png'} width='100px' height='auto' />
                <Stack direction='column'>
                    <Typography variant='body1' fontWeight='bold'>
                        {curEvent?.name}
                    </Typography>
                    <Typography variant='body1'>
                        {formatDateTime(curEvent?.start)}
                    </Typography>
                    <Typography variant='body1' fontWeight='bold'>
                        {curEvent?.venueAddress}
                    </Typography>
                </Stack>
            </Stack>
            {
                orders?.map((order, index) => {
                    if (order[1] > 0) {
                        let ticket = tickets.find(ticket => ticket.id === order[0]);
                        return (
                            <>
                                <OrderDivider />
                                <Ticket key={index} ticket={ticket} quantity={order[1]} />
                            </>
                        )
                    }
                })
            }
            <Typography variant='body1' className='caption' textAlign='right'>
                {`Total $${totalPrice}`}
            </Typography>
        </Stack>
    )
}

const Ticket = ({ ticket, quantity }) => {
    return (
        <Stack direction='row' justifyContent='space-between' sx={{ py: '10px' }}>
            <Typography variant='body1'>
                {`${quantity} x ${ticket?.name}`}
            </Typography>
            <Typography variant='body1'>
                {`$${ticket?.price * quantity}`}
            </Typography>
        </Stack>
    )
}

export default MyOrder;