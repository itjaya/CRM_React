import * as url from '../../urlConstants';
import $ from 'jquery';

export const ADD_VENDOR_START = "ADD_VENDOR_START";
export const ADD_VENDOR_SUCCESS = "ADD_VENDOR_SUCCESS";
export const ADD_VENDOR_FAIL = "ADD_VENDOR_FAIL";

export const GET_VENDOR_START = "GET_VENDOR_START";
export const GET_VENDOR_SUCCESS = "GET_VENDOR_SUCCESS";
export const GET_VENDOR_FAIL = "GET_VENDOR_FAIL";

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

export const getVendor = () => {
    return dispatch => {
        dispatch(getVendorStart());
        $.get(url.url + "getVendors", (result) => {
            if(result) {
                dispatch(getVendorSuccess(result));
            }
        })
    }
}