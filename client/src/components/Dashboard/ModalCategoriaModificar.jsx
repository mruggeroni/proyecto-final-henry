import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import validateActivity from "./validationActivity";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { getCategories, modificarCategoria } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import Swal from 'sweetalert2'

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Muy corto")
    .max(20, "Maximo 20")
    .required("Requerido"),

  image: yup.string().max(150, "Maximo 150").required("Requerido"),
});

export default function ModalCategoriaModificar({
  showModificar,
  setShowModificar,
  id,
}) {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  const handleClose = () => {
    setShowModificar(false);
  };

  const categorias = useSelector((state) => state.categories);
  const detalleCategoria = categorias.filter(i => i.id === id)
  console.log(categorias)


  const handleSubmit = async (e) => {
    try {
      const token = await getAccessTokenSilently()
      // const respuesta = await dispatch(createCategories(e));
      // await dispatch(getAllDestinations());
      const respuesta = await dispatch(modificarCategoria(id, e, token));
      await dispatch(getCategories());
      setShowModificar(false);
      Swal.fire({
        icon: 'success',
        title: respuesta.data.message,
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops algo fallo...',
        text: error.message,
      })
    };
  }
  return (
    <>
      <Modal show={showModificar} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              // same shape as initial values
              handleSubmit(values);
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
                  Editar categoria
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
