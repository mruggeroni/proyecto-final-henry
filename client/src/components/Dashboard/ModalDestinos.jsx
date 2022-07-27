import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";

import { Formik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  crearDestino,
  getAllActivities,
  getAllDestinations,
} from "../../redux/actions";

// const formik = Formik;

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Muy corto")
    .max(20, "Maximo 20")
    .required("Requerido"),
  image: yup.string().required("Requerido"),
});

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

export default function ModalDestinos({
  showDestinos,
  setShowDestinos,
  setInput,
  input,
}) {
  const dispatch = useDispatch();
  const [inputModal, setInputModal] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
  });

  // const [error, setError] = useState({
  //   name: "",
  //   description: "",
  //   price: 0,
  // });

  // const handleCrearDestino = (e) => {
  //   e.preventDefault();
  //   const valida = validacion({ ...inputModal });
  //   setError(valida);
  //   console.log(error);
  //   if (valida.name || valida.image) {
  //     console.log(valida);
  //     alert(
  //       "Presta mas atencion al completar el formulario y volve a intentar ;)"
  //     );
  //   } else {
  //     //   dispatch();
  //     alert("Nuevo destino creada..");
  //     setInputModal({
  //       name: "",
  //       image: "",
  //     });
  //     //   setShowDestinos(false); //Para cerrar el modal
  //   }
  // };

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  //   setInputModal({
  //     ...inputModal,
  //     [e.target.id]: e.target.value,
  //   });
  //   console.log(inputModal);
  // };

  const handleClose = () => {
    setShowDestinos(false);
    // setInputModal({
    //   name: "",
    //   image: "",
    // });
  };

  const handleCrearDestino = async (e) => {
    const respuesta = await dispatch(crearDestino(e));
    await dispatch(getAllDestinations());
    await dispatch(getAllActivities());
    setShowDestinos(false);
    setInput({
      ...input,
      destinations: [...input.destinations, e.name],
    });
    alert(respuesta.data.message);
  };

  return (
    <>
      <Modal show={showDestinos} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear destino</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              // same shape as initial values
              handleCrearDestino(values);
            }}
            initialValues={{
              name: "",
              image: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control
                      type="text"
                      name="image"
                      value={values.image}
                      onChange={handleChange}
                      isInvalid={!!errors.image}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.image}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" type="submit">
                  Crear destino
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
