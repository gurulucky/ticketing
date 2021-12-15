import {useDispatch,useSelector} from 'react-redux'
import SearchInfo from "./SearchInfo"
import EventItem from "./EventItem"
import { Container, Pagination, Stack } from "@mui/material"

const Events = () => {
    const events = useSelector(state=>state.event.events);
    var items = [
        {
            name: "Random Name #1",
            detail: "Probably the most random thing you have ever seen!",
            image: "./image/01.jpg"
        },
        {
            name: "Random Name #2",
            detail: "Hello World!",
            image: "./image/02.jpg"
        },
        {
            name: "Random Name #3",
            detail: "Probably the most random thing you have ever seen!",
            image: "./image/03.jpg"
        },
        {
            name: "Random Name #4",
            detail: "Hello World!",
            image: "./image/04.jpg"
        },
        {
            name: "Random Name #3",
            detail: "Probably the most random thing you have ever seen!",
            image: "./image/03.jpg"
        },
        {
            name: "Random Name #4",
            detail: "Hello World!",
            image: "./image/04.jpg"
        }
    ]

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