import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material';
// import { NotificationContainer } from 'react-notifications';

import { LOGOUT } from './actions/types';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';

// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from './components/ThemeLocalization';

import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css'
import 'react-notifications/lib/notifications.css'


const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <ThemeConfig>
        <ThemePrimaryColor>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                {/* <GoogleAnalytics /> */}
                {/* <BrowserRouter> */}
                  {/* <Settings /> */}
                  <ScrollToTop />
                  <Router />
                {/* </BrowserRouter> */}
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemePrimaryColor>
      </ThemeConfig>
    </Provider>
  );
};

export default App;
