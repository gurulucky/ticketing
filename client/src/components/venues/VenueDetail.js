import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from '@mui/material';
import VenueItem from "./VenueItem";
import EventItem from "../events/EventItem";
import { getVenue } from '../../actions/venue';
import { getEvents } from "../../actions/event";

const VenueDetail = ({ match }) => {
    const dispatch = useDispatch();
    const curVenue = useSelector(state => state.venue.currentVenue);
    const events = useSelector(state => state.event.events);

    useEffect(() => {
        // if (!curVenue) {
        dispatch(getVenue(match.params.id));
        // }
        if (curVenue)
            dispatch(getEvents({ location: curVenue?.name }));
    }, [curVenue?.name])

    return (
        <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>

            <VenueItem venue={curVenue} showButton={false} />
            <Typography className='caption' variant='h5'>
                {`Events at ${curVenue?.name}`}
            </Typography>
            {events?.length ?
                events?.map(item => <EventItem key={item._id} event={item} />)
                :
                <Typography variant='h6'>{`There is no event at ${curVenue?.name}`}</Typography>
            }

        </Container >
    )
}

export default VenueDetail;