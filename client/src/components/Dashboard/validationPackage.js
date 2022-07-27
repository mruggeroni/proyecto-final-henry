export default function validation(input) {
  let error = {};
  let regInteger = /^\d+$/;
  let regUrl = /https?:\/\/.*\.(?:png|jpg)/;
  let checkboxes = document.getElementsByName("check");

  if (!input.name) {
    error.name = "Nombre es requerido";
  } else if (input.name[0] === " ") {
    error.name =
      "El nombre debe comenzar con una letra y no puede comenzar con un espacio";
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
  } else if (input.description[0] === " ") {
    error.description =
      "La descripción debe comenzar con una letra y no puede comenzar con un espacio";
  } else if (input.description.length > 1000) {
    error.description = "La descripción debe tener menos de 1000 caracteres.";
  }
  //----- preguntamos por las imagenes o que?
  if (input.main_image.length < 0) {
    error.main_image = "Se requiere una imagen principal";
  }
  // else if (!regUrl.test(input.main_image)) {
  //   error.main_image = "Ingrese una URL valida.";
  // }

  if (input.images.length < 0) {
    input.images.map((i) => {
      // if (input.images[i].length < 0 || !regUrl.test(input.images[i])) {
      //   error.description = "Se requiere una imagen secundaria n° " + i + 1;
      // }
    });
  }

  // if (input.featured) {
  //   error.featured = "Seleccionar una opcion";
  // }

  // if (!input.available) {
  //   error.available = "Seleccionar una opcion";
  // }

  if (input.on_sale < 0) {
    error.on_sale = "La oferna no puede ser menor a 0%";
  } else if (input.on_sale > 100) {
    error.on_sale = "La oferna no puede ser mayor a 100%";
  }
  if (!input.region) {
    error.featured = "Seleccionar una opcion";
  }
  if (!input.type) {
    error.type = "Seleccionar una opcion";
  }
  if (!input.seasson) {
    error.seasson = "La temporada es requerida";
  }
  if (input.destinations.length === 0) {
    error.destinations = "Se requiere al menos un país";
  }
  // if (input.destinations.length === 4) {
  //   error.destinations = "Alcanzaste la cantidad máxima de destinos";
  //   document
  //     .getElementById("destinationsSelect")
  //     .setAttribute("disabled", true);
  // } else {
  //   let createBtn = document.getElementById("create");
  //   createBtn.removeAttribute("disabled");
  // }

  return error;
}

/* const [input, setInput] = useState({
  name: "",
  price: 0,
  description: "",
  main_image: "",
  images0: "",
  images1: "",
  images2: "",

  featured: false,
  destinations: [],
  start_date: "",
  end_date: "",
  available: false,
  on_sale: 0,
  region: "",
  seasson: "",
  type: "",
}); */
