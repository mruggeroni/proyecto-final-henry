import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import validateActivity from "./validationActivity";

export default function ModalActividades({ show, setShow }) {
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

  const handleCrearActividad = (e) => {
    e.preventDefault();
    console.log(inputModal);
    const valida = validateActivity({ ...inputModal });
    // dispatch(crearActividad());
    setError(valida);
    if (valida.name || valida.description || valida.price) {
      console.log(valida);
      alert(
        "Presta mas atencion al completar el formulario y volve a intentar ;)"
      );
    } else {
      //   dispatch();
      alert("Nueva actividad creada..");
      setInputModal({
        name: "",
        description: "",
        image: "",
        price: 0,
      });
      //   setShowActividades(false); //Para cerrar el modal
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
    setShow(false);
    setInputModal({
      name: "",
      description: "",
      image: "",
      price: 0,
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre actividad</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Nombre actividad"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Descripción actividad</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                as="textarea"
                rows={2}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imagen actividad</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                type="text"
                placeholder="Imagen actividad"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="price">
              <Form.Label>Precio actividad</Form.Label>
              <Form.Control
                onChange={(e) => handleChange(e)}
                type="number"
                placeholder="Precio actividad"
                min="0"
                max="999"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleCrearActividad}>
            Crear actividad
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
