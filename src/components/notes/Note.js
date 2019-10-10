import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNote } from '../../store/actions/notesActions';
import { getNoteCollaberators } from '../../store/actions/collaberatorsActions';
import PropTypes from 'prop-types';

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
      <Link to='/notes'>Notes</Link>
      {loading && <div>Loading . . . </div>}
      {note && (
        <div>
          <h1>title: {note.title}</h1>
          <p>body: {note.body}</p>
          <p>author: {note.author}</p>
        </div>
      )}
      <br />
      {note_collaborators.length > 0 && (
        <div>
          <h2>Collaborators:</h2>
          <ul>
            {note_collaborators.map((collaberator, i) => {
              return <li key={i}>{collaberator.name}</li>;
            })}
          </ul>
        </div>
      )}
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
