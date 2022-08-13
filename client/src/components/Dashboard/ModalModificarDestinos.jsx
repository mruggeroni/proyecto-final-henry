import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  crearDestino,
  getAllActivities,
  getAllDestinations,
  modificarDestino,
} from "../../redux/actions";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Muy corto")
    .max(20, "Maximo 20")
    .required("Requerido"),
  image: yup.string().required("Requerido"),
  region: yup.string().required("Required").nullable(),
});

export default function ModalModificarDestinos({
  showDestinos,
  setShowDestinos,
  destino,
}) {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const handleClose = () => {
    setShowDestinos(false);
  };

  const handleCrearDestino = async (e) => {
    try {
      const token = await getAccessTokenSilently();
      const respuesta = await dispatch(
        modificarDestino(destino[0]?.id, e, token)
      );
      await dispatch(getAllDestinations());
      setShowDestinos(false);
      Swal.fire({
        icon: "success",
        title: respuesta.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops algo fallo...",
        text: error.message,
      });
    }
  };

  return (
    <>
      <Modal show={showDestinos} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modificar destino</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              // same shape as initial values
              handleCrearDestino(values);
            }}
            initialValues={{
              name: `${destino[0]?.name}`,
              image: `${destino[0]?.image}`,
              region: `${destino[0]?.region}`,
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
                  Modificar destino
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
