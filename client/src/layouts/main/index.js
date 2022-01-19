import { Link as ScrollLink } from 'react-scroll';
import { useLocation, Outlet } from 'react-router-dom';
// material
import { Box, Link, Container, Typography } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainNavbar from './MainNavbar';
import Navbar from './Navbar';
import MainFooter from './MainFooter';
import Footer from './Footer';

// ----------------------------------------------------------------------

export default function MainLayout() {
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    return (
        <>
            <MainNavbar />
            <div>
                <Outlet />
            </div>
            <MainFooter />

        </>
    );
}
