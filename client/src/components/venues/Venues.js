import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import VenueItem from "./VenueItem"
import { Container, Typography } from "@mui/material"
import { getVenues } from '../../actions/venue';

const Venues = () => {
    const dispatch = useDispatch();
    const venues = useSelector(state => state.venue.venues);

    useEffect(() => {
        dispatch(getVenues());
    }, [])

    return (
        <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
            <Typography className='caption' variant='h5'>Find a venue</Typography>
            {venues?.map(item => <VenueItem key={item._id} venue={item} />)}
        </Container>
    )
}

export default Venues;