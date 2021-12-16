import { Typography } from '@mui/material';

const Detail = ({ event }) => {
    return (
        <>
            <Typography variant='h5' color='white' sx={{ backgroundColor: '#17a2b8', p: '5px',my:'10px' }}>
                EVENT DETAILS
            </Typography>
            <Typography variant='body1'>
                {event?.description}
            </Typography>
        </>
    )
}

export default Detail;