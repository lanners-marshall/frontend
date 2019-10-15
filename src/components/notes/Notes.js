import React, { useState, useEffect } from 'react';
import { getAllNotes } from '../../store/actions/notesActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Note from './Note';
import {
  Container,
  Spinner,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import NotesNavigation from './NotesNavigation';
import Footer from '../Footer';

const Notes = ({ notes, loading, getAllNotes, history }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const remainder = notes.length % 10;
  let counterPerPage = 10;
  let tabsCount = Math.floor(notes.length / 10);
  remainder && (tabsCount += 1);

  const handleClick = (e, i) => {
    e.preventDefault();
    setCurrentPage(i);
  };

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
          <Spinner
            style={{ width: '3rem', height: '3rem', marginTop: '30px' }}
          />
        ) : (
          <>
            <div style={{ marginBottom: '35px' }}>
              {notes
                .slice(
                  currentPage * counterPerPage,
                  (currentPage + 1) * counterPerPage
                )
                .map((note, i) => (
                  <div style={{ marginBottom: '5px' }} key={i}>
                    <Link to={`/notes/${note.id}`}>{note.title}</Link>
                  </div>
                ))}
            </div>
            <div className='pagination-wrapper'>
              <Pagination aria-label='Page navigation example'>
                <PaginationItem disabled={currentPage <= 0}>
                  <PaginationLink
                    onClick={e => handleClick(e, currentPage - 1)}
                    previous
                    href='#'
                  />
                </PaginationItem>
                <PaginationItem disabled={currentPage >= tabsCount - 1}>
                  <PaginationLink
                    onClick={e => handleClick(e, currentPage + 1)}
                    next
                    href='#'
                  />
                </PaginationItem>
              </Pagination>
            </div>
          </>
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
