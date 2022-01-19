import { useSelector } from 'react-redux'
import SearchInfo from "./SearchInfo"
import EventItem from "./EventItem"
import { styled } from '@material-ui/core/styles';
import { Container, Pagination, Stack, Box } from "@mui/material"
import { RootStyle } from '../styled/StyledInput';

const Events = () => {
    const events = useSelector(state => state.event.events);

    return (
        <RootStyle title="Components Overview | Minimal-UI">
            <SearchInfo />
            <Container>

                {events.map(item => <EventItem key={item.id} event={item} />)}
                {/* <Stack direction='row' justifyContent='center' sx={{pt:"10px"}}>
                <Pagination count={10} color='primary' />
            </Stack> */}
            </Container>
        </RootStyle>
    )
}

export default Events;