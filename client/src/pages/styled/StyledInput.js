import { Button, Divider, Container} from '@mui/material';
import { styled} from '@mui/system';
import Page from '../../components/Page';

export const RootStyle = styled(Container)(({ theme }) => ({
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
        paddingTop: theme.spacing(11)
    }
}));

export const NavMenuItem = styled(Button)(({ theme }) => ({
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "400",
    fontSize: "1.2rem",
    lineHeight: "1.334",
    letterSpacing: "0em",
    // maxWidth: "100px",
    // textShadow:"7px 6px 10px #17a2b8",
    '&:hover': {
        color: "white",
    },
    textTransform: "inherit"
}));

export const OrderDivider = styled(Divider)(({ theme }) => ({
    borderBottomWidth: 2,
}));
