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

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Muy corto")
    .max(20, "Maximo 20")
    .required("Requerido"),
  image: yup.string().required("Requerido"),
  region: yup.string().required("Required").nullable(),
});

export default function ModalDestinos({
  showDestinos,
  setShowDestinos,
  setInput,
  input,
}) {
  const dispatch = useDispatch();

  const handleClose = () => {
    setShowDestinos(false);
  };

  const handleCrearDestino = async (e) => {
    console.log(e);
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
                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Region</Form.Label>
                    <Form.Control
                      as="select"
                      name="region"
                      value={values.region}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.region}
                    >
                      <option selected={true} disabled="disabled" hidden>
                        Seleccionar una Región...
                      </option>
                      <option value="Europa Occidental">
                        Europa Occidental
                      </option>
                      <option value="Europa Central">Europa Central</option>
                      <option value="Europa Oriental">Europa Oriental</option>
                      <option value="Asia Oriental">Asia Oriental</option>
                      <option value="Asia del Sur">Asia del Sur</option>
                      <option value="Asia Sudoriental Continental">
                        Asia Sudoriental Continental
                      </option>
                      <option value="Norte América">Norte América</option>
                      <option value="Sudamérica">Sudamérica</option>
                      <option value="América Central">América Central</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.region}
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
