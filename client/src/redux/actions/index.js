import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";

export const GET_PACKAGE_BY_ID = "GET_PACKAGE_BY_ID";
export const GET_RELATIONATED = "GET_RELATIONATED";
export const GET_ALL_PACKAGES = "GET_ALL_PACKAGES";
export const GET_ALL_PACKAGES_DASHBOARD = "GET_ALL_PACKAGES_DASHBOARD";
export const GET_DELETED_PACKAGES = "GET_DELETED_PACKAGES";
export const GET_ALL_DESTINATIONS = "GET_ALL_DESTINATIONS";
export const GET_ON_SALE = "GET_ON_SALE";
export const GET_ACTIVITIES = "GET_ACTIVITIES";
export const GET_TYPES = "GET_TYPES";
export const GET_USERS = "GET_USERS";
export const POST_PACKAGE = "POST_PACKAGE";
export const POST_USER = "POST_USER";
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const FILTER_BY_DESTINATION = "FILTER_BY_DESTINATION";
export const FILTER_PACKAGES_BY_DATE = "FILTER_PACKAGES_BY_DATE";
export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES";
export const GET_ALL_REGION = "GET_ALL_REGION";
export const GET_PK_REGION = "GET_PK_REGION";
export const GET_LOCAL_STORAGE_CART = "GET_LOCAL_STORAGE_CART";
export const GET_LOCAL_STORAGE_FAVORITES = "GET_LOCAL_STORAGE_FAVORITES";
export const GET_DESTINATIONS_WITH_PACKAGES = "GET_DESTINATIONS_WITH_PACKAGES";
export const GET_FAVORITES = "GET_FAVORITES";
export const FILTRAR = "FILTRAR";
export const ORDENAR = "ORDENAR";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const STATUS_USER = "STATUS_USER";
export const GET_ORDERS = "GET_ORDERS";
export const PATCH_ORDER = "PATCH_ORDER";
export const GET_CART = "GET_CART";
export const POST_CART = "POST_CART";
export const UPDATE_CART = "UPDATE_CART";
export const DELETE_CART = "DELETE_CART";
export const PATCH_PACKAGE = "PATCH_PACKAGE";
export const CLEAN_PACKAGE_BY_ID = "CLEAN_PACKAGE_BY_ID";
export const CLEAN_ALL_PACKAGE = "CLEAN_ALL_PACKAGE";
export const CLEAN_ORDER_DETAIL = "CLEAN_ORDER_DETAIL";
export const GET_RATING = "GET_RATING";
export const GET_FEATURED = "GET_FEATURED";
export const GET_ORDER_DETAILS = "GET_ORDER_DETAILS";

/* export const patchOrders = (id) => {
  try {
    return async function (dispatch) {
      let res = await axios.get('/order' + id);
      return dispatch({ type: GET_ORDERS, payload: res.data });
    }
  } catch(error) {
    console.log(error);
  }
}
 */
export const getOrderDetail = (id) => {
  try {
    return async function (dispatch) {
      let res = await axios.get("/order/" + id);
      console.log(res);
      return dispatch({ type: GET_ORDER_DETAILS, payload: res.data });
    };
  } catch (error) {
    console.log(error);
  }
};

export const getOrders = () => {
  try {
    return async function (dispatch) {
      let res = await axios.get("/orders?limit=10000");
      return dispatch({ type: GET_ORDERS, payload: res.data.results });
    };
  } catch (error) {
    console.log(error);
  }
};

export const patchRestorePackages = (id, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.patch("/restoredPackage/" + id, "", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(getDeletedPackages(token));
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const getDeletedPackages = (token) => {
  try {
    return async function (dispatch) {
      let res = await axios.get("/deletedPackages", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: GET_DELETED_PACKAGES, payload: res.data });
    };
  } catch (error) {
    console.log(error);
  }
};

export const patchPackage = (id, token, value) => {
  try {
    return async function (dispatch) {
      let res = await axios.patch("/packages/" + id, value, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: PATCH_PACKAGE, payload: res.data });
    };
  } catch (error) {
    console.log(error);
  }
};

export const cleanAllPackage = () => {
  return { type: CLEAN_PACKAGE_BY_ID };
};

export const cleanPackageById = () => {
  return { type: CLEAN_PACKAGE_BY_ID };
};

export const updateUser = (newUser, token) => {
  return async function (dispatch) {
    let res = await axios.put("/user/?email=" + newUser.email, newUser, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return dispatch({ type: UPDATE_USER, payload: res.data });
  };
};

export const deleteUser = (id, token) => {
  return async function (dispatch) {
    try {
      let res = await axios.delete("/user/" + id, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: DELETE_USER, payload: res.data });
    } catch (error) {
      Swal.fire(`Acesso denegado.`, ` `, "error");
    }
  };
};

export const getAllPackage = (limitRender) => {
  return async function (dispatch) {
    let res = await axios.get(`/packages/${limitRender}?available=true`);
    // let res = await axios.get("/packages/" + limitRender);
    return dispatch({ type: GET_ALL_PACKAGES, payload: res.data });
  };
};

export const getAllPackageDashboard = () => {
  return async function (dispatch) {
    let res = await axios.get(`/packages/10000`);
    return dispatch({ type: GET_ALL_PACKAGES_DASHBOARD, payload: res.data });
  };
};

export const getPackageById = (id) => {
  if (id !== "reset") {
    return async function (dispatch) {
      let res = await axios.get("/packages/detail/" + id);
      return dispatch({ type: GET_PACKAGE_BY_ID, payload: res.data[0] });
    };
  } else {
    return { type: GET_PACKAGE_BY_ID, payload: {} };
  }
};

export const getRelationated = (id) => {
  return async function (dispatch) {
    let res = await axios.get("/packages/detail/" + id);
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

export const getFeatured = () => {
  return async function (dispatch) {
    let res = await axios.get("/packages/featured");
    return dispatch({ type: GET_FEATURED, payload: res.data });
  };
};

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

export const createPackage = (payload, token) => {
  return async function (dispatch) {
    try {
      const respuesta = await axios.post("/packages", payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return respuesta;
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const getUserStatus = (id) => {
  return async function (dispatch) {
    try {
      const res = await axios.patch("/user/status/" + id);
      return res.data;
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const patchUserRestore = (id, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.patch("/restoreUser/" + id, "", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(getUsers(token));
      return res;
    } catch (error) {
      throw error;
    }
  };
};

export const patchUserAdmin = (id, isAdmin, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.patch("/user/" + id, isAdmin, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(getUsers(token));
      return res;
    } catch (error) {
      Swal.fire(`Acesso denegado.`, ` `, "error");
      console.log(error.message);
    }
  };
};

export const createUser = (payload) => {
  return async function (dispatch) {
    try {
      const res = await axios.post("/user", {
        headers: {
          authorization: `Bearer ${payload}`,
        },
      });
      return dispatch({ type: POST_USER, payload: res.data });
    } catch (e) {
      console.log(e.message);
    }
  };
};
export const ModifyUser = (email, payload, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.put("/user?email=" + email, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {}
  };
};
export const Payment = (payload, token) => {
  return async function (dispatch) {
    try {
      console.log(payload);
      const res = await axios.post("/payment", payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: payload,
      });
      if (res) {
        console.log(res.data.url);
        window.location = res.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUsers = (token) => {
  return async function (dispatch) {
    try {
      const res = await axios.get("/user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: GET_USERS, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserById = (id, token) => {
  return async function (dispatch) {
    try {
      const res = await axios.get("/user/" + id, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: GET_USERS, payload: res.data });
    } catch (error) {
      console.log(id, token);
      console.log(error);
    }
  };
};

export function cleanOrderDetail() {
  return {
    type: "CLEAN_ORDER_DETAIL",
  };
}

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

export function paquetesPorRegion(payload) {
  return async function (dispatch) {
    try {
      let res = await axios.get(`/packages/1000?region=${payload}?available=true`);
      return dispatch({ type: GET_PK_REGION, payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function filterPackagesByDate(value) {
  return async function (dispatch) {
    try {
      let res = await axios.get(
        `/packages/1000?dateMin=${value[0]}&dateMax=${value[1]}?available=true`
      );
      return dispatch({ type: FILTER_PACKAGES_BY_DATE, payload: res.data });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export const crearDestino = (payload, token) => {
  return async function (dispatch) {
    try {
      const respuesta = await axios.post(
        "/destinations",
        payload,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return respuesta;
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const modificarDestino = (id, payload, token) => {
  return async function (dispatch) {
    console.log(id, payload, token);
    try {
      const respuesta = await axios.put("/destinations/" + id, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return respuesta;
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const crearActividad = (payload, token) => {
  return async function (dispatch) {
    try {
      console.log("HERE");
      console.log(JSON.stringify(token, null, 2));
      const respuesta = await axios.post("/activities", payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return respuesta;
    } catch (e) {
      console.log(e.message);
    }
  };
};

export function modificarPaquete(payload, id, token) {
  return async function (dispatch) {
    try {
      console.log("payload 0: ", payload[0]);
      const respuesta = await axios.put("/packages/" + id, payload[0], {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("respuesta : ", respuesta);
      const respuesta2 = await axios.patch("/packages/" + id, payload[1], {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("respuesta2 : ", respuesta2);
      return respuesta2; // como no necesitamos hacer nada podemos no dispachar nada
    } catch (e) {
      console.log(e.message);
    }
  };
}
// categories seria classification => se usa poara crea una actividad
export const getCategories = () => {
  return async function (dispatch) {
    let res = await axios.get("/classification");
    return dispatch({ type: GET_ALL_CATEGORIES, payload: res.data });
  };
};

export const createCategories = (payload, token) => {
  return async function (dispatch) {
    try {
      const respuesta = await axios.post("/classification", payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return respuesta;
    } catch (e) {
      console.log(e.message);
    }
  };
};

export const createActivities = (payload, token) => {
  return async function (dispatch) {
    try {
      const respuesta = await axios.post("/activities", payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return respuesta;
    } catch (e) {
      console.log(e.message);
    }
  };
};

export function modificarActividad(payload, id, token) {
  console.log("payload: ", payload.price);
  console.log("id: ", id);
  return async function (dispatch) {
    try {
      const respuesta = await axios.put("activities/" + id, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return respuesta;
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function borrarPaquete(payload, token) {
  return async function (dispatch) {
    console.log(payload);
    try {
      var json = await axios.delete("/packages?id=" + payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllPackage(1000));
      return json;
    } catch (e) {
      console.log("No pudimos borrar el paquete!");
    }
  };
}
export function borrarUsuario(payload, token) {
  return async function (dispatch) {
    console.log(payload);
    try {
      var json = await axios.delete("/user/" + payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(getUsers);
      return json;
    } catch (e) {
      console.log("No pudimos borrar el paquete!");
    }
  };
}

export function getFavoritesLocalStorage(payload, id) {
  return {
    type: GET_LOCAL_STORAGE_FAVORITES,
    payload,
  };
}

export const getAllFavorites = (token, email) => {
  return async function (dispatch) {
    try {
      let res = await axios.get(`/favourites/?email=${email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return dispatch({ type: GET_FAVORITES, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postFavorites = (id, token, email) => {
  return async function (dispatch) {
    try {
      let res = await axios.post(
        "/favourites/" + id,
        { email },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getAllFavorites(token, email));
      return res;
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const deleteFavorites = (id, token, email) => {
  return async function (dispatch) {
    try {
      let res = await axios.delete(`/favourites/${id}/?email=${email}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(getAllFavorites(token, email));
      return res;
    } catch (error) {
      console.log(error);
    }
  };
};

export function getCartLocalStorage(payload, id) {
  return {
    type: GET_LOCAL_STORAGE_CART,
    payload,
  };
}

export function getAllCart(id) {
  try {
    return async function (dispatch) {
      let res = await axios.get("/cart/" + id);
      return dispatch({ type: GET_CART, payload: res.data });
    };
  } catch (error) {
    console.log("ERROR POST " + error);
  }
}

export function postCartPackage(id, value) {
  try {
    return async function (dispatch) {
      let res = await axios.post("/cart/" + id, value);
      console.log(res.data);
      return dispatch({ type: POST_CART, payload: res.data });
    };
  } catch (error) {
    console.log(error);
  }
}

export function updateCart(id, value) {
  try {
    return async function (dispatch) {
      let res = await axios.put("/cart/" + id, value);
      console.log(res.data);
      return dispatch({ type: UPDATE_CART, payload: res.data });
    };
  } catch (error) {
    console.log(error);
  }
}

export function deleteCartPackage(id, packageId) {
  return async function (dispatch) {
    try {
      // let res = await axios.delete(`/cart/${id}/?packageId=${packageId}`);
      await axios.delete(`/cart/${id}/?packageId=${packageId}`);
      // dispatch(getAllCart(id))
      // return res;
    } catch (error) {
      console.log(error);
    }
  };
}

export function modificarCategoria(id, payload, token) {
  return async function (dispatch) {
    console.log(payload);
    try {
      var json = await axios.put("/classification/" + id, payload, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      dispatch(getCategories());
      return json;
    } catch (e) {
      console.log("No pudimos modificar la categoria!");
    }
  };
}

export function filtrar(target, id) {
  return async function (dispatch) {
    const paquetes = await axios.get("/packages/10000?available=true");
    return dispatch({ type: FILTRAR, payload: paquetes.data, target, id });
  };
  // return { type: FILTRAR, target, id };
}

export function ordenar(target) {
  // return async function (dispatch) {
  //   const paquetes = await axios.get("/packages/10000");
  //   return dispatch({ type: ORDENAR, payload: paquetes.data, target: payload });
  // };
  return { type: ORDENAR, target };
}

export function crearRating(id, token, puntaje) {
  return async function (dispatch) {
    const rating = await axios.post(`/rating/${id}?rating=${puntaje}`, "", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return rating;
  };
  // return { type: FILTRAR, target, id };
}

export function eliminarRating(id, token) {
  return async function (dispatch) {
    const rating = await axios.delete(`/rating/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return rating;
  };
}

export function getRating(id) {
  return async function (dispatch) {
    const rating = await axios.get(`/rating/${id}`);
    return dispatch({ type: GET_RATING, payload: rating.data });
  };
}

export function crearPago(payload) {
  return async function (dispatch) {
    console.log(payload);
    const respuesta = await axios({
      method: "post",
      url: "/paymentML", // <--- aqui la url: /favourites/${idDelPackete}
      data: payload, // <--- aqui envian la info por body
    });
    console.log(respuesta.data);
    return respuesta;
  };
}
