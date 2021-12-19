
import {Container} from "@mui/material";
import BookStepper from "../book/BookStepper";

const Done = () => {
    return (
        <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
            <BookStepper active={3} />
        </Container>
    )
}

export default Done;