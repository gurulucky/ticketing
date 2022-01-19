import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Typography, Stack, Box, Button } from "@mui/material";
import BookStepper from "../book/BookStepper";
import { formatDateTime } from '../../utils/formatDate';
import { OrderDivider, RootStyle } from '../styled/StyledInput';
import { Home, AccessTime } from '@mui/icons-material';



const Done = () => {
    const user = useSelector(state => state.auth.user);
    const orders = useSelector(state => state.ticket.orders);
    const curEvent = useSelector(state => state.event.currentEvent);
    const tickets = useSelector(state => state.ticket.tickets);

    useEffect(() => {
        console.log('done', orders);
    }, [orders, curEvent])

    return (
        <RootStyle>
            <BookStepper active={3} />
            <Stack direction='column' spacing={2}>

                <Typography className='caption' variant='h5'>{`Your order is completed. We have sent you order to ${user?.email}.`}</Typography>
                <Stack direction="row" spacing={1} sx={{ mb: '10px' }}>
                    <Box component='img' src={curEvent?.image || '/empty.png'} width='200px' height='auto' />
                    <Stack direction='column' spacing={1}>
                        <Link to={`/event/detail/${curEvent?.id}`}>
                            <Typography variant='h6' fontWeight="bold">
                                {curEvent?.name}
                            </Typography>
                        </Link>
                        <Stack direction='row' alignItems="center">
                            <AccessTime color='primary' fontSize='small' />
                            <Typography variant='body1' alignItems='center'>
                                {formatDateTime(curEvent?.start)}&nbsp;&nbsp;|&nbsp;&nbsp;
                            </Typography>
                            <Home color='primary' fontSize='small' />
                            <a href="#">
                                <Typography variant='body1' fontWeight="bold">
                                    {
                                        curEvent?.venueAddress
                                    }
                                </Typography>

                            </a>

                        </Stack>
                        <Typography variant='body1'>
                            {`${curEvent?.description.slice(0, 500)} ...`}
                        </Typography>
                    </Stack>
                </Stack>
                <OrderDivider />
                {
                    orders?.map((order, index) => {
                        let ticket = tickets.find(ticket => ticket.id === order.ticketId);
                        let attendess = order.attendees;
                        return (
                            <Stack direction='column' key={index} spacing={1}>
                                <Stack direction='row' spacing={1} alignItems='center'>
                                    <Typography variant='h6' color='primary'>
                                        {`${index + 1}. ${ticket?.name} x ${order.quantity}`}
                                    </Typography>
                                    <AccessTime />
                                    <Typography variant='h6'>
                                        {formatDateTime(ticket.from)}
                                    </Typography>
                                </Stack>
                                <Typography variant='body1'>
                                    {`${attendess.replaceAll(',',', ')}`}
                                </Typography>
                                <OrderDivider />
                            </Stack>
                        )
                    })
                }
                <Button component={Link} to='/event' variant='contained' color='primary'>Continue to buy tickets</Button>
            </Stack>
        </RootStyle>
    )
}


export default Done;