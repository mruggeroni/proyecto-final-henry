export function funcionOdenar(
  arrayAOrdenar,
  tipoDeOrdenamiento,
  formaDeOrdenamiento
) {
  let ordenadas = [];
  if (tipoDeOrdenamiento === "precio") {
    if (formaDeOrdenamiento === "asc") {
      ordenadas = arrayAOrdenar.sort(function (a, b) {
        if (a.price > b.price) {
          return 1;
        }
        if (b.price > a.price) {
          return -1;
        }
        return 0;
      });
    } else {
      ordenadas = arrayAOrdenar.sort(function (a, b) {
        if (a.price > b.price) {
          return -1;
        }
        if (b.price > a.price) {
          return 1;
        }
        return 0;
      });
    }
    return ordenadas;
  } else {
    if (formaDeOrdenamiento === "asc") {
      ordenadas = arrayAOrdenar.sort(function (a, b) {
        if (a.duration > b.duration) {
          return 1;
        }
        if (b.duration > a.duration) {
          return -1;
        }
        return 0;
      });
    } else {
      ordenadas = arrayAOrdenar.sort(function (a, b) {
        if (a.duration > b.duration) {
          return -1;
        }
        if (b.duration > a.duration) {
          return 1;
        }
        return 0;
      });
    }
    console.log(ordenadas);
    return ordenadas;
  }
}

export function filtrarDestinos(arrayAFiltrar, destino) {
  console.log("filtro destinos", destino);
  let respuesta = [];
  destino === "all"
    ? arrayAFiltrar.forEach((e) => respuesta.push(e))
    : arrayAFiltrar.filter((p) =>
        p.destinations.forEach((el) => {
          el.name === destino && respuesta.push(p);
        })
      );
  return respuesta;
}

export function filtrarFechaDesde(arrayAFiltrar, fecha) {
  let respuesta = [];
  console.log("filtro fecha desde", arrayAFiltrar);
  console.log(respuesta);

  fecha === "all" || fecha === ""
    ? arrayAFiltrar.forEach((e) => respuesta.push(e))
    : arrayAFiltrar.forEach(
        (f) => {
          new Date(f.start_date) >= new Date(fecha) && respuesta.push(f);
        }
        // .forEach((el) => {
        //   el.name === fecha && respuesta.push(p);
        // })
      );
  return respuesta;
}
export function filtrarFechaHasta(arrayAFiltrar, fecha) {
  let respuesta = [];
  console.log("filtro fecha hasta", fecha);

  fecha === "all" || fecha === ""
    ? arrayAFiltrar.forEach((e) => respuesta.push(e))
    : arrayAFiltrar.forEach(
        (f) => {
          new Date(f.end_date) <= new Date(fecha) && respuesta.push(f);
        }
        // .forEach((el) => {
        //   el.name === fecha && respuesta.push(p);
        // })
      );
  console.log(respuesta);
  return respuesta;
}

export function filtrarType(arrayAFiltrar, type) {
  console.log("filtro type", type);
  let respuesta = [];
  type === "all"
    ? arrayAFiltrar.forEach((e) => respuesta.push(e))
    : arrayAFiltrar.forEach((el) => {
        el.type === type && respuesta.push(el);
      });
  return respuesta;
}

export function filtrarPrecioDesde(arrayAFiltrar, precio) {
  let respuesta = [];
  precio < 1
    ? arrayAFiltrar.forEach((e) => respuesta.push(e))
    : arrayAFiltrar.forEach(
        (f) => {
          f.price >= precio && respuesta.push(f);
        }
        // .forEach((el) => {
        //   el.name === fecha && respuesta.push(p);
        // })
      );
  return respuesta;
}

export function filtrarPrecioHasta(arrayAFiltrar, precio) {
  let respuesta = [];
  console.log("filtro precio desde", arrayAFiltrar);
  console.log(arrayAFiltrar);

  precio < 1
    ? arrayAFiltrar.forEach((e) => respuesta.push(e))
    : arrayAFiltrar.forEach(
        (f) => {
          f.price <= precio && respuesta.push(f);
        }
        // .forEach((el) => {
        //   el.name === fecha && respuesta.push(p);
        // })
      );
  return respuesta;
}
