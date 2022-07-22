import { 
    GET_ALL_PACKAGE,
    GET_PACKAGE_BY_ID,
    GET_DESTINATIONS,
    GET_REGIONS,
    SEARCH_PACKAGES,
    GET_ACTIVITIES,
    GET_TYPES,
    GET_SEASONS,
    GET_USER
} from './../actions/index.js';

const initialState = {
    allPackages: [],
    activities: [],
    destinations: [],
    regions: [],
    types: [],
    seasons: [],
    featured: [],
    detailPackages: {},
    user: {}
}

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        default:
            return { ...state }
    }
}

export default rootReducer;