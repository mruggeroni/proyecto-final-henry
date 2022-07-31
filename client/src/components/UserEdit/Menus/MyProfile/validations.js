export const validations = (input) => {
    const errors = {};
    if(!input.first_name) {
        errors.first_name = 'El campo del nombre no puede estar vacio';
    }
    if(!input.last_name) {
        errors.last_name = 'El campo del apellido no puede estar vacio';
    }
    if(!input.phone) {
        errors.phone = 'El campo del telefono no puede estar vacio';
    }
    if(!input.city) {
        errors.city = 'El campo de la ciudad no puede estar vacio';
    }
    if(!input.state) {
        errors.state = 'El campo del estado no puede estar vacio';
    }
    if(!input.postal_code) {
        errors.postal_code = 'El campo del codigo postal no puede estar vacio';
    }
    if(!input.email) {
        errors.email = 'El campo del email no puede estar vacio';
    }
    if(!input.photo) {
        errors.photo = 'El campo del la foto no puede estar vacio';
    }
    
    return errors;
}