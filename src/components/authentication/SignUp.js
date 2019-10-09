import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { signup } from '../../store/actions/authenticationActions';
import PropTypes from 'prop-types';
import * as Yup from 'yup';

const SignUp = ({ loading, error, history, signup }) => {
  return (
    <>
      <div>SignUp</div>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('First Name is required'),
          email: Yup.string()
            .email('Email is invalid')
            .required('Email is required'),
          password: Yup.string()
            .required('Password is required')
            .test(
              'regex',
              'Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase',
              val => {
                let regExp = new RegExp(
                  '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
                );
                return regExp.test(val);
              }
            ),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
        })}
        onSubmit={fields => {
          const { username, password, email } = fields;
          const user = { username: username, password: password, email: email };
          signup(user, history);
        }}
        render={({ errors, status, touched }) => (
          <Form>
            <div className='form-group'>
              <label htmlFor='username'>username</label>
              <Field name='username' type='text' />
              <ErrorMessage name='username' component='div' />
            </div>
            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <Field name='email' type='text' />
              <ErrorMessage name='email' component='div' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <Field name='password' type='password' />
              <ErrorMessage name='password' component='div' />
            </div>
            <div className='form-group'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <Field name='confirmPassword' type='password' />
              <ErrorMessage name='confirmPassword' component='div' />
            </div>
            <button type='submit'>Register</button>
          </Form>
        )}
      />
    </>
  );
};

SignUp.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  signup: PropTypes.func,
  history: PropTypes.object
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  signup: (user, history) => dispatch(signup(user, history))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
