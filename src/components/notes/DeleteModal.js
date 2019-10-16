import React, { useState } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Button, Modal } from 'reactstrap';

const DeleteModal = ({ className, deleteNote, history }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const del = () => {
    const id = Number(window.location.pathname.split('/').pop());
    deleteNote(id, history);
    toggle();
  };

  return (
    <div>
      <Button
        onClick={toggle}
        style={{ backgroundColor: 'white', border: 'none', color: 'black' }}
      >
        X
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        className={className}
        centered={true}
      >
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
