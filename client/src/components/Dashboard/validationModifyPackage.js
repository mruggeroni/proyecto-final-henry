export default function validationModifyPackage(input) {
  let error = {};

  if (!input.name) {
    error.name = "Nombre es requerido";
  } else if (input.name.length > 60) {
    error.name = "El nombre debe tener menos de 60 caracteres";
  }
  if (input.price < 0 || input.price === "") {
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
    error.main_image = "Se requiere una imagen principal";
  }

  if (input.images0.length < 0) {
    error.images0 = "Se requiere una imagen secundaria 1";
  }

  if (input.images1.length < 0) {
    error.images1 = "Se requiere una imagen secundaria 2";
  }

  if (input.images2.length < 0) {
    error.images2 = "Se requiere una imagen secundaria 3";
  }

  //   if (input.images.length > 0) {
  //     input.images.map((i) => {
  //       if (input.images[i]?.length <= 0) {
  //         error.images = "Se requiere una imagen secundaria n° " + i + 1;
  //       }
  //     });
  //   }

  if (input.on_sale < 0) {
    error.on_sale = "La oferna no puede ser menor a 0%";
  } else if (input.on_sale > 100) {
    error.on_sale = "La oferna no puede ser mayor a 100%";
  }
  if (input.destinations.length === 0) {
    error.destinations = "Se requiere al menos un destino";
  }

  return error;
}
