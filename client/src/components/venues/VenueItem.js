import { Link } from 'react-router-dom';
import { Box, Stack, Button, Typography } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HomeIcon from '@mui/icons-material/Home';
import LinkIcon from '@mui/icons-material/Link';
import PhoneIcon from '@mui/icons-material/Phone';

const VenueItem = ({ venue, showButton = true }) => {

    return (
        <Stack direction='row' sx={{ p: "10px", borderBottom: "1px solid grey" }} spacing={2}>
            <Box component='img' src={venue?.image || '/empty.png'} width="150px" height="150px"></Box>
            <Stack direction='column' spacing={1}>
                {
                    showButton ?
                        <Link to={`/venue/detail/${venue?._id}`}>
                            <Typography variant='h6' fontWeight="bold">
                                {venue?.name}
                            </Typography>
                        </Link>
                        :
                        <Typography variant='h6' fontWeight="bold">
                            {venue?.name}
                        </Typography>
                }
                <Stack direction='row' alignItems="center" spacing={1}>
                    <HomeIcon color='primary' fontSize='small' />
                    <Typography variant='body1'>{venue?.address}</Typography>
                </Stack>
                <Stack direction='row' alignItems="center" spacing={1}>
                    {
                        venue?.phone &&
                        <>
                            <PhoneIcon color='primary' fontSize='small' />
                            <Typography variant='body1'>{venue?.phone}</Typography>
                        </>
                    }
                    <LinkIcon color='primary' fontSize='small' />
                    <a href={`https://${venue?.link}`} target='_black'>{venue?.link}</a>
                </Stack>
                {
                    showButton &&
                    <Button component={Link} to={`/venue/detail/${venue?._id}`} variant='contained' color='primary' sx={{ width: "200px" }}>More Info</Button>
                }
            </Stack>
        </Stack>
    )
}

export default VenueItem;