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

function validate(input) {
  let error = {};
  let regName = /^[a-zA-Z]*$/;
  let regInteger = /^\d+$/;
  let checkboxes = document.getElementsByName("check");

  if (!input.name) {
    error.name = "El nombre es requerido";
  } else if (!regName.test(input.name)) {
    error.name = "El nombre es inválido";
  } else if (input.name.length > 20) {
    error.name = "El nombre debe tener menos de 20 caracteres";
  }

  if (!input.description) {
    error.description = "La descripción es requerida";
  } else if (input.description.length > 280) {
    error.description = "El nombre debe tener menos de 280 caracteres";
  }

  if (!input.price) {
    error.price = "El precio es requerido";
  } else if (!regInteger.test(input.price)) {
    error.price = "El precio debe ser un número entero";
  } else if (input.price <= 0) {
    error.price = "El precio es inválido";
  } else if (input.price >= 1000) {
    error.price = "La actividad no puede costar más de U$S1000";
  }

  if (!input.classification) {
    error.classification = "La clasificación es requerida";
  } else {
    let createBtn = document.getElementById("create");
    createBtn.removeAttribute("disabled");
  }
  return error;
}
