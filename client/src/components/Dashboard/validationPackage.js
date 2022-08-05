export default function validation(input) {
  let error = {};
  let regInteger = /^\d+$/;
  let regUrl = /https?:\/\/.*\.(?:png|jpg)/;
  let checkboxes = document.getElementsByName("check");

  if (!input.name) {
    error.name = "Nombre es requerido";
  } else if (input.name.length > 60) {
    error.name = "El nombre debe tener menos de 60 caracteres";
  }
  if (input.price === "" || isNaN(input.price)) {
    error.price = "Precio es requerido";
  } else if (input.price > 1000000) {
    error.price = "El paquete no puede costar más de U$S 1.000.000";
  }
  if (!input.description) {
    error.description = "Descripción es requerido";
  } else if (input.description.length > 1000) {
    error.description = "La descripción debe tener menos de 1000 caracteres.";
  }
  //----- preguntamos por las imagenes o que?
  if (input.main_image.length <= 0) {
    error.main_image = "Imagen requerida";
  }

  if (!input.images0.length) {
    error.images0 = "Imagen requerida";
  }

  if (!input.images1.length) {
    error.images1 = "Imagen requerida";
  }

  if (!input.images2.length) {
    error.images2 = "Imagen requerida";
  }

  if (input.on_sale === "" || isNaN(input.on_sale)) {
    error.on_sale = "La oferta es requerida";
  } else if (input.on_sale > 100) {
    error.on_sale = "La oferna no puede ser mayor a 100%";
  }
  // if (!input.region) {
  //   error.featured = "Seleccionar una opcion";
  // }
  if (!input.type) {
    error.type = "Seleccionar tipo de paquete ";
  }
  if (!input.seasson) {
    error.seasson = "La temporada es requerida";
  }
  if (input.destinations.length === 0) {
    error.destinations = "Se requiere al menos un país";
  }

  return error;
}
