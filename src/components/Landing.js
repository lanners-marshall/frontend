import React from 'react';
import Navigation from './Navigation';
import { Container, Jumbotron } from 'reactstrap';
import note from './note-min.jpg';

const Landing = () => {
  return (
    <>
      <Navigation />
      <br />
      <div className='contentWrapper padding'>
        <Container className='containerDiv'>
          <Jumbotron>
            <h1>Notes</h1>
            <p className='lead'>
              This is a simple note taking application. You have the ability to
              create, view, update and delete a note. You also have the ability
              to assign collaborators to notes. This will given them to ability
              to edit your note instead of only you.
            </p>
            <hr className='my-2' />
            <p>
              This application with made with React, Node, ReactStrap, and
              Postgress
            </p>
            <img src={note} alt='note' width='100%' />
          </Jumbotron>
        </Container>
      </div>
    </>
  );
};

export default Landing;
