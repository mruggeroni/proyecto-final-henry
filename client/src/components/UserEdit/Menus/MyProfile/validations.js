export const validations = (input) => {
    const errors = {};
    let regInteger = /^\d+$/;

    if(input.first_name.length < 3 || input.first_name.length > 75) {
        errors.first_name = 'El campo del nombre sobrepasa el limite de caracteres';
    }
    if(input.last_name.length < 3 || input.last_name.length > 75) {
        errors.last_name = 'El campo del apellido sobrepasa el limite de caracteres';
    }
    if(!regInteger.test(input.phone)) {
        errors.phone = 'Ingrese un numero de telefono valido.';
    }
    if(!regInteger.test(input.postal_code)) {
        errors.postal_code = 'Ingrese un codigo postal valido.';
    }
    if(input.city.length > 75) {
        errors.city = 'El campo de la ciudad tiene que ser menor a 75 caracteres';
    }
    if(input.state.length > 75) {
        errors.state = 'El campo de la estado tiene que ser menor a 75 caracteres';
    } 

    return errors;
}