import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, Typography, Divider } from '@mui/material';
import { Box, styled } from '@mui/system';
import { formatDateTime } from '../../utils/formatDate';
import { setOrders } from '../../actions/ticket';


const MyOrder = ({ tickets, orders, curEvent }) => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        orders?.forEach(order => {
            let price = tickets.find(ticket => ticket._id === order[0])?.price;
            total += price * order[1];
        });
        setTotalPrice(total);
        // console.log('order', orders);
    }, [orders?.length, tickets?.length])

    return (
        <Stack direction="column" sx={{ width: '40%' }}>
            <Typography variant='h5' color='white' sx={{ backgroundColor: '#17a2b8', p: '5px', my: '10px' }}>
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
                        {curEvent?.venue.address}
                    </Typography>
                </Stack>
            </Stack>
            {
                orders?.map(order => {
                    if (order[1] > 0) {
                        let ticket = tickets.find(ticket => ticket._id === order[0]);
                        return (
                            <>
                                <OrderDivider />
                                <Ticket ticket={ticket} quantity={order[1]} />
                            </>
                        )
                    }
                })
            }
            <Typography variant='body1' color='white' textAlign='right' sx={{ backgroundColor: '#17a2b8', p: '5px', my: '10px' }}>
                {`Total $${totalPrice}`}
            </Typography>
        </Stack>
    )
}

const OrderDivider = styled(Divider)(({ theme }) => ({
    borderBottomWidth: 2,
}));

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