import axios from "axios";

export const GET_PACKAGE_BY_ID = "GET_PACKAGE_BY_ID";
export const GET_RELATIONATED = "GET_RELATIONATED";
export const GET_ALL_PACKAGES = "GET_ALL_PACKAGES";
export const GET_ALL_DESTINATIONS = "GET_ALL_DESTINATIONS";
export const GET_ON_SALE = "GET_ON_SALE";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_TYPES = "GET_TYPES";
export const POST_PACKAGE = "POST_PACKAGE";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const FILTER_BY_DESTINATION = "FILTER_BY_DESTINATION";
export const FILTER_PACKAGES_BY_DATE = "FILTER_PACKAGES_BY_DATE";
export const GET_DESTINATIONS_WITH_PACKAGES = "GET_DESTINATIONS_WITH_PACKAGES";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_LOCAL_STORAGE_CART = 'GET_LOCAL_STORAGE_CART';
export const GET_LOCAL_STORAGE_FAVORITES = 'GET_LOCAL_STORAGE_FAVORITES';

export const getAllPackage = (limitRender) => {
  return async function (dispatch) {
    let res = await axios.get("/fsp/packages/" + limitRender);
    return dispatch({ type: GET_ALL_PACKAGES, payload: res.data });
  };
};

export const getPackageById = (id) => {
  return async function (dispatch) {
    let res = await axios.get("/packages/" + id);
    return dispatch({ type: GET_PACKAGE_BY_ID, payload: res.data[0] });
  };
};

export const getRelationated = (id) => {
  return async function (dispatch) {
    let res = await axios.get("/packages/" + id);
    return dispatch({ type: GET_RELATIONATED, payload: res.data[1] });
  };
};

// YA LISTAS
export const getAllDestinations = () => {
  return async function (dispatch) {
    let res = await axios.get("/destinations");
    return dispatch({ type: GET_ALL_DESTINATIONS, payload: res.data });
  };
};

export function getDestinationsWithPackages(payload) {
  return {
    type: GET_DESTINATIONS_WITH_PACKAGES,
    payload,
  };
}

export const getOnSale = () => {
  return async function (dispatch) {
    let res = await axios.get("/on_sale");
    return dispatch({ type: GET_ON_SALE, payload: res.data });
  };
};

export const getAllActivities = () => {
  return async function (dispatch) {
    let res = await axios.get("/activities");
    return dispatch({ type: GET_ACTIVITIES, payload: res.data });
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    let res = await axios.get("/types");
    return dispatch({ type: GET_TYPES, payload: res.data });
  };
};

export const createPackage = (payload) => {
  return async function (dispatch) {
    try {
      const respuesta = await axios.post("/packages", payload);
      return respuesta;
    } catch (e) {
      alert(e.message);
    }
  };
};

export function orderByPrice(payload) {
  return {
    type: "ORDER_BY_PRICE",
    payload,
  };
}

export function filterPackagesByDestination(payload) {
  return {
    type: FILTER_BY_DESTINATION,
    payload,
  };
}

export function filterPackagesByDate(value) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`/fsp/packages/1000?dateMin=${value[0]}&dateMax=${value[1]}`);
      return dispatch({ type: FILTER_PACKAGES_BY_DATE, payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const crearDestino = (payload) => {
  return async function (dispatch) {
    try {
      const respuesta = await axios.post("/destinations", payload);
      return respuesta;
    } catch (e) {
      alert(e.message);
    }
  };
};

export const crearActividad = (payload) => {
  return async function (dispatch) {
    try {
      const respuesta = await axios.post("/activities", payload);
      return respuesta;
    } catch (e) {
      alert(e.message);
    }
  };
};

export function modificarPaquete(payload, id) {
  return async function (dispatch) {
    try {
      console.log("payload 0: ", payload[0]);
      const respuesta = await axios.put("/packages/" + id, payload[0]);
      console.log("respuesta : ", respuesta);
      const respuesta2 = await axios.patch("/packages/" + id, payload[1]);
      console.log("respuesta2 : ", respuesta2);
      return respuesta2; // como no necesitamos hacer nada podemos no dispachar nada
    } catch (e) {
      alert(e.message);
    }
  };
}

// categories seria classification => se usa poara crea una actividad
export const getCategories = () => {
  return async function (dispatch) {
    let res = await axios.get("/categories");
    return dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
  };
};

export function getFavoritesLocalStorage(payload, id) {
  return {
    type: GET_LOCAL_STORAGE_FAVORITES,
    payload,
  };
};

export function getCartLocalStorage(payload, id) {
  return {
    type: GET_LOCAL_STORAGE_CART,
    payload,
  };
};
