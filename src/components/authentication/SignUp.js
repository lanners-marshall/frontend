import React, { useState } from 'react';
import { connect } from 'react-redux';
import { signup } from '../../store/actions/authenticationActions';
import { Field, Form, Formik } from 'formik';
import { Col, Row, Container, Button } from 'reactstrap';
import { ReactstrapInput } from 'reactstrap-formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Footer from '../Footer';

const SignUp = ({ loading, error, history, signup }) => {
  return (
    <div style={{ marginTop: '15px' }}>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validate={values => {
          const errors = {};
          let regExp = new RegExp(
            '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$'
          );
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.username) {
            errors.username = 'Required';
          } else if (values.username.length < 4) {
            errors.username = 'Min 4 characters';
          }

          if (!values.password) {
            errors.password = 'Required';
          } else if (!regExp.test(values.password)) {
            errors.password =
              'Min 8 characters, 1 Special Character, 1 Uppercase, 1 Number, and 1 Lowercase';
          }
          if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "passwords don't match";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const { email, password, username } = values;
          const user = { email, password, username };
          signup(user, history);
        }}
        render={({ submitForm, isSubmitting, values }) => (
          <Form>
            <Row>
              <Col xs='12'>
                <Field
                  type='text'
                  label='Username'
                  name='username'
                  id='username'
                  component={ReactstrapInput}
                />
              </Col>
              <Col xs='12'>
                <Field
                  type='email'
                  label='Email'
                  name='email'
                  id='email'
                  component={ReactstrapInput}
                />
              </Col>
              <Col xs='12'>
                <Field
                  type='password'
                  label='Password'
                  name='password'
                  id='password'
                  component={ReactstrapInput}
                />
              </Col>
              <Col xs='12'>
                <Field
                  type='password'
                  label='Confirm Password'
                  name='confirmPassword'
                  id='confirmPassword'
                  component={ReactstrapInput}
                />
              </Col>
              <Col xs='12'>
                <Button type='submit'>Submit</Button>
              </Col>
            </Row>
          </Form>
        )}
      />
    </div>
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
