import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { useAuth0 } from "@auth0/auth0-react";
import * as yup from "yup";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
// import {
//   crearActividad,
//   getAllActivities,
//   getAllDestinations,
//   getCategories,
// } from "../../redux/actions";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  nombre: yup
    .string()
    .min(2, "Muy corto")
    .max(30, "Maximo 30")
    .required("Requerido"),
  fechaNacimiento: yup.date().required("Requerido").nullable(),
  genero: yup.string().required("Required").nullable(),
  dni: yup
    .number("Debe ser un numero")
    .positive()
    .lessThan(100000000, "Dni invalido")
    .integer()
    .required("Requerido"),
});

export default function PassengerForm({ show, setShow, setInput, input }) {
  //   const dispatch = useDispatch();
  //   const { getAccessTokenSilently } = useAuth0();

  //   useEffect(() => {
  //     dispatch(getCategories());
  //   }, [dispatch]);

  //   const handleCrearActividad = async (e) => {
  //     e.price = parseInt(e.price);
  //     try {
  //       const token = await getAccessTokenSilently();
  //       const respuesta = await dispatch(crearActividad(e, token));
  //       await dispatch(getAllDestinations());
  //       await dispatch(getAllActivities());
  //       setShow(false);
  //       setInput({
  //         ...input,
  //         activities: [...input.activities, e.name],
  //       });
  //       Swal.fire({
  //         icon: "success",
  //         title: respuesta.data.message,
  //       });
  //     } catch (error) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Oops algo fallo...",
  //         text: error.message,
  //       });
  //     }
  //   };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values) => {
        // same shape as initial values
        // handleCre    arActividad(values);
      }}
      initialValues={{
        nombre: "",
        fechaNacimiento: "",
        genero: "",
        dni: "",
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
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                isInvalid={!!errors.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                name="fechaNacimiento"
                value={values.fechaNacimiento}
                onChange={handleChange}
                isInvalid={!!errors.fechaNacimiento}
              />
              <Form.Control.Feedback type="invalid">
                {errors.fechaNacimiento}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Genero</Form.Label>
              <Form.Control
                as="select"
                name="genero"
                value={values.genero}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.genero}
              >
                <option selected={true} disabled="disabled" hidden>
                  Seleccionar un genero...
                </option>
                <option key="genMasculino" value="Masculino">
                  Masculino
                </option>
                <option key="genFemenino" value="Femenino">
                  Femenino
                </option>
                <option key="genOtro" value="Otro">
                  Otro
                </option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.genero}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                type="text"
                name="dni"
                value={values.dni}
                onChange={handleChange}
                isInvalid={!!errors.dni}
              />
              <Form.Control.Feedback type="invalid">
                {errors.dni}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
        </Form>
      )}
    </Formik>
  );
}
