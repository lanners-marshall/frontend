import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNote } from '../../store/actions/notesActions';
import { getNoteCollaberators } from '../../store/actions/collaberatorsActions';
import PropTypes from 'prop-types';
import { Container, Card, CardText, CardBody, Button } from 'reactstrap';
import NotesNavigation from './NotesNavigation';
import Footer from '../Footer';

const Note = ({
  getNote,
  note,
  note_collaborators,
  getNoteCollaberators,
  loading
}) => {
  useEffect(() => {
    const id = window.location.pathname.split('/').pop();
    const token = localStorage.getItem('token');
    getNote(id, token);
    getNoteCollaberators(id, token);
  }, []);

  return (
    <>
      <NotesNavigation />
      <Container>
        {loading && <div>Loading . . . </div>}
        {note && (
          <Card>
            <CardBody>
              <h2>{note.title}</h2>
              <CardText>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </CardText>
              <CardText>by: {note.author}</CardText>
              {note_collaborators.length > 0 && (
                <CardText>
                  - collaberators
                  <br />
                  {note_collaborators.map((collaberator, i) => {
                    return <span key={i}> {collaberator.name} </span>;
                  })}
                </CardText>
              )}
            </CardBody>
          </Card>
        )}
      </Container>
      <Footer />
    </>
  );
};

Note.propTypes = {
  getNote: PropTypes.func,
  getNoteCollaberators: PropTypes.func,
  note: PropTypes.object,
  loading: PropTypes.bool,
  note_collaborators: PropTypes.array
};

const mapStateToProps = state => ({
  note: state.notes.note,
  loading: state.notes.loading,
  note_collaborators: state.collaberators.note_collaborators
});

export default connect(
  mapStateToProps,
  { getNote, getNoteCollaberators }
)(Note);
