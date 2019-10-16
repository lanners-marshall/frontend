import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  getNote,
  updateNote,
  deleteNote
} from '../../store/actions/notesActions';
import { getNoteCollaberators } from '../../store/actions/collaberatorsActions';
import { getNoteComments } from '../../store/actions/commentsActions';
import PropTypes from 'prop-types';
import Comments from './Comments';
import {
  Container,
  Card,
  CardText,
  CardBody,
  Spinner,
  Row,
  Col
} from 'reactstrap';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import NotesNavigation from './NotesNavigation';
import Footer from '../Footer';

const canCollaberate = (collaborators, note) => {
  let canColab = false;
  const id = Number(localStorage.user_id);
  collaborators.forEach(c => {
    c.collaborator_id === id && (canColab = true);
  });
  note && note.user_id === id && (canColab = true);
  return canColab;
};

const Note = ({
  getNote,
  note,
  note_collaborators,
  getNoteCollaberators,
  getNoteComments,
  loading,
  updateNote,
  updateSuccess,
  deleteNote,
  history,
  comments,
  commentUpdate,
  commentCreate,
  commentDelete
}) => {
  useEffect(() => {
    const id = window.location.pathname.split('/').pop();
    const token = localStorage.getItem('token');
    getNote(id, token);
    getNoteCollaberators(id, token);
    getNoteComments(id);
  }, [
    updateSuccess,
    getNote,
    getNoteCollaberators,
    getNoteComments,
    commentUpdate,
    commentCreate,
    commentDelete
  ]);
  const canColab = canCollaberate(note_collaborators, note);
  const user_id = Number(localStorage.user_id);

  return (
    <>
      <NotesNavigation />
      <div className='contentWrapper'>
        <Container className='containerDiv'>
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
                {canColab && (
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
                )}
              </CardBody>
            </Card>
          )}
          {note && <Comments comments={comments} />}
        </Container>
        <Footer />
      </div>
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
  deleteNote: PropTypes.func,
  createComment: PropTypes.func,
  comments: PropTypes.array,
  getNoteComments: PropTypes.func,
  commentUpdate: PropTypes.bool,
  commentCreate: PropTypes.bool,
  commentDelete: PropTypes.bool
};

const mapStateToProps = state => ({
  note: state.notes.note,
  loading: state.notes.loading,
  note_collaborators: state.collaberators.note_collaborators,
  updateSuccess: state.notes.updateSuccess,
  comments: state.comments.comments,
  commentUpdate: state.comments.updateSuccess,
  commentCreate: state.comments.createSuccess,
  commentDelete: state.comments.deleteSuccess
});

export default connect(
  mapStateToProps,
  {
    getNote,
    getNoteCollaberators,
    updateNote,
    deleteNote,
    getNoteComments
  }
)(Note);
