import React, { useEffect } from 'react';
import { getAllNotes } from '../../store/actions/notesActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Note from './Note';
import { Container } from 'reactstrap';
import NotesNavigation from './NotesNavigation';
import Footer from '../Footer';

const Notes = ({ notes, loading, getAllNotes, history }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    getAllNotes(token);
  }, []);

  return (
    <>
      <NotesNavigation />
      <Container>
        <h1>Notes</h1>
        {loading && notes.length === 0 ? (
          <div>loading . . .</div>
        ) : (
          <ul>
            {notes.map((note, i) => {
              return (
                <li key={i}>
                  <Link to={`/notes/${note.id}`}>{note.title}</Link>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
      <Footer />
    </>
  );
};

Notes.propTypes = {
  notes: PropTypes.array,
  loading: PropTypes.bool,
  getAllNotes: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.notes.loading,
  notes: state.notes.notes
});

export default connect(
  mapStateToProps,
  { getAllNotes }
)(Notes);
