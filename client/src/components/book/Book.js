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
import { NotificationManager } from 'react-notifications';

const Book = ({ match }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const curEvent = useSelector(state => state.event.currentEvent);
    const tickets = useSelector(state => state.ticket.tickets);
    const [orders, setOrders] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [userDetail, setUserDetail] = useState({});

    useEffect(() => {
        let eventId = match.params.id;
        dispatch(getEvent(eventId));
        dispatch(getTickets(eventId));
        setOrders(JSON.parse(window.localStorage.getItem('orders')));
        console.log('curEvent', curEvent);
    }, [])

    const changeAttendees = (newAttendees) => {
        // console.log(newAttendees);
        setAttendees(newAttendees);
    }

    const changeUserDetail = (newUserDetail) => {

    }

    const paymentSucceed = () => {
        console.log('attendees', attendees);
        let emptyAttendee = attendees.find(attendee => attendee.firstName.trim() === "" || attendee.lastName.trim() === "");
        if (emptyAttendee) {
            NotificationManager.error('Please fill all attendees');
            return;
        }
        dispatch(sendOrders(attendees));
        history.push('/done');
    }

    return (
        <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
            <BookStepper active={2} />
            <Stack direction='row' spacing={3}>
                <Stack direction='column' sx={{ width: '60%' }}>
                    <form>
                        <UserDetail user={user} onChangeUser={changeUserDetail} />
                        <Attendee user={user} orders={orders} tickets={tickets} onChangeAttendee={changeAttendees} />
                        <Payment onSucceed={paymentSucceed} />
                    </form>
                </Stack>
                <MyOrder curEvent={curEvent} tickets={tickets} orders={orders} />
            </Stack>
        </Container>
    )
}

export default Book;