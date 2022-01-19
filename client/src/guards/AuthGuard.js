import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// pages
import Login from '../pages/authentication/Login';
import {PATH_AUTH} from '../routes/paths';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  // const { isAuthenticated } = useAuth();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(PATH_AUTH.login);
    }
  }, [isAuthenticated])
  
  return <>{children}</>;
}
