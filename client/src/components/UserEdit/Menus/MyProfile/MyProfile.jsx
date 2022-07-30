import React from "react";
import { useSelector } from "react-redux";
import s from './MyProfile.module.css';

export default function MyProfile({ showProfile, setShowProfile }) {

    const user = useSelector( (state) => state.user );

    const handleSubmit = (e) => {
        e.preventDefault();
    };
  
  return (
    !showProfile ? null
    :  
    <div className={s.profile_container}>
        <h2>Perfil</h2>
        <hr />
        <form className={s.profile_information_container}>
        <div className={s.profile_image_container}>
            <img src={user.photo || 'https://www.avesdeuruguay.com/cres.jpg'} onError={ (e) => e.target.src = 'https://www.avesdeuruguay.com/cres.jpg' } alt={user.full_name} />
            <div className={s.profile_input_container}>
            <label className={s.profile_label}>Imagen</label>
            <input type='text' value={user.photo} className={s.profile_input} />
            </div>
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Nombre</label>
            <input type='text' value={user.first_name} className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Apellido</label>
            <input type='text' value={user.last_name} className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Numero de telefono</label>
            <input type='text' value={user.phone} className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Dirección</label>
            <input type='text' value={user.address_line1} className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Ciudad</label>
            <input type='text' value={user.city} className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Estado</label>
            <input type='text' value={user.state} className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Codigo postal</label>
            <input type='text' value={user.postal_code} className={s.profile_input} />
        </div>
        <div className={s.profile_input_container}>
            <label className={s.profile_label}>Pais</label>
            <input type='text' value={user.country} className={s.profile_input} />
        </div>
        
        <button onClick={handleSubmit} className={s.profile_btn_save}>Guardar cambios</button>
        </form>
    </div>
  );
}



/* 
<Formik
        validationSchema={schema}
        onSubmit={handleSubmit}
        initialValues={{
        firstName: "Mark",
        lastName: "Otto",
        username: "",
        city: "",
        state: "",
        zip: "",
        terms: false,
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
            <Form.Group as={Col} md="4" controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
                />

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group
                as={Col}
                md="4"
                controlId="validationFormikUsername"
            >
                <Form.Label>Username</Form.Label>
                <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">
                    @
                </InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                    {errors.username}
                </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Form.Control
                type="text"
                placeholder="City"
                name="city"
                value={values.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
                />

                <Form.Control.Feedback type="invalid">
                {errors.city}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik04">
                <Form.Label>State</Form.Label>
                <Form.Control
                type="text"
                placeholder="State"
                name="state"
                value={values.state}
                onChange={handleChange}
                isInvalid={!!errors.state}
                />
                <Form.Control.Feedback type="invalid">
                {errors.state}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationFormik05">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                type="text"
                placeholder="Zip"
                name="zip"
                value={values.zip}
                onChange={handleChange}
                isInvalid={!!errors.zip}
                />

                <Form.Control.Feedback type="invalid">
                {errors.zip}
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


*/