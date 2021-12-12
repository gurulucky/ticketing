import { Box, Stack, Button, Typography } from "@mui/material";

const EventItem = ({ event }) => {
    return (
        <Stack direction='row' sx={{p:"10px", borderBottom:"1px solid grey"}} spacing={2}>
            <Box component='img' src={event.image} width="150px" height="150px"></Box>
            <Stack direction='column'>
                <Typography variant='h6'>
                    {event.name}
                </Typography>
                <Typography variant='body2'>
                    {event.detail}
                </Typography>
                <Button variant='contained' color='primary' sx={{width:"200px"}}>GET TICKETS</Button>
            </Stack>
        </Stack>
    )
}

export default EventItem;