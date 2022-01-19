import { Box, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';

const Footer = () => {
    return (
        <Box className="bg-primary" sx={{ px: "10%", py: "30px"}}>
            <Stack direction='row' alignItems='center'>
                <Typography className="bg-primary" variant='body1' fontWeight='bold'>ABOUT</Typography>
                <Link to="/" style={{ textDecoration: 'none', marginLeft: "20px" }}>
                    <Typography variant='body2'className="bg-primary">
                        Home
                    </Typography>
                </Link>
                <Typography variant='body2'className="bg-primary">
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                </Typography>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography variant='body2'className="bg-primary">
                        What's on
                    </Typography>
                </Link>
                <Typography variant='body2'className="bg-primary">
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                </Typography>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography variant='body2'className="bg-primary">
                        New
                    </Typography>
                </Link>
                <Typography variant='body2'className="bg-primary">
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                </Typography>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography variant='body2'className="bg-primary">
                        Venues
                    </Typography>
                </Link>
                <Typography variant='body2'className="bg-primary">
                    &nbsp;&nbsp;|&nbsp;&nbsp;
                </Typography>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Typography variant='body2'className="bg-primary">
                        Sign In
                    </Typography>
                </Link>
            </Stack>
            <Stack direction='row' spacing={3} sx={{ my: "20px" }}>
                <Link to="/" className="bg-primary" style={{ textDecoration: 'none'}}>
                    <FacebookIcon />
                </Link>
                <Link to="/" className="bg-primary" style={{ textDecoration: 'none'}}>
                    <TwitterIcon />
                </Link>
                <Link to="/" className="bg-primary" style={{ textDecoration: 'none'}}>
                    <InstagramIcon />
                </Link>
                <Link to="/" className="bg-primary" style={{ textDecoration: 'none'}}>
                    <TelegramIcon />
                </Link>
            </Stack>
            <Typography variant='body2' align="right"className="bg-primary">
                &copy; 2021 MYTICKET.COM. ALL RIGHTS RESERVED
            </Typography>

        </Box>
    )
}

export default Footer;