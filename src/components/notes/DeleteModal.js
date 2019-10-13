import React, { useState } from 'react';
import {
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Modal,
  Container
} from 'reactstrap';

const DeleteModal = ({ buttonLabel, className, deleteNote, history }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const del = () => {
    const id = Number(window.location.pathname.split('/').pop());
    deleteNote(id, history);
  };

  return (
    <div>
      <Button color='danger' onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete Note</ModalHeader>
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button color='danger' onClick={del}>
            Delete
          </Button>{' '}
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default DeleteModal;
