import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Stack, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { NotificationManager } from 'react-notifications';
import { getTickets } from '../../actions/ticket';
import { formatDateTime } from '../../utils/formatDate';

var orders = [];

const Tickets = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const curEvent = useSelector(state => state.event.currentEvent);
    const tickets = useSelector(state => state.ticket.tickets);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (curEvent)
            dispatch(getTickets(curEvent.id));
    }, [curEvent])

    const changeQuantity = (ticketId, quantity) => {
        let index = orders.findIndex(order => order[0] === ticketId);
        if (index == -1) {
            orders.push([ticketId, quantity]);
        } else {
            orders[index][1] = quantity;
        }
        orders = orders.filter(order => order[1] > 0);
        console.log(orders);
        calcTotalPrice(orders);
    }

    const calcTotalPrice = (orders) => {
        let total = 0;
        orders.forEach(order => {
            let price = tickets.find(ticket => ticket.id === order[0])?.price;
            total += price * Number(order[1]);
        });
        setTotalPrice(total);
    }

    const buy = () => {
        orders = orders.filter(order => order[1] > 0);
        // dispatch(setOrders(orders))
        window.localStorage.setItem('orders', JSON.stringify(orders));
        if (orders.length > 0) {
            navigate(`/book/${curEvent.id}`,{replace:true});
        } else {
            NotificationManager.error('Select tickets');
        }
    }

    return (
        <>
            <Typography variant='h5' color='white' sx={{ backgroundColor: '#17a2b8', p: '5px', my: '10px' }}>
                BUY TICKETS
            </Typography>
            {
                tickets.map(ticket =>
                    <Ticket key={ticket.id} ticket={ticket} changeQuantity={changeQuantity} />
                )
            }
            <Stack direction='row' justifyContent="space-between">
                <Typography variant='h6' color='primary'>
                    {`Total Price : $${totalPrice}`}
                </Typography>
                <Button variant='contained' onClick={buy}>BUY TICKETS</Button>
            </Stack>
        </>
    )
}

const Ticket = ({ ticket, changeQuantity }) => {
    const [quantity, setQuantity] = useState(0);
    const QUANTITY_ITEMS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    return (
        <Stack direction="row" justifyContent="space-between"
            sx={{
                borderRadius: "5px",
                border: "2px solid grey",
                p: "10px",
                my: "5px"
            }}>
            <Stack direction="column">
                <Typography variant="h6">
                    {ticket.name}
                </Typography>
                <Typography variant="body1">
                    {ticket.description}
                </Typography>
                <Typography variant="body2">
                    {`Sales close: ${formatDateTime(ticket.to)}`}
                </Typography>
            </Stack>
            <Stack direction='row' alignItems="center" spacing={3}>
                <Typography variant='h6' fontWeight="bold">
                    {`$ ${ticket.price}`}
                </Typography>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={quantity}
                        label="Quantity"
                        onChange={(e) => {
                            setQuantity(e.target.value);
                            changeQuantity(ticket.id, e.target.value);
                        }}
                        sx={{ width: "70px" }}
                    >
                        {
                            QUANTITY_ITEMS.map(item =>
                                <MenuItem key={item} value={item}>
                                    {item}
                                </MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </Stack>
        </Stack>
    )
}

export default Tickets;