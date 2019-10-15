import React, { useState, useEffect } from 'react';
import { getAllNotes } from '../../store/actions/notesActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Note from './Note';
import { Container, Spinner } from 'reactstrap';
import NotesNavigation from './NotesNavigation';
import Footer from '../Footer';
import PaginationComponent from 'react-reactstrap-pagination';
import useWindowDimensions from './window';

const Notes = ({ notes, loading, getAllNotes, history }) => {
  const { width } = useWindowDimensions();
  const [selectedPage, setSelectedPage] = useState(1);

  function handleSelected(page) {
    setSelectedPage(page);
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    getAllNotes(token);
  }, [width]);

  return (
    <>
      <NotesNavigation />

      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
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
                  .slice(selectedPage * 10, (selectedPage + 1) * 10)
                  .map((note, i) => (
                    <div style={{ marginBottom: '5px' }} key={i}>
                      <Link to={`/notes/${note.id}`}>{note.title}</Link>
                    </div>
                  ))}
              </div>
              {/* desktop */}
              {width > 375 && (
                <PaginationComponent
                  totalItems={notes.length}
                  pageSize={10}
                  onSelect={handleSelected}
                  activePage={selectedPage}
                  maxPaginationNumbers={5}
                />
              )}
              {/* mobile 6,7,8 */}
              {width <= 375 && width > 320 && (
                <PaginationComponent
                  totalItems={notes.length}
                  pageSize={10}
                  onSelect={handleSelected}
                  activePage={selectedPage}
                  maxPaginationNumbers={2}
                />
              )}
              {/* mobile SE */}
              {width <= 320 && (
                <PaginationComponent
                  totalItems={notes.length}
                  pageSize={10}
                  onSelect={handleSelected}
                  activePage={selectedPage}
                  maxPaginationNumbers={0}
                />
              )}
            </>
          )}
        </Container>
        <Footer />
      </div>
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
