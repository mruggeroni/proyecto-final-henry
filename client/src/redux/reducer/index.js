import {
  GET_ALL_PACKAGE,
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
} from "./../actions/index.js";

const initialState = {
  allPackages: [],
  activities: [],
  destinations: [],
  regions: [],
  types: [],
  seasons: [],
  featured: [],
  onsale: [],
  detailPackages: {},
  user: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DESTINATIONS:
      return {
        ...state,
        destinations: action.payload,
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
    default:
      return { ...state };
  }
};

export default rootReducer;
