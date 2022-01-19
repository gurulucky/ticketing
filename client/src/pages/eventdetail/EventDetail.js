import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import EventItem from '../events/EventItem';
import Tickets from './Tickets';
import Detail from './Detail';
import { getEvent } from '../../actions/event';
import { RootStyle } from '../styled/StyledInput';


const EventDetail = ({ match }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const event = useSelector(state => state.event.currentEvent);
    useEffect(() => {
        console.log('id', id);
        dispatch(getEvent(id));
    }, [id]);
    return (
        <RootStyle>
            {
                event &&
                <EventItem event={event} showButton={false} />
            }
            <Tickets />
            <Detail event={event} />
        </RootStyle>
    )
}

export default EventDetail;