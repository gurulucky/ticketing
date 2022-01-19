import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from './Slider';
import EventCarousel from './EventCarousel';
import { getHomeEvents } from '../../actions/event';
import { RootStyle } from '../styled/StyledInput';

const Landing = () => {
  const dispatch = useDispatch();
  const homeEvents = useSelector(state => state.event.homeEvents);
  const [sliderEvents, setSliderEvents] = useState([]);

  useEffect(() => {
    dispatch(getHomeEvents());
    console.log(homeEvents);
    let events = homeEvents.map(events => events.events[0]);
    setSliderEvents(events.filter(event => event));
    console.log(events.filter(event => event));
  }, [homeEvents.length])

  return (
    <RootStyle>

      <Slider events={sliderEvents} />
      {
        homeEvents.map(events => {
          return <EventCarousel key={events.category} deviceType="desktop" caption={events.category.toUpperCase()} events={events.events} />
        })
      }
    </RootStyle>
  );
};

export default Landing;
