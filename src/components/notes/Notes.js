import React, { useEffect } from 'react';
import { getAllNotes } from '../../store/actions/notesActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Notes = ({ notes, loading, getAllNotes }) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    getAllNotes(token);
  }, []);

  return (
    <div>
      <h1>Notes</h1>
    </div>
  );
};

Notes.propTypes = {
  notes: PropTypes.array,
  loading: PropTypes.bool,
  getAllNotes: PropTypes.func
};

const mapStateToProps = state => ({
  loading: state.notes.loading,
  notes: state.notes.notes
});

export default connect(
  mapStateToProps,
  { getAllNotes }
)(Notes);
