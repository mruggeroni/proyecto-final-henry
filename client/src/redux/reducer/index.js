import {
  GET_ALL_PACKAGES,
  GET_PACKAGE_BY_ID,
  GET_DESTINATIONS,
  GET_REGIONS,
  SEARCH_PACKAGES,
  GET_ACTIVITIES,
  GET_TYPES,
  GET_SEASONS,
  GET_USER,
  GET_ALL_DESTINATIONS,
  GET_ON_SALE,
  GET_RELATIONATED,
  GET_DESTINATIONS_WITH_PACKAGES,
  POST_PACKAGE,
  ORDER_BY_PRICE,
  FILTER_BY_DESTINATION,
  FILTER_PACKAGES_BY_DATE
} from "./../actions/index.js";

const initialState = {
  allPackages: [],
  filteredPackages: [],
  activities: [],
  destinations: [],
  destinationsWithPackages: [],
  regions: [],
  types: [],
  seasons: [],
  featured: [],
  onsale: [],
  detailPackage: {},
  relationated: [],
  user: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PACKAGES:
      return {
        ...state,
        allPackages: action.payload,
      };

    case GET_ALL_DESTINATIONS:
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

    case POST_PACKAGE: //el case del POST por mas que no haga nada (devuelve el mismo objeto) tiene que estar SI O SI
      return {
        ...state,
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
      return {
        ...state,
        filteredPackages: sortPrice,
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
      state.filteredPackages.forEach( (p) => action.payload.forEach( (f) => p.id === f.id && filteredPackagesDate.push(f) ) )
      console.log(filteredPackagesDate)
      return {
        ...state,
        filteredPackages: filteredPackagesDate
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
