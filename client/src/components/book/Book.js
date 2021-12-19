import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Stack } from "@mui/material";
import BookStepper from "./BookStepper";
import UserDetail from "./UserDetail";
import MyOrder from "./MyOrder";
import Attendee from "./Attendee";
import Payment from "./Payment";
import { getEvent } from "../../actions/event";
import { getTickets, sendOrders } from "../../actions/ticket";

const Book = ({ match }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const curEvent = useSelector(state => state.event.currentEvent);
    const tickets = useSelector(state => state.ticket.tickets);
    const [orders, setOrders] = useState();

    useEffect(() => {
        dispatch(getEvent(match.params.id));
        dispatch(getTickets(match.params.id));
        setOrders(JSON.parse(window.localStorage.getItem('orders')));
        console.log('curEvent', curEvent);
    }, [])

    const paymentSucceed = () => {
        dispatch(sendOrders(orders));
        history.push('/done');
    }

    return (
        <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
            <BookStepper active={2} />
            <Stack direction='row' spacing={3}>
                <Stack direction='column' sx={{ width: '60%' }}>
                    <UserDetail user={user} />
                    <Attendee user={user} orders={orders} tickets={tickets} />
                    <Payment onSucceed={paymentSucceed} />
                </Stack>
                <MyOrder curEvent={curEvent} tickets={tickets} orders={orders} />
            </Stack>
        </Container>
    )
}

export default Book;