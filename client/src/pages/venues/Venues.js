import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import VenueItem from "./VenueItem"
import { Container, Typography } from "@mui/material"
import { getVenues } from '../../actions/venue';
import { RootStyle } from '../styled/StyledInput';

const Venues = () => {
    const dispatch = useDispatch();
    const venues = useSelector(state => state.venue.venues);

    useEffect(() => {
        dispatch(getVenues());
    }, [])

    return (
        <RootStyle>
            <Typography className='caption' variant='h5'>Find a venue</Typography>
            {venues?.map(item => <VenueItem key={item.id} venue={item} />)}
        </RootStyle>
    )
}

export default Venues;