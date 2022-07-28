export default function validateActivity(input) {
  let error = {};

  if (!input.name) {
    error.name = "Nombre es requerido";
  } else if (input.name.length > 20) {
    error.name = "Nombre debe ser menor a 20 caracteres";
  }

  if (!input.description) {
    error.description = "Descripcion es requerida";
  } else if (input.description.length > 280) {
    error.description = "Descripcion debe ser menor a 280 caracteres";
  }

  if (!input.price) {
    error.price = "Price is required";
  } else if (input.price <= 0) {
    error.price = "Price is invalid";
  } else if (input.price >= 1000) {
    error.price = "Activity cannot cost more than U$S1000";
  }

  return error;
}
