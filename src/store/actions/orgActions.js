import * as url from '../../urlConstants';
import $ from 'jquery';

export const ADD_ORGANIZATION_START = "ADD_ORGANIZATION_START";
export const ADD_ORGANIZATION_SUCCESS = "ADD_ORGANIZATION_SUCCESS";
export const ADD_ORGANIZATION_FAIL = "ADD_ORGANIZATION_FAIL";

export const GET_ORGANIZATION_START = "GET_ORGANIZATION_START";
export const GET_ORGANIZATION_SUCCESS = "GET_ORGANIZATION_SUCCESS";
export const GET_ORGANIZATION_FAIL = "GET_ORGANIZATION_FAIL";

// Add Organization
export const addOrgStart = () => {
    return { type : ADD_ORGANIZATION_START }
}

export const addOrgSuccess = (result) => {
    return { type: ADD_ORGANIZATION_SUCCESS, payload : result }
}

export const addOrgFail = () => {
    return { type: ADD_ORGANIZATION_FAIL }
}

export const addOrganization = (data) => {
    return dispatch => {
        dispatch(addOrgStart());
        $.post(url.url + "addOrganization", data, (result) => {
            console.log("result", result)
            if(result.condition) {
                dispatch(addOrgSuccess(result));
            }
            else {
                dispatch(addOrgFail());
            }
        })
    }
}

// Get Organizations
export const getOrgStart = () => {
    return { type : ADD_ORGANIZATION_START }
}

export const getOrgSuccess = (result) => {
    return { type: GET_ORGANIZATION_SUCCESS, payload : result }
}

export const getOrgFail = () => {
    return { type: GET_ORGANIZATION_FAIL }
}

export const getOrganization = () => {
    return dispatch => {
        dispatch(getOrgStart());
        $.get(url.url + "getOrganizations", (result) => {
            if(result) {
                dispatch(getOrgSuccess(result));
            }
        })
    }
}
