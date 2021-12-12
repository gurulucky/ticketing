import { Button, InputBase } from '@mui/material';
import { styled, alpha } from '@mui/system';

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

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha("rgb(255,255,255)", 0.15),
    '&:hover': {
        backgroundColor: alpha("rgb(255,255,255)", 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const GreenButton = styled(Button)(({ theme }) => ({
    color:"green"
}))
