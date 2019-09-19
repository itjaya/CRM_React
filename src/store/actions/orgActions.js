import * as url from '../../urlConstants';
import $ from 'jquery';

export const ADD_ORGANIZATION_START = "ADD_ORGANIZATION_START";
export const ADD_ORGANIZATION_SUCCESS = "ADD_ORGANIZATION_SUCCESS";
export const ADD_ORGANIZATION_FAIL = "ADD_ORGANIZATION_FAIL";

export const GET_ORGANIZATION_START = "GET_ORGANIZATION_START";
export const GET_ORGANIZATION_SUCCESS = "GET_ORGANIZATION_SUCCESS";
export const GET_ORGANIZATION_FAIL = "GET_ORGANIZATION_FAIL";

export const GET_ORGDETAIL_START = "GET_ORGDETAIL_START";
export const GET_ORGDETAIL_SUCCESS = "GET_ORGDETAIL_SUCCESS";
export const GET_ORGDETAIL_FAIL = "GET_ORGDETAIL_FAIL";

export const DELETE_ORGANIZATION_START = "DELETE_ORGANIZATION_START";
export const DELETE_ORGANIZATION_SUCCESS = "DELETE_ORGANIZATION_SUCCESS";
export const DELETE_ORGANIZATION_FAIL = "DELETE_ORGANIZATION_FAIL";


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
            dispatch(addOrgSuccess(result));
       
        })
    }
}

// Get Organizations
export const getOrgStart = () => {
    return { type : GET_ORGANIZATION_START }
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


// Get organization by name
export const getOrgByNameStart = () => {
    return { type : GET_ORGDETAIL_START }
}

export const getOrgByNameSuccess = (result) => {
    return { type: GET_ORGDETAIL_SUCCESS, payload : result }
}

export const getOrgByNameFail = () => {
    return { type: GET_ORGDETAIL_FAIL }
}

export const getOrganizationByName = (name) => {
    return dispatch => {
        dispatch(getOrgByNameStart());
        $.get(url.url + `getOrganizationByName?name=${name}`, (result) => {
            if(result) {
                sessionStorage.setItem("orgId", result)
                dispatch(getOrgByNameSuccess(result));
            }
        })
    }
}

// Remove organization data
export const deleteOrgStart = () => {
    return { type : DELETE_ORGANIZATION_START }
}

export const deleteOrgSuccess = (result) => {
    return { type: DELETE_ORGANIZATION_SUCCESS, payload : result }
}

export const deleteOrgFail = () => {
    return { type: DELETE_ORGANIZATION_FAIL }
}

export const deleteOrganization = (id) => {
    return dispatch => {
        dispatch(deleteOrgStart());
        $.post(url.url + `deleteOrganization?id=${id}`, (result) => {
            if(result.condition) {
                dispatch(deleteOrgSuccess(result));
            }
            else {
                dispatch(deleteOrgFail());
            }
        })
    }
}

