import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from '../pages/home/Landing';
import Events from '../events/Events';
import EventDetail from '../eventdetail/EventDetail';
import Book from '../book/Book';
import Done from '../done/Done';
import Venues from '../venues/Venues';
import VenueDetail from '../venues/VenueDetail';

import Register from '../auth/Register';
import Login from '../auth/Login';
import Alert from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profile from '../user/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Landing} />
        <Route exact path="/event" component={Events} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/event/detail/:id" component={EventDetail} />
        <Route exact path="/book/:id" component={Book} />
        <Route exact path="/done" component={Done} />
        <Route exact path='/venue' component={Venues} />
        <Route exact path='/venue/detail/:id' component={VenueDetail} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={ProfileForm} />
        <PrivateRoute exact path="/edit-profile" component={ProfileForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperience} />
        <PrivateRoute exact path="/add-education" component={AddEducation} />
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
