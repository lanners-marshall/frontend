import React, { useState, useEffect } from 'react';
import { getAllNotes } from '../../store/actions/notesActions';
import { getCollaborators } from '../../store/actions/collaberatorsActions';
import { connect } from 'react-redux';
import { createNote } from '../../store/actions/notesActions';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import { Link } from 'react-router-dom';

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
  history
}) => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    getCollaborators(token);
  }, []);

  const [selectedOption, setOption] = useState([]);
  console.log(collaborators);
  const collabs = formater(collaborators);
  const handleChange = selectedOption => {
    setOption(selectedOption);
  };

  return (
    <>
      <Link to='/notes'>Notes</Link>
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={collabs}
        isMulti={true}
        isSearchable={true}
      />
      <div>Create Note</div>
      <Formik
        initialValues={{
          title: '',
          body: ''
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .min(6, 'title must be at least 6 characters')
            .max(30, 'title can be at most 30 characters'),
          body: Yup.string()
            .min(30, 'body must be at leat 30 characters')
            .max(280, 'body can be at most 280 characters')
        })}
        onSubmit={fields => {
          const author = localStorage.getItem('name');
          const user_id = Number(localStorage.getItem('user_id'));
          const { title, body } = fields;
          const collaborators = selectedOption ? selectedOption : [];
          const note = { title, body, author, collaborators, user_id };
          createNote(note, history);
        }}
        render={({ errors, status, touched }) => (
          <Form>
            <div className='form-group'>
              <ErrorMessage name='title' component='div' />
              <label htmlFor='title'>title</label>
              <Field name='title' type='text' />
            </div>
            <div className='form-group'>
              <ErrorMessage name='body' component='div' />
              <label htmlFor='body'>body</label>
              <Field name='body' type='textarea' />
            </div>
            <button type='submit'>Create Note</button>
          </Form>
        )}
      />
    </>
  );
};

CreateNote.propTypes = {
  createNote: PropTypes.func,
  getCollaborators: PropTypes.func,
  collaborators: PropTypes.array,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  collaborators: state.collaberators.collaborators
});

export default connect(
  mapStateToProps,
  { createNote, getCollaborators }
)(CreateNote);
