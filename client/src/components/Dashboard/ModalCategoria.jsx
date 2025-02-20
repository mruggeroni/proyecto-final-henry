import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import validateActivity from "./validationActivity";
import { Formik } from "formik";
import * as yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  crearActividad,
  createCategories,
  getAllActivities,
  getAllDestinations,
  getCategories,
} from "../../redux/actions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Muy corto")
    .max(20, "Maximo 20")
    .required("Requerido"),

  image: yup.string().max(150, "Maximo 150").required("Requerido"),
});

export default function ModalCategoria({ show, setShow, setInput, input }) {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const handleClose = () => {
    setShow(false);
    // setInputModal({
    //   name: "",
    //   description: "",
    //   image: "",
    //   price: 0,
    // });
  };
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categorias = useSelector((state) => state.categories);

  const handleCrearCategoria = async (e) => {
    try {
      const token = await getAccessTokenSilently();
      const respuesta = await dispatch(createCategories(e, token));
      await dispatch(getAllDestinations());
      await dispatch(getAllActivities());
      await dispatch(getCategories());
      setShow(false);
      setInput({
        ...input,
        classification: e.name,
      });
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              // same shape as initial values
              handleCrearCategoria(values);
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
                  Crear categoria
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
