import * as url from '../../urlConstants';
import axios from 'axios';
import Auth from '../../helpers/Auth';

export const ADD_VENDOR_START = "ADD_VENDOR_START";
export const ADD_VENDOR_SUCCESS = "ADD_VENDOR_SUCCESS";
export const ADD_VENDOR_FAIL = "ADD_VENDOR_FAIL";

export const GET_VENDOR_START = "GET_VENDOR_START";
export const GET_VENDOR_SUCCESS = "GET_VENDOR_SUCCESS";
export const GET_VENDOR_FAIL = "GET_VENDOR_FAIL"; 

export const DELETE_VENDOR_START = "DELETE_VENDOR_START";
export const DELETE_VENDOR_SUCCESS = "DELETE_VENDOR_SUCCESS";
export const DELETE_VENDOR_FAIL = "DELETE_VENDOR_FAIL";

let handleAuth = new Auth();


// Add VENDOR
export const addVendorStart = () => {
    return { type : ADD_VENDOR_START }
}

export const addVendorSuccess = (result) => {
    return { type: ADD_VENDOR_SUCCESS, payload : result }
}

export const addVendorFail = () => {
    return { type: ADD_VENDOR_FAIL }
}

export const addVendor = (data) => {
    return dispatch => {
        dispatch(addVendorStart());
        handleAuth.getToken().then(value => {
            axios.post(url.url + "addVendor", data, value)
                .then((result) => {
                    dispatch(addVendorSuccess(result.data));
                })
        })

    }
}

// Get VENDORs
export const getVendorStart = () => {
    return { type : ADD_VENDOR_START }
}

export const getVendorSuccess = (result) => {
    return { type: GET_VENDOR_SUCCESS, payload : result }
}

export const getVendorFail = () => {
    return { type: GET_VENDOR_FAIL }
}

export const getVendor = (id) => {
    return dispatch => {
        dispatch(getVendorStart());
        handleAuth.getToken().then(value => {
            axios.get(url.url + `getVendors?id=${id}`, value)
            .then((result) => {
                dispatch(getVendorSuccess(result.data));
            })
        })
    }
}

// Delete Vendor

export const deleteVendorStart = () => {
    return { type : DELETE_VENDOR_START }
}

export const deleteVendorSuccess = (result) => {
    return { type: DELETE_VENDOR_SUCCESS, payload : result }
}

export const deleteVendorFail = () => {
    return { type: DELETE_VENDOR_FAIL }
}

export const deleteVendor = (id) => {
    return dispatch => {
        dispatch(deleteVendorStart());
        handleAuth.getToken().then(value => {
            axios.get(url.url + `deleteVendors?id=${id}`, value)
                .then((result) => {
                    dispatch(deleteVendorSuccess(result.data));
                })
        })
    }
}