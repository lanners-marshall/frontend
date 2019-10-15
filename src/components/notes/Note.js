import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getNote,
  updateNote,
  deleteNote
} from '../../store/actions/notesActions';
import { getNoteCollaberators } from '../../store/actions/collaberatorsActions';
import PropTypes from 'prop-types';
import {
  Container,
  Card,
  CardText,
  CardBody,
  Button,
  Spinner,
  Row,
  Col
} from 'reactstrap';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import NotesNavigation from './NotesNavigation';
import Footer from '../Footer';
import './custom.css';

const Note = ({
  getNote,
  note,
  note_collaborators,
  getNoteCollaberators,
  loading,
  updateNote,
  updateSuccess,
  deleteNote,
  history
}) => {
  useEffect(() => {
    const id = window.location.pathname.split('/').pop();
    const token = localStorage.getItem('token');
    getNote(id, token);
    getNoteCollaberators(id, token);
  }, [updateSuccess]);

  const user_id = Number(localStorage.user_id);

  return (
    <>
      <NotesNavigation />
      <Container className='containerNote'>
        {loading && (
          <Spinner
            style={{ width: '3rem', height: '3rem', marginTop: '30px' }}
          />
        )}
        {note && !loading && (
          <Card>
            <CardBody>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'end'
                }}
              >
                <h2>{note.title}</h2>
                {user_id === note.user_id && (
                  <div>
                    <DeleteModal deleteNote={deleteNote} history={history} />
                  </div>
                )}
              </div>
              <CardText>{note.body}</CardText>
              <CardText>by: {note.author}</CardText>
              {note_collaborators.length > 0 && (
                <ul>
                  - collaberators
                  <br />
                  {note_collaborators.map((collaberator, i) => {
                    return <li key={i}> {collaberator.name} </li>;
                  })}
                </ul>
              )}
              <Row>
                <Col sm={{ size: 1 }}>
                  <EditModal
                    body={note.body}
                    title={note.title}
                    buttonLabel='Edit'
                    updateNote={updateNote}
                  />
                </Col>
              </Row>
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
  note_collaborators: PropTypes.array,
  updateNote: PropTypes.func,
  updateSuccess: PropTypes.bool,
  history: PropTypes.object,
  deleteNote: PropTypes.func
};

const mapStateToProps = state => ({
  note: state.notes.note,
  loading: state.notes.loading,
  note_collaborators: state.collaberators.note_collaborators,
  updateSuccess: state.notes.updateSuccess
});

export default connect(
  mapStateToProps,
  { getNote, getNoteCollaberators, updateNote, deleteNote }
)(Note);
