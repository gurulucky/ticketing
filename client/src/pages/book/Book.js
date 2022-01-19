import React, { useState, useEffect, useRef } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Stack, Button } from "@mui/material";
import BookStepper from "./BookStepper";
import UserDetail from "./UserDetail";
import MyOrder from "./MyOrder";
import Attendee from "./Attendee";
import Payment from "./payment/Payment";
import {setUser} from "../../actions/auth";
import { getEvent } from "../../actions/event";
import { getTickets, sendOrders } from "../../actions/ticket";
import { NotificationManager } from 'react-notifications';
import { RootStyle } from '../styled/StyledInput';

const Book = ({ match }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id}=useParams();
    const user = useSelector(state => state.auth.user);
    const curEvent = useSelector(state => state.event.currentEvent);
    const tickets = useSelector(state => state.ticket.tickets);
    const [orders, setOrders] = useState([]);
    const [attendees, setAttendees] = useState([]);
    const [userDetail, setUserDetail] = useState({});
    const [isValid, setIsValid] = useState(false);

    const submitRef = useRef(null);

    useEffect(() => {
        let eventId = id;
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
        setUserDetail(newUserDetail); 
        dispatch(setUser(newUserDetail));
    }

    const paymentSucceed = () => {
        // console.log('attendees', attendees);
        // let emptyAttendee = attendees.find(attendee => attendee.firstName.trim() === "" || attendee.lastName.trim() === "");
        // if (emptyAttendee) {
        //     NotificationManager.error('Please fill all attendees');
        //     return;
        // }

        dispatch(sendOrders(navigate, user ? user.email : userDetail.email, attendees));
        // history.push('/done');
    }

    const checkValidation = () => {
        console.log('checkvalid');
        submitRef.current.click();
    }

    return (
        <RootStyle>
            <BookStepper active={2} />
            <Stack direction='row' spacing={3}>
                <Stack direction='column' sx={{ width: '60%' }}>
                    <form onSubmit={(e) => { e.preventDefault(); setIsValid(true) }}>
                        <UserDetail user={user} onChangeUser={changeUserDetail} />
                        <Attendee user={user} orders={orders} tickets={tickets} onChangeAttendee={changeAttendees} />
                        <Button ref={submitRef} type='submit' onClick={(e) => setIsValid(false)} sx={{ visibility: 'hidden' }}>Submit</Button>
                    </form>
                    <Payment onSucceed={paymentSucceed} isValid={isValid} checkValidation={checkValidation} />
                </Stack>
                <MyOrder curEvent={curEvent} tickets={tickets} orders={orders} />
            </Stack>
        </RootStyle>
    )
}

export default Book;