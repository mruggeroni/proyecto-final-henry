import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import validateActivity from "./validationActivity";
import { Formik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  crearActividad,
  getAllActivities,
  getAllDestinations,
  getCategories,
} from "../../redux/actions";
const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Muy corto")
    .max(20, "Maximo 20")
    .required("Requerido"),
  description: yup
    .string()
    .min(2, "Muy corto")
    .max(70, "Maximo 70")
    .required("Requerido"),
  image: yup.string().max(150, "Maximo 150").required("Requerido"),
  price: yup
    .number("Debe ser un numero")
    .positive()
    .lessThan(1000, "Menor a U$S 1.000")
    .integer()
    .required("Requerido"),
});

export default function ModalActividades({ show, setShow, setInput, input }) {
  const dispatch = useDispatch();
  const { getAccessTokenSilently} = useAuth0();
  const handleClose = () => {
    setShow(false);
    // setInputModal({
    //   name: "",
    //   description: "",
    //   image: "",
    //   price: 0,
    // });
  };
  useEffect(async () => {
    await dispatch(getCategories());
  }, [dispatch]);

  const categorias = useSelector((state) => state.categories);

  const handleCrearActividad = async (e) => {
    e.price = parseInt(e.price);
    const token = await getAccessTokenSilently();
    const respuesta = await dispatch(crearActividad(e, token));
    await dispatch(getAllDestinations());
    await dispatch(getAllActivities());
    setShow(false);
    setInput({
      ...input,
      activities: [...input.activities, e.name],
    });
    alert(respuesta.data.message);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              // same shape as initial values
              handleCrearActividad(values);
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
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      isInvalid={!!errors.description}
                      as="textarea"
                      rows={3}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
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
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="text"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      isInvalid={!!errors.price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} md="12">
                    <Form.Label>Clasificación de la actividad</Form.Label>
                    <Form.Control
                      as="select"
                      name="classification"
                      value={values.classification}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.classification}
                    >
                      <option selected={true} disabled="disabled" hidden>
                        Seleccionar una clasificación...
                      </option>
                      {categorias?.map((el) => (
                        <option key={el.name} value={el.name}>
                          {el.name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.classification}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" type="submit">
                  Crear actividad
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
