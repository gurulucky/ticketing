import {useDispatch,useSelector} from 'react-redux'
import SearchInfo from "./SearchInfo"
import EventItem from "./EventItem"
import { Container, Pagination, Stack } from "@mui/material"

const Events = () => {
    const events = useSelector(state=>state.event.events);

    return (
        <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
            <SearchInfo />
            {events.map(item => <EventItem key={item._id} event={item} />)}
            <Stack direction='row' justifyContent='center' sx={{pt:"10px"}}>
                <Pagination count={10} color='primary' />
            </Stack>
        </Container>
    )
}

export default Events;