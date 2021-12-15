import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from './Slider';
import EventCarousel from './EventCarousel';
import { Container } from '@mui/material';
import { getHomeEvents } from '../../actions/event';


const Landing = () => {
  const dispatch = useDispatch();
  const homeEvents = useSelector(state => state.event.homeEvents);

  useEffect(() => {
    dispatch(getHomeEvents());
  },[])

  return (
    <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
      <Slider />
      {
        homeEvents.map(events => {
          return <EventCarousel deviceType="desktop" caption={events.category.toUpperCase()} events={events.events} />
        })
      }

    </Container>
  );
};

const mapStateToProps = (state) => ({
  homeEvents: state.event.homeEvents,
  isAuthenticated: state.auth.isAuthenticated
})

export default Landing;
