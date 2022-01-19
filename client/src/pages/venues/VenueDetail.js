import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography } from '@mui/material';
import VenueItem from "./VenueItem";
import EventItem from "../events/EventItem";
import { getVenue } from '../../actions/venue';
import { getEvents } from "../../actions/event";
import { RootStyle } from "../styled/StyledInput";

const VenueDetail = ({ match }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const curVenue = useSelector(state => state.venue.currentVenue);
    const events = useSelector(state => state.event.events);

    useEffect(() => {
        // if (!curVenue) {
        dispatch(getVenue(id));
        // }
        if (curVenue)
            dispatch(getEvents({ location: curVenue?.name }));
    }, [curVenue?.name])

    return (
        <RootStyle>

            <VenueItem venue={curVenue} showButton={false} />
            <Typography className='caption' variant='h5'>
                {`Events at ${curVenue?.name}`}
            </Typography>
            {events?.length ?
                events?.map(item => <EventItem key={item.id} event={item} />)
                :
                <Typography variant='h6'>{`There is no event at ${curVenue?.name}`}</Typography>
            }

        </RootStyle >
    )
}

export default VenueDetail;