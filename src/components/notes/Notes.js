import React, { useState, useEffect } from 'react';
import { getAllNotes } from '../../store/actions/notesActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Spinner, Button } from 'reactstrap';
import NotesNavigation from './NotesNavigation';
import Footer from '../Footer';
import '../../custom.css';

const desc = notes => {
  const noteAr = [];
  for (let i = notes.length - 1; i >= 0; i--) {
    noteAr.push(notes[i]);
  }
  return noteAr;
};

const Notes = ({ notes, loading, getAllNotes, history }) => {
  const [selectedPage, setSelectedPage] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    getAllNotes(token);
  }, [getAllNotes]);

  const handleSelected = (e, page) => {
    e.preventDefault();
    const remainder = notes.length % 10;
    let totalTabs = Math.floor(notes.length / 10);
    console.log(totalTabs, page);
    remainder && (totalTabs = totalTabs + 1);
    if (page < 0) return;
    if (page === totalTabs) return;
    setSelectedPage(page);
  };

  const descNotes = desc(notes);

  return (
    <>
      <NotesNavigation />
      <div className='contentWrapper'>
        <Container className='containerDiv'>
          <h1>Notes</h1>
          {loading && notes.length === 0 ? (
            <Spinner
              style={{ width: '3rem', height: '3rem', marginTop: '30px' }}
            />
          ) : (
            <>
              <div style={{ marginBottom: '35px' }}>
                {descNotes
                  .slice(selectedPage * 10, (selectedPage + 1) * 10)
                  .map((note, i) => (
                    <div style={{ marginBottom: '5px' }} key={i}>
                      <Link to={`/notes/${note.id}`}>
                        {note.title} - by {note.author}
                      </Link>
                    </div>
                  ))}
              </div>
              <div>
                <Button
                  onClick={e => handleSelected(e, selectedPage - 1)}
                  style={{ marginRight: '5px' }}
                >
                  Previous
                </Button>
                <Button onClick={e => handleSelected(e, selectedPage + 1)}>
                  Next
                </Button>
              </div>
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
