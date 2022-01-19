import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import ClientLayout from '../layouts/client';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },
    {
      path: 'client',
      element: (
        <RoleBasedGuard accessRole='client'>
          <ClientLayout />
        </RoleBasedGuard>
      ),
      children: [
        // { path: '/', element: <Navigate to="/client/dashboard" replace /> },
        { path: 'dashboard', element: <GeneralApp /> },
        { path: 'events', element: <Events /> },
        {path:'events/new', element:<NewEvent />},
        { path: 'orders', element: <GeneralApp /> },
        { path: 'customers', element: <GeneralApp /> }
      ]
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: '/home', element: <LandingPage /> },
        { path: '/event', element: <EventPage /> },
        { path: '/event/detail/:id', element: <EventDetailPage /> },
        { path: '/book/:id', element: <BookPage /> },
        { path: '/done', element: <DonePage /> },
        { path: '/venue', element: <VenuePage /> },
        { path: '/venue/detail/:id', element: <VenueDetailPage /> },
        { path: '/user', element: <AuthGuard><UserAccount /></AuthGuard> },
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS
// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// User
const UserAccount = Loadable(lazy(() => import('../pages/user/UserAccount')));
// Main
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const LandingPage = Loadable(lazy(() => import('../pages/home/Landing')));
const EventPage = Loadable(lazy(() => import('../pages/events/Events')));
const EventDetailPage = Loadable(lazy(() => import('../pages/eventdetail/EventDetail')));
const BookPage = Loadable(lazy(() => import('../pages/book/Book')))
const DonePage = Loadable(lazy(() => import('../pages/done/Done')))
const VenuePage = Loadable(lazy(() => import('../pages/venues/Venues')))
const VenueDetailPage = Loadable(lazy(() => import('../pages/venues/VenueDetail')))
const ProfilePage = Loadable(lazy(() => import('../pages/user/Profile')))
// Dashboard
const GeneralApp = Loadable(lazy(() => import('../pages/client/GeneralApp')));
const Events = Loadable(lazy(() => import('../pages/client/event/Event')));
const NewEvent = Loadable(lazy(() => import('../pages/client/new-event/NewEvent')));