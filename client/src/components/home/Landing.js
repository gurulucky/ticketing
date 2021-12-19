import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from './Slider';
import EventCarousel from './EventCarousel';
import { Container } from '@mui/material';
import { getHomeEvents } from '../../actions/event';


const Landing = () => {
  const dispatch = useDispatch();
  const homeEvents = useSelector(state => state.event.homeEvents);
  const [sliderEvents, setSliderEvents] = useState([]);

  useEffect(() => {
    dispatch(getHomeEvents());
    let events = homeEvents.map(events => events.events[0]);
    setSliderEvents(events.filter(event => event));
    console.log(homeEvents.map(events => events.events[0]));
  }, [homeEvents])

  return (
    <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
      <Slider events={sliderEvents} />
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
