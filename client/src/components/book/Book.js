
import { Container } from "@mui/material";
import BookStepper from "./BookStepper";


const Book = () => {
    return (
        <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
            <BookStepper active={2} />
        </Container>
    )
}

export default Book;