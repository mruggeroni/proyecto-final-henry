import React from "react";
import Modal from "react-bootstrap/Modal";
import CreateAccount from '../Checkout/CrateAccount';

export default function ModalAccount() {
  return (
    <>
      <Modal show={true}>
        <Modal.Header>
          <Modal.Title>Crear Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CreateAccount />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
