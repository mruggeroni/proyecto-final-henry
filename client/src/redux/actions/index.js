import axios from 'axios';

export const GET_PACKAGE_BY_ID = 'GET_PACKAGE_BY_ID';
export const GET_ALL_PACKAGE = 'GET_ALL_PACKAGE';

export const getAllPackage = () => {
    return async function(dispatch) {
        let res = await axios.get('http://localhost:3001/package');
        return dispatch({ type: GET_ALL_PACKAGE, payload: res.data })
    }
}

export const getPackageById = (id) => {
    return async function(dispatch) {
        let res = await axios.get('http://localhost:3001/package' + id );
        return dispatch({ type: GET_ALL_PACKAGE, payload: res.data })
    }
}
