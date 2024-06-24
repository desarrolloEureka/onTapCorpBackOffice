'use client';
import { ModalParams } from '@/types/modals';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const BasicModal = ({ handleShow, setHandleShow }: ModalParams) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setHandleShow(false);
  };

  useEffect(() => {
    handleShow && setShow(true);
  }, [handleShow]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title as='h6'>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>...</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button variant='primary' onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BasicModal;
