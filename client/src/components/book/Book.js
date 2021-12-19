
import { useSelector } from "react-redux";
import { Container, Stack } from "@mui/material";
import BookStepper from "./BookStepper";
import UserDetail from "./UserDetail";
import MyOrder from "./MyOrder";
import Attendee from "./Attendee";
import Payment from "./Payment";

const Book = () => {
    const user = useSelector(state => state.auth.user);
    const curEvent = useSelector(state => state.event.currentEvent);
    const tickets = useSelector(state => state.ticket.tickets);
    const orders = useSelector(state => state.ticket.orders);

    return (
        <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
            <BookStepper active={2} />
            <Stack direction='row' spacing={3}>
                <Stack direction='column' sx={{ width: '60%' }}>
                    <UserDetail user={user} />
                    <Attendee user={user} orders={orders} tickets={tickets} />
                    <Payment />
                </Stack>
                <MyOrder curEvent={curEvent} tickets={tickets} orders={orders} />
            </Stack>
        </Container>
    )
}

export default Book;