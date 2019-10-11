import React from 'react';
import Navigation from './Navigation';
import { Container } from 'reactstrap';
import './custom.css';
import Footer from './Footer';

const Landing = () => {
  return (
    <>
      <Navigation />
      <br />
      <Container>
        <h1>Landing</h1>
      </Container>
      <Footer />
    </>
  );
};

export default Landing;
