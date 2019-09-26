import * as url from '../../urlConstants';
import $ from 'jquery';

export const ADD_VENDOR_START = "ADD_VENDOR_START";
export const ADD_VENDOR_SUCCESS = "ADD_VENDOR_SUCCESS";
export const ADD_VENDOR_FAIL = "ADD_VENDOR_FAIL";

export const GET_VENDOR_START = "GET_VENDOR_START";
export const GET_VENDOR_SUCCESS = "GET_VENDOR_SUCCESS";
export const GET_VENDOR_FAIL = "GET_VENDOR_FAIL";

export const DELETE_VENDOR_START = "DELETE_VENDOR_START";
export const DELETE_VENDOR_SUCCESS = "DELETE_VENDOR_SUCCESS";
export const DELETE_VENDOR_FAIL = "DELETE_VENDOR_FAIL";

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
    console.log("haiiiii")
    return dispatch => {
        dispatch(addVendorStart());
        $.post(url.url + "addVendor", data, (result) => {
                dispatch(addVendorSuccess(result));
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
        $.get(url.url + `getVendors?id=${id}`, (result) => {
            if(result) {
                dispatch(getVendorSuccess(result));
            }
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
        $.get(url.url + `deleteVendors?id=${id}`, (result) => {
            if(result) {
                dispatch(deleteVendorSuccess(result));
            }
        })
    }
}