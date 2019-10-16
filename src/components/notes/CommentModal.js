import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  Col,
  Row,
  Container
} from 'reactstrap';
import { createComment } from '../../store/actions/commentsActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { ReactstrapInput } from 'reactstrap-formik';

const CommentModal = ({ buttonLabel, className, createComment }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div style={{ marginTop: '15px' }}>
      <Button color='primary' onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        centered={true}
      >
        <ModalHeader toggle={toggle}>Create Comment</ModalHeader>
        <Formik
          initialValues={{
            content: ''
          }}
          validate={values => {
            const errors = {};
            if (!values.content) {
              errors.content = 'Required';
            } else if (values.content.length > 30) {
              errors.content = 'Max 30 characters';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const { content } = values;
            const commenter = localStorage.name;
            const note_id = Number(window.location.pathname.split('/').pop());
            const comment = { content, commenter, note_id };
            createComment(comment);
            toggle();
          }}
          render={({ submitForm, isSubmitting, values }) => (
            <Container>
              <Form>
                <Row>
                  <Col xs='12'>
                    <Field
                      type='textarea'
                      label='Content'
                      name='content'
                      id='content'
                      component={ReactstrapInput}
                    />
                  </Col>
                </Row>
                <ModalFooter>
                  <Button color='primary' type='submit'>
                    Create Comment
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

CommentModal.propTypes = {
  createComment: PropTypes.func
};

export default connect(
  null,
  { createComment }
)(CommentModal);
