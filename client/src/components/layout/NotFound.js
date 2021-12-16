import React, { Fragment } from 'react';
import { Container } from '@mui/material';

const NotFound = () => {
  return (
    <Container sx={{ minHeight: window.innerHeight * 0.6 + 'px' }}>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle' /> Page Not Found
      </h1>
      <p className='large'>Sorry, this page does not exist</p>
    </Container>
  );
};

export default NotFound;
