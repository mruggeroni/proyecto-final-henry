import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";

function validacion(input) {
  let error = {};

  if (!input.name) {
    error.name = "Nombre es requerido";
  } else if (input.name.length > 20) {
    error.name = "Nombre debe ser menor a 20 caracteres";
  }
  if (!input.image) {
    error.description = "Descripcion es requerida";
  }
  return error;
}

export default function ModalDestinos({ showDestinos, setShowDestinos }) {
  const dispatch = useDispatch();
  const [inputModal, setInputModal] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
  });

  const [error, setError] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const handleCrearDestino = (e) => {
    e.preventDefault();
    const valida = validacion({ ...inputModal });
    setError(valida);
    console.log(error);
    if (valida.name || valida.image) {
      console.log(valida);
      alert(
        "Presta mas atencion al completar el formulario y volve a intentar ;)"
      );
    } else {
      //   dispatch();
      alert("Nuevo destino creada..");
      setInputModal({
        name: "",
        image: "",
      });
      //   setShowDestinos(false); //Para cerrar el modal
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target);
    setInputModal({
      ...inputModal,
      [e.target.id]: e.target.value,
    });
    console.log(inputModal);
  };

  const handleClose = () => {
    setShowDestinos(false);
    setInputModal({
      name: "",
      image: "",
    });
  };

  return (
    <>
      <Modal show={showDestinos} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear destino</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre destino</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Nombre destino"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imagen destino</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Imagen destino"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCrearDestino}>
            Crear destino
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
