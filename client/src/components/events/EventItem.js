import { Link } from 'react-router-dom';
import { Box, Stack, Button, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';

import { formatDateTime } from '../../utils/formatDate';

const EventItem = ({ event, showButton = true }) => {
    return (
        <Stack direction='row' sx={{ p: "10px", borderBottom: "1px solid grey" }} spacing={2}>
            <Box component='img' src={event.image || '/empty.png'} width="150px" height="150px"></Box>
            <Stack direction='column' spacing={1}>
                {
                    showButton ?
                        <Link to={`/event/detail/${event._id}`}>
                            <Typography variant='h6' fontWeight="bold">
                                {event.name}
                            </Typography>
                        </Link>
                        :
                        <Typography variant='h6' fontWeight="bold">
                            {event.name}
                        </Typography>
                }
                <Stack direction='row' alignItems="center">
                    <AccessTimeIcon color='primary' fontSize='small'/>
                    <Typography variant='body1' alignItems='center'>
                        {formatDateTime(event.start)}&nbsp;&nbsp;|&nbsp;&nbsp;
                    </Typography>
                    <HomeIcon color='primary' fontSize='small'/>
                    <a href="#">
                        <Typography variant='body1' fontWeight="bold">
                            {
                                Array.isArray(event.venue)
                                    ?
                                    event.venue[0].address
                                    :
                                    event.venue.address
                            }
                        </Typography>

                    </a>

                </Stack>
                <Typography variant='body1'>
                    {`${event.description.slice(0, 100)} ...`}
                </Typography>
                {
                    showButton &&
                    <Button variant='contained' color='primary' sx={{ width: "200px" }}>GET TICKETS</Button>
                }
            </Stack>
        </Stack>
    )
}

export default EventItem;