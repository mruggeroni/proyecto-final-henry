import {
  GET_ALL_PACKAGES,
  GET_PACKAGE_BY_ID,
  GET_ACTIVITIES,
  GET_TYPES,
  GET_USERS,
  GET_ALL_DESTINATIONS,
  GET_ON_SALE,
  GET_RELATIONATED,
  GET_DESTINATIONS_WITH_PACKAGES,
  POST_PACKAGE,
  POST_USER,
  ORDER_BY_PRICE,
  FILTER_BY_DESTINATION,
  FILTER_PACKAGES_BY_DATE,
  GET_ALL_CATEGORIES,
  GET_ALL_REGION,
  GET_PK_REGION,
  GET_LOCAL_STORAGE_FAVORITES,
  GET_LOCAL_STORAGE_CART,
  FILTRAR,
  ORDENAR,
  DELETE_USER,
  UPDATE_USER,
  GET_USER_BY_ID,
  GET_FAVORITES,
  CLEAN_PACKAGE_BY_ID,
  PATCH_PACKAGE,
  GET_CART,
  CLEAN_ALL_PACKAGE,
  GET_ORDERS,
  UPDATE_CART,
  GET_FEATURED
} from "./../actions/index.js";

import {
  filtrarDestinos,
  funcionOdenar,
  filtrarFechaDesde,
  filtrarFechaHasta,
  filtrarType,
  filtrarPrecioDesde,
  filtrarPrecioHasta,
} from "./funciones.js";

const initialState = {
  allPackages: [],
  filteredPackages: [],
  activities: [],
  cart: [],
  destinations: [],
  destinationsWithPackages: [],
  regions: [],
  types: [],
  seasons: [],
  favoritesLocalStorage: [],
  favorites: [],
  orders: [],
  featured: [],
  onsale: [],
  detailPackage: {},
  relationated: [],
  users: [],
  user: {},
  categories: [],
  region: [],
  ordenado: { tipo: "precio", forma: "asc" },
  //filtrado y ordenamiento
  page: 1,
  limitRender: 100000,
  filtradoType: "",
  filtradoRegion: "",
  filtradoDestino: "",
  filtradoDateMin: "",
  filtradoDateMax: "",
  priceFilterMin: "",
  priceFilterMax: 1000000,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PACKAGES:
      return {
        ...state,
        allPackages: action.payload,
        // filteredPackages: action.payload,
      };
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload
      }
    case PATCH_PACKAGE:
      return {
        ...state
      }
    case CLEAN_ALL_PACKAGE:
      return {
        ...state,
        allPackages: {}
      }
    case CLEAN_PACKAGE_BY_ID:
      return {
        ...state,
        detailPackage: {}
      }
    case GET_ALL_DESTINATIONS:
      return {
        ...state,
        destinations: action.payload,
      };
    case GET_ALL_REGION:
      // const regiones = action.payload.map();
      return {
        ...state,
        destinations: action.payload,
      };

    case GET_DESTINATIONS_WITH_PACKAGES:
      const pack = state.allPackages;
      let arr = [];
      pack.forEach((el) => {
        el.destinations.forEach((m) => {
          !arr.includes(m.name) && arr.push(m.name);
        });
      });
      arr.sort();
      return {
        ...state,
        destinationsWithPackages: arr,
      };
    case GET_ON_SALE:
      return {
        ...state,
        onsale: action.payload,
      };

    case GET_FEATURED:
      return {
        ...state,
        featured: action.payload
      }

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };

    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };

    case GET_PACKAGE_BY_ID:
      return {
        ...state,
        detailPackage: action.payload,
      };

    case GET_RELATIONATED:
      return {
        ...state,
        relationated: action.payload,
      };

    case POST_PACKAGE:
      return {
        ...state,
      };

    case POST_USER:
      return {
        ...state,
        user: action.payload,
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
        users: {},
      };

    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case GET_USER_BY_ID:
      return {
        ...state,
        user: action.payload,
      };

    case ORDER_BY_PRICE:
      let sortPrice =
        action.payload === "minPrice"
          ? state.filteredPackages.sort(function (a, b) {
            if (a.price > b.price) return 1;
            if (b.price > a.price) return -1;
            return 0;
          })
          : state.filteredPackages.sort(function (a, b) {
            if (a.price > b.price) return -1;
            if (b.price > a.price) return 1;
            return 0;
          });
      let favSort =
        action.payload === "minPrice"
          ? state.favorites.sort(function (a, b) {
            if (a.price > b.price) return 1;
            if (b.price > a.price) return -1;
            return 0;
          })
          : state.favorites.sort(function (a, b) {
            if (a.price > b.price) return -1;
            if (b.price > a.price) return 1;
            return 0;
          });
      return {
        ...state,
        filteredPackages: sortPrice,
        favorites: favSort,
      };

    case FILTER_BY_DESTINATION:
      const allPackages = state.allPackages;
      let aux = [];
      action.payload === "all"
        ? allPackages.forEach((e) => aux.push(e))
        : allPackages.filter((p) =>
          p.destinations.forEach((el) => {
            el.name === action.payload && aux.push(p);
          })
        );

      return {
        ...state,
        filteredPackages: aux,
      };

    case FILTER_PACKAGES_BY_DATE:
      let filteredPackagesDate = [];
      state.filteredPackages.forEach((p) =>
        action.payload.forEach(
          (f) => p.id === f.id && filteredPackagesDate.push(f)
        )
      );
      return {
        ...state,
        filteredPackages: filteredPackagesDate,
      };

    case GET_ALL_CATEGORIES:
      let sortCategories = action.payload.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (b.name > a.name) return -1;
        return 0;
      });

      return {
        ...state,
        categories: sortCategories,
      };

    case GET_PK_REGION:
      return {
        ...state,
        filteredPackages: action.payload,
      };

    case GET_LOCAL_STORAGE_FAVORITES:
      let localStorageFav = JSON.parse(localStorage.getItem("favorites")) || [];
      return {
        ...state,
        favoritesLocalStorage: localStorageFav,
      };

    case GET_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };

    case GET_LOCAL_STORAGE_CART:
      let localStorageCart = JSON.parse(localStorage.getItem("cart")) || [];
      return {
        ...state,
        cart: localStorageCart
      };

    case GET_CART:
      return {
        ...state,
        cart: action.payload
      };

    case UPDATE_CART:
      let newCart = state.cart;
      newCart.push(action.payload)
      return {
        ...state,
        cart: newCart
      }

    case FILTRAR:
      console.log("filtrar", action);
      // primero ordenamos
      let ordenados = funcionOdenar(
        state.allPackages,
        state.ordenado.tipo,
        state.ordenado.forma
      );

      // filtramos
      //por destino
      if (action.id === "searchDestinations") {
        let filtradosDestino = filtrarDestinos(ordenados, action.target);
        let filtradosFechaDesde = filtrarFechaDesde(
          filtradosDestino,
          state.filtradoDateMin?.length ? state.filtradoDateMin : "all"
        );
        let filtradosFechaHasta = filtrarFechaHasta(
          filtradosFechaDesde,
          state.filtradoDateMax?.length ? state.filtradoDateMax : "all"
        );
        let filtradoPrecioDesde = filtrarPrecioDesde(
          filtradosFechaHasta,
          state.priceFilterMin
        );
        let filtradoPrecioHasta = filtrarPrecioHasta(
          filtradoPrecioDesde,
          state.priceFilterMax
        );
        let filtradoType = filtrarType(
          filtradoPrecioHasta,
          state.filtradoType?.length ? state.filtradoType : "all"
        );
        return {
          ...state,
          filteredPackages: filtradoType,
          filtradoDestino: action.target,
        };
      }
      //por fecha desde
      if (action.id === "from") {
        let filtradoFechaDesde = filtrarFechaDesde(ordenados, action.target);
        let filtradoDestino = filtrarDestinos(
          filtradoFechaDesde,
          state.filtradoDestino?.length ? state.filtradoDestino : "all"
        );
        let filtradoFechaHasta = filtrarFechaHasta(
          filtradoDestino,
          state.filtradoDateMax.length ? state.filtradoDateMax : "all"
        );
        let filtradoPrecioDesde = filtrarPrecioDesde(
          filtradoFechaHasta,
          state.priceFilterMin
        );
        let filtradoPrecioHasta = filtrarPrecioHasta(
          filtradoPrecioDesde,
          state.priceFilterMax
        );
        let filtradoType = filtrarType(
          filtradoPrecioHasta,
          state.filtradoType?.length ? state.filtradoType : "all"
        );
        return {
          ...state,
          filteredPackages: filtradoType,
          filtradoDateMin: action.target,
        };
      }
      //por fecha hasta
      if (action.id === "until") {
        let filtradoFechaHasta = filtrarFechaHasta(ordenados, action.target);
        let filtradoDestino = filtrarDestinos(
          filtradoFechaHasta,
          state.filtradoDestino?.length ? state.filtradoDestino : "all"
        );
        let filtradosFechaDesde = filtrarFechaDesde(
          filtradoDestino,
          state.filtradoDateMin?.length ? state.filtradoDateMin : "all"
        );

        let filtradoPrecioDesde = filtrarPrecioDesde(
          filtradosFechaDesde,
          state.priceFilterMin
        );
        let filtradoPrecioHasta = filtrarPrecioHasta(
          filtradoPrecioDesde,
          state.priceFilterMax
        );

        let filtradoType = filtrarType(
          filtradoPrecioHasta,
          state.filtradoType?.length ? state.filtradoType : "all"
        );
        return {
          ...state,
          filteredPackages: filtradoType,
          filtradoDateMax: action.target,
        };
      }

      //por Type
      if (action.id === "searchType") {
        let filtradoType = filtrarType(ordenados, action.target);

        let filtradoDestino = filtrarDestinos(
          filtradoType,
          state.filtradoDestino.length ? state.filtradoDestino : "all"
        );
        let filtradosFechaDesde = filtrarFechaDesde(
          filtradoDestino,
          state.filtradoDateMin?.length ? state.filtradoDateMin : "all"
        );
        let filtradoFechaHasta = filtrarFechaHasta(
          filtradosFechaDesde,
          state.filtradoDateMax?.length ? state.filtradoDateMax : "all"
        );
        let filtradoPrecioDesde = filtrarPrecioDesde(
          filtradoFechaHasta,
          state.priceFilterMin
        );
        let filtradoPrecioHasta = filtrarPrecioHasta(
          filtradoPrecioDesde,
          state.priceFilterMax
        );
        return {
          ...state,
          filteredPackages: filtradoPrecioHasta,
          filtradoType: action.target,
        };
      }

      //filtrado precio DESDE
      if (action.id === "precioDesde") {
        let filtadosPrecioDesde = filtrarPrecioDesde(ordenados, action.target);
        let filtradoDestino = filtrarDestinos(
          filtadosPrecioDesde,
          state.filtradoDestino?.length ? state.filtradoDestino : "all"
        );
        let filtradosFechaDesde = filtrarFechaDesde(
          filtradoDestino,
          state.filtradoDateMin?.length ? state.filtradoDateMin : "all"
        );

        let filtradoFechaHasta = filtrarFechaHasta(
          filtradosFechaDesde,
          state.filtradoDateMax?.length ? state.filtradoDateMax : "all"
        );
        let filtradoPrecioHasta = filtrarPrecioHasta(
          filtradoFechaHasta,
          state.priceFilterMax < action.target
            ? action.target
            : state.priceFilterMax
        );
        console.log(filtradoFechaHasta);
        console.log(filtradoPrecioHasta);
        let filtradoType = filtrarType(
          filtradoPrecioHasta,
          state.filtradoType?.length ? state.filtradoType : "all"
        );
        return {
          ...state,
          filteredPackages: filtradoType,
          priceFilterMin: action.target,
          priceFilterMax:
            state.priceFilterMax < action.target
              ? action.target
              : state.priceFilterMax,
        };
      }

      //filtrado precio HASTA
      if (action.id === "precioHasta") {
        let filtadosPrecioHasta = filtrarPrecioHasta(ordenados, action.target);

        let filtradoDestino = filtrarDestinos(
          filtadosPrecioHasta,
          state.filtradoDestino?.length ? state.filtradoDestino : "all"
        );
        let filtradosFechaDesde = filtrarFechaDesde(
          filtradoDestino,
          state.filtradoDateMin?.length ? state.filtradoDateMin : "all"
        );
        let filtradoFechaHasta = filtrarFechaHasta(
          filtradosFechaDesde,
          state.filtradoDateMax?.length ? state.filtradoDateMax : "all"
        );
        let filtradoPrecioDesde = filtrarPrecioDesde(
          filtradoFechaHasta,
          state.priceFilterMin > action.target
            ? action.target
            : state.priceFilterMin
        );
        let filtradoType = filtrarType(
          filtradoPrecioDesde,
          state.filtradoType?.length ? state.filtradoType : "all"
        );
        console.log(filtradoType);
        return {
          ...state,
          filteredPackages: filtradoType,
          priceFilterMin:
            state.priceFilterMin > action.target
              ? action.target
              : state.priceFilterMin,
          priceFilterMax: action.target,
        };
      }

      //reiniciar estados
      if (action.id === "reset") {
        return {
          ...state,
          filteredPackages: action.payload,
          ordenado: { tipo: "precio", forma: "asc" },
          limitRender: 100000,
          filtradoType: "",
          filtradoRegion: "",
          filtradoDestino: "",
          filtradoDateMin: "",
          filtradoDateMax: "",
          priceFilterMin: 0,
          priceFilterMax: 1000000,
        };
      }
    case ORDENAR:
      console.log("ordenar", action);
      if (action.target === "precio" || action.target === "duracion") {
        const ordenadas = funcionOdenar(
          state.filteredPackages.length < 1
            ? state.allPackages
            : state.filteredPackages,
          action.target,
          state.ordenado.forma
        );
        return {
          ...state,
          filteredPackages: ordenadas,
          ordenado: {
            ...state.ordenado,
            tipo: action.target,
          },
        };
      } else {
        const ordenadas = funcionOdenar(
          state.filteredPackages.length < 1
            ? state.allPackages
            : state.filteredPackages,
          state.ordenado.tipo,
          action.target
        );
        return {
          ...state,
          filteredPackages: ordenadas,
          ordenado: {
            ...state.ordenado,
            forma: action.target,
          },
        };
      }

    default:
      return { ...state };
  }
};

export default rootReducer;
