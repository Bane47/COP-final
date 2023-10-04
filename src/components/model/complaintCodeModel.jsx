import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ComplaintCodeModal = ({ show, onHide, complaintCode }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Complaint Code</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className='text-success'>Complaint registered successfully!</h4>
        <p>Your complaint code is: {complaintCode}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          OK
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComplaintCodeModal;
