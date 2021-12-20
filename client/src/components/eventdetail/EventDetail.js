import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Typography } from '@mui/material';
import EventItem from '../events/EventItem';
import Tickets from './Tickets';
import Detail from './Detail';
import { getEvent } from '../../actions/event';


const EventDetail = () => {
    const dispatch = useDispatch();
    const event = useSelector(state => state.event.currentEvent);
    useEffect(() => {
        let eventId = window.localStorage.getItem('eventId');
        dispatch(getEvent(eventId));
    }, []);
    return (
        <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
            {
                event &&
                <EventItem event={event} showButton={false} />
            }
            <Tickets />
            <Detail event={event} />
        </Container>
    )
}

export default EventDetail;