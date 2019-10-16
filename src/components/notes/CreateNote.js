import React, { useState, useEffect } from 'react';
import { getCollaborators } from '../../store/actions/collaberatorsActions';
import { connect } from 'react-redux';
import { createNote } from '../../store/actions/notesActions';
import PropTypes from 'prop-types';
import Select from 'react-select';
import NotesNavigation from './NotesNavigation';
import Footer from '../Footer';
import { Field, Form, Formik } from 'formik';
import { Col, Row, Container, Button, Label, Alert, Spinner } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';

const formater = colabList => {
  const id = Number(localStorage.getItem('user_id'));
  const collabs = [];
  let colab;

  for (let i = 0; i < colabList.length; i++) {
    if (colabList[i].id !== id) {
      colab = { value: colabList[i].id, label: colabList[i].name };
      collabs.push(colab);
    }
  }

  return collabs;
};

const CreateNote = ({
  createNote,
  getCollaborators,
  collaborators,
  history,
  error,
  loading
}) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    getCollaborators(token);
  }, [getCollaborators]);

  const [selectedOption, setOption] = useState([]);
  const collabs = formater(collaborators);
  const handleChange = selectedOption => {
    setOption(selectedOption);
  };

  return (
    <>
      <NotesNavigation />
      <div className='contentWrapper'>
        <Container className='containerDiv'>
          {loading ? (
            <Spinner
              style={{ width: '3rem', height: '3rem', marginTop: '30px' }}
            />
          ) : (
            <>
              <h2>Create Note</h2>
              {error && <Alert color='danger'>{error}</Alert>}
              <div style={{ marginTop: '15px;' }}>
                <Formik
                  initialValues={{
                    title: '',
                    body: ''
                  }}
                  validate={values => {
                    const errors = {};
                    if (!values.title) {
                      errors.title = 'Required';
                    } else if (values.title.length < 8) {
                      errors.title = 'Min 8 characters';
                    } else if (values.title.length > 30) {
                      errors.title = 'Max 30 characters';
                    }
                    if (!values.body) {
                      errors.body = 'Required';
                    } else if (values.body.length < 30) {
                      errors.body = 'Min 30 characters';
                    } else if (values.body.length > 280) {
                      errors.body = 'Max 280 characters';
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    const author = localStorage.getItem('name');
                    const user_id = Number(localStorage.getItem('user_id'));
                    const { title, body } = values;
                    const collaborators = selectedOption ? selectedOption : [];
                    const note = {
                      title,
                      body,
                      author,
                      collaborators,
                      user_id
                    };
                    createNote(note, history);
                  }}
                  render={({ submitForm, isSubmitting, values }) => (
                    <Form>
                      <Row>
                        <Col xs='12'>
                          <Label>Collaborators</Label>
                          <Select
                            value={selectedOption}
                            onChange={handleChange}
                            options={collabs}
                            isMulti={true}
                            isSearchable={true}
                            className='bottom'
                          />
                        </Col>
                        <Col xs='12'>
                          <Field
                            type='text'
                            label='Title'
                            name='title'
                            id='title'
                            component={ReactstrapInput}
                          />
                        </Col>
                        <Col xs='12'>
                          <Field
                            type='textarea'
                            label='Body'
                            name='body'
                            id='body'
                            component={ReactstrapInput}
                          />
                        </Col>
                      </Row>
                      <Button type='submit'>Create Note</Button>
                    </Form>
                  )}
                />
              </div>
            </>
          )}
        </Container>
        <Footer />
      </div>
    </>
  );
};

CreateNote.propTypes = {
  createNote: PropTypes.func,
  getCollaborators: PropTypes.func,
  collaborators: PropTypes.array,
  history: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  collaborators: state.collaberators.collaborators,
  loading: state.notes.loading,
  error: state.notes.error
});

export default connect(
  mapStateToProps,
  { createNote, getCollaborators }
)(CreateNote);
