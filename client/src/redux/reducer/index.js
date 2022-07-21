const initialState = {
    allPackages: [],
    activities: [],
    destinations: [],
    types: [],
    seasons: [],
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