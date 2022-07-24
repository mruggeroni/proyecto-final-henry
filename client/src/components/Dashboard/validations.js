export default function validation(input) {
  let errores = {};
  if (input.name.length < 3) {
    errores.name = "Se requieren minimo 1 letras";
  } else if (input.name.length > 60) {
    errores.name = "Se requieren maximo ";
  }
  if (input.price < 0) {
    errores.price = "Se requiere un precio";
  } else if (input.price > 1000000) {
    errores.price = "Precio debe ser menor a U$S 1.000.000";
  }

  if (input.description.length < 0) {
    errores.description = "Se requiere una descripcion";
  } else if (input.description.length > 1000) {
    errores.description = "Mil (1000) caracteres maximo";
  }
  document.addEventListener("error", (e) => {
    if (e.target.name === "images") errores.images = "";
  });

  //----- preguntamos por las imagenes o que?
  //   if (input.main_image.length < 0) {
  //     errores.main_image = "Se requiere una imagen principal";
  //   }
  // (input.main_image) => {
  // }

  //   if (input.images.length < 0) {
  //     input.images.map((i) => {
  //       if (input.images[i].length < 0) {
  //         errores.description = "Se requiere una imagen secundaria n° " + i + 1;
  //       }
  //     });
  //   }

  if (input.description.length < 0) {
    errores.description = "Se requiere una descripcion";
  } else if (input.description.length > 1000) {
    errores.description = "Mil (1000) caracteres maximo";
  }

  return errores;
}

const inputs = {
  name: "",
  price: 0,
  description: "",
  main_image: "",
  images: [""],

  featured: false,

  destinations: [],
  start_date: "",
  end_date: "",
  available: false,
  on_sale: 0,
  region: "",
  seasson: "",
  type: "",
};
