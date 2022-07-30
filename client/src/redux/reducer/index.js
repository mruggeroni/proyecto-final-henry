import {
  GET_ALL_PACKAGES,
  GET_PACKAGE_BY_ID,
  GET_DESTINATIONS,
  GET_REGIONS,
  SEARCH_PACKAGES,
  GET_ACTIVITIES,
  GET_TYPES,
  GET_SEASONS,
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
  GET_LOCAL_STORAGE_CART
} from "./../actions/index.js";

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
  favorites: [],
  featured: [],
  onsale: [],
  detailPackage: {},
  relationated: [],
  users: [],
  user: {},
  categories: [],
  region: [],
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
    case GET_ALL_REGION:
      const regiones = action.payload.map();

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
        users: action.payload
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
        favorites: favSort
      };

    case FILTER_BY_DESTINATION:
      return {
        ...state,
        filteredPackages: action.payload,
      };
    case FILTER_PACKAGES_BY_DATE:
      let filteredPackagesDate = [];
      state.filteredPackages.forEach((p) =>
        action.payload.forEach(
          (f) => p.id === f.id && filteredPackagesDate.push(f)
        )
      );
      console.log(filteredPackagesDate);
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
        allPackages: action.payload
      }
    case GET_LOCAL_STORAGE_FAVORITES:
      let localStorageFav = JSON.parse(localStorage.getItem('favorites'));
      return {
        ...state,
        favorites: localStorageFav,
      };
    case GET_LOCAL_STORAGE_CART:
      let localStorageCart = JSON.parse(localStorage.getItem('cart'));
      return {
        ...state,
        cart: localStorageCart,
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
