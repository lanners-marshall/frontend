import React, { useState } from 'react';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Button,
  Modal,
  Container
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { ReactstrapInput } from 'reactstrap-formik';

const EditModal = ({ title, body, buttonLabel, className, updateNote }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color='primary' onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Note</ModalHeader>

        <Formik
          initialValues={{
            title: title,
            body: body
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
            const { title, body } = values;
            const note = { title, body };
            const id = Number(window.location.pathname.split('/').pop());
            updateNote(id, note);
            toggle();
          }}
          render={({ submitForm, isSubmitting, values }) => (
            <Container>
              <Form>
                <Row>
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
                <ModalFooter>
                  <Button color='primary' type='submit'>
                    Submit Edit
                  </Button>{' '}
                  <Button color='secondary' onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Form>
            </Container>
          )}
        />
      </Modal>
    </div>
  );
};

export default EditModal;
