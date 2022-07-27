import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Button,
  Col,
  Dropdown,
  DropdownButton,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import {
  getAllActivities,
  getAllDestinations,
  getTypes,
} from "../../redux/actions";

const schema = yup.object().shape({
  name: yup.string().min(2, "Muy corto").max(60, "Maximo 60"),
  description: yup.string().min(2, "Muy corto").max(1000, "Maximo 1000"),
  main_image: yup.string(),
  //   images1: yup.string(),
  //   images2: yup.string(),
  //   images3: yup.string(),
  price: yup
    .number()
    .positive()
    .lessThan(1000000, "Menor a U$S 1.000.000")
    .integer(),
  start_date: yup.string(),
  end_date: yup.string(),
  region: yup.string(),
  seasson: yup.string(),
  type: yup.string(),
  featured: yup.bool(),
  available: yup.bool().oneOf([true], "Terms must be accepted"),
  on_sale: yup.number().positive().lessThan(100, "Menor a 100%").integer(),
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

export default function ModifyPackages() {
  const dispatch = useDispatch();
  console.log("hola!");

  //   const handleCrearDestino = (e) => {
  //     e.preventDefault();
  //     const valida = validacion({ ...inputModal });
  //     setError(valida);
  //     console.log(error);
  //     if (valida.name || valida.image) {
  //       console.log(valida);
  //       alert(
  //         "Presta mas atencion al completar el formulario y volve a intentar ;)"
  //       );
  //     } else {
  //       //   dispatch();
  //       alert("Nuevo destino creada..");
  //       setInputModal({
  //         name: "",
  //         image: "",
  //       });
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
    //   setInputModal({
    //     name: "",
    //     image: "",
    //   });
  };

  useEffect(() => {
    dispatch(getAllDestinations());
    dispatch(getAllActivities());
    dispatch(getTypes());
  }, [dispatch]);

  const allDestinations = useSelector((state) => state.destinations);
  const allActivities = useSelector((state) => state.activities);
  const types = useSelector((state) => state.types);

  const handleModificarPaquete = (e) => {
    console.log(e);
  };
  // esto es de eze en realidad
  const dataNow = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState(dataNow);
  const [untilDate, setUntilDate] = useState(dataNow);

  return (
    <Fragment>
      <div
        style={{
          marginTop: "200px",
        }}
      >
        <Formik
          validationSchema={schema}
          onSubmit={(values) => {
            // same shape as initial values
            handleModificarPaquete(values);
          }}
          initialValues={{
            name: "Brasil 7 dias",
            description: "",
            main_image: "",
            price: "",
            start_date: "",
            end_date: "",
            region: "",
            seasson: "",
            type: "",
            featured: "", //Booleanos
            available: "", //Booleanos
            on_sale: "",
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
                    rows={5}
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
                    name="main_image"
                    value={values.main_image}
                    onChange={handleChange}
                    isInvalid={!!errors.main_image}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.main_image}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              {/* VER LAS IMAGENES SECUNDARIAS!!!!! */}

              <Row className="mb-3">
                <Form.Group as={Col} md="8">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4">
                  <Form.Label>% descuento</Form.Label>
                  <Form.Control
                    type="number"
                    name="on_sale"
                    value={values.on_sale}
                    onChange={handleChange}
                    isInvalid={!!errors.on_sale}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.on_sale}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Label>Fecha de inicio</Form.Label>
                  <Form.Control
                    type="date"
                    name="start_date"
                    min={dataNow}
                    value={values.start_date}
                    onChange={handleChange}
                    isInvalid={!!errors.start_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.start_date}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Label>Fecha de fin</Form.Label>
                  <Form.Control
                    min={dataNow}
                    type="date"
                    name="end_date"
                    value={values.end_date}
                    onChange={handleChange}
                    isInvalid={!!errors.end_date}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.end_date}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Select aria-label="region">
                    <option selected="true" disabled="true" value="default">
                      Elige la region
                    </option>
                    <option value="Europa Occidental">Europa Occidental</option>
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
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Select aria-label="seasson">
                    <option selected="true" disabled="true" value="default">
                      Elige destinos
                    </option>
                  </Form.Select>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Select aria-label="seasson">
                    <option selected="true" disabled="true" value="default">
                      Elige si la temporada
                    </option>
                    <option value="Especial">Especial</option>
                    <option value="Invierno">Invierno</option>
                    <option value="Otoño">Otoño</option>
                    <option value="Primavera">Primavera</option>
                    <option value="Verano">Verano</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Select aria-label="type">
                    <option selected="true" disabled="true" value="default">
                      Elige el tipo de paquete
                    </option>
                    <option value="Crucero">Crucero</option>
                    <option value="Multidestino">Multidestino</option>
                    <option value="Pack Large">Pack Large</option>
                    <option value="Pack Short">Pack Short</option>
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6">
                  <Form.Select aria-label="featured">
                    <option selected="true" disabled="true" value="default">
                      Elige si es destacado
                    </option>
                    <option value="true">Destacado</option>
                    <option value="false">No destacado</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="6">
                  <Form.Select aria-label="available">
                    <option selected="true" disabled="true" value="default">
                      Elige la disponibilidad
                    </option>
                    <option value="true">Disponible</option>
                    <option value="false">No disponible</option>
                  </Form.Select>
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
      </div>
    </Fragment>
  );
}
