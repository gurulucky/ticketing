import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Slider from './Slider';
import EventCarousel from './EventCarousel';
import { Container } from '@mui/material';


const Landing = ({ isAuthenticated }) => {
  // if (isAuthenticated) {
  //   return <Redirect to='/dashboard' />;
  // }

  return (
    <Container sx={{minHeight: window.innerHeight*0.6 + 'px' }}>
      <Slider />

      <EventCarousel deviceType="desktop" caption="BREAKING NEWS" />
      <EventCarousel deviceType="desktop" caption="LIVE MUSIC" />
      <EventCarousel deviceType="desktop" caption="FESTIVALS" />
      <EventCarousel deviceType="desktop" caption="ARTS & CULTURE" />

    </Container>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
