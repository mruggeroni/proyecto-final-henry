import axios from "axios";

export const GET_PACKAGE_BY_ID = "GET_PACKAGE_BY_ID";
export const GET_ALL_PACKAGE = "GET_ALL_PACKAGE";
export const GET_ALL_DESTINATIONS = "GET_ALL_DESTINATIONS";
export const GET_ON_SALE = "GET_ON_SALE";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_TYPES = "GET_TYPES";

export const getAllPackage = () => {
  return async function (dispatch) {
    let res = await axios.get("http://localhost:3001/package");
    return dispatch({ type: GET_ALL_PACKAGE, payload: res.data });
  };
};

export const getPackageById = (id) => {
  return async function (dispatch) {
    let res = await axios.get("http://localhost:3001/package" + id);
    return dispatch({ type: GET_ALL_PACKAGE, payload: res.data });
  };
};

// YA LISTAS
export const getAllDestinations = () => {
  return async function (dispatch) {
    let res = await axios.get("http://localhost:3001/destinations");
    return dispatch({ type: GET_ALL_DESTINATIONS, payload: res.data });
  };
};

export const getOnSale = () => {
  return async function (dispatch) {
    let res = await axios.get("http://localhost:3001/on_sale");
    return dispatch({ type: GET_ON_SALE, payload: res.data });
  };
};

export const getAllActivities = () => {
  return async function (dispatch) {
    let res = await axios.get("http://localhost:3001/activities");
    return dispatch({ type: GET_ACTIVITIES, payload: res.data });
  };
};

export const getTypes = () => {
  return async function (dispatch) {
    let res = await axios.get("http://localhost:3001/types");
    return dispatch({ type: GET_TYPES, payload: res.data });
  };
};
