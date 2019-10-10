import React, { useEffect } from 'react';
import { getAllNotes } from '../../store/actions/notesActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Note from './Note';

const Notes = ({ notes, loading, getAllNotes, history }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    getAllNotes(token);
  }, []);

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <h1>Notes</h1>
      <Link to='/create'>Create Note</Link>
      <br />
      <br />
      <button onClick={logOut}>logout</button>
      <br />
      <br />
      {loading && notes.length === 0 ? (
        <div>loading . . .</div>
      ) : (
        <ul>
          {notes.map((note, i) => {
            return (
              <li>
                <Link to={`/notes/${note.id}`} key={i}>
                  {note.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
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
