import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import validateActivity from "./validationActivity";
import { Formik } from "formik";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import {
  crearActividad,
  getAllActivities,
  getAllDestinations,
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
  //   const [inputModal, setInputModal] = useState({
  //     name: "",
  //     description: "",
  //     image: "",
  //     price: 0,
  //   });

  //   const [error, setError] = useState({
  //     name: "",
  //     description: "",
  //     price: 0,
  //   });

  //   const handleCrearActividad = (e) => {
  //     e.preventDefault();
  //     console.log(inputModal);
  //     const valida = validateActivity({ ...inputModal });
  //     // dispatch(crearActividad());
  //     setError(valida);
  //     if (valida.name || valida.description || valida.price) {
  //       console.log(valida);
  //       alert(
  //         "Presta mas atencion al completar el formulario y volve a intentar ;)"
  //       );
  //     } else {
  //       //   dispatch();
  //       alert("Nueva actividad creada..");
  //       setInputModal({
  //         name: "",
  //         description: "",
  //         image: "",
  //         price: 0,
  //       });
  //       //   setShowActividades(false); //Para cerrar el modal
  //     }
  //   };

  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     console.log(e.target);
  //     setInputModal({
  //       ...inputModal,
  //       [e.target.id]: e.target.value,
  //     });
  //     console.log(inputModal);
  //   };

  const handleClose = () => {
    setShow(false);
    // setInputModal({
    //   name: "",
    //   description: "",
    //   image: "",
    //   price: 0,
    // });
  };

  const handleCrearActividad = async (e) => {
    const respuesta = await dispatch(crearActividad(e));
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
