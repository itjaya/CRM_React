import * as url from '../../urlConstants';
import $ from 'jquery';

export const ADD_CLIENT_START = "ADD_CLIENT_START";
export const ADD_CLIENT_SUCCESS = "ADD_CLIENT_SUCCESS";
export const ADD_CLIENT_FAIL = "ADD_CLIENT_FAIL";

export const GET_CLIENT_START = "GET_CLIENT_START";
export const GET_CLIENT_SUCCESS = "GET_CLIENT_SUCCESS";
export const GET_CLIENT_FAIL = "GET_CLIENT_FAIL";

// Add CLIENT
export const addClientStart = () => {
    return { type : ADD_CLIENT_START }
}

export const addClientSuccess = (result) => {
    return { type: ADD_CLIENT_SUCCESS, payload : result }
}

export const addClientFail = () => {
    return { type: ADD_CLIENT_FAIL }
}

export const addClient = (data) => {
    return dispatch => {
        dispatch(addClientStart());
        $.post(url.url + "addClient", data, (result) => {
                dispatch(addClientSuccess(result));
        })
    }
}

// Get CLIENTs
export const getClientStart = () => {
    return { type : ADD_CLIENT_START }
}

export const getClientSuccess = (result) => {
    return { type: GET_CLIENT_SUCCESS, payload : result }
}

export const getClientFail = () => {
    return { type: GET_CLIENT_FAIL }
}

export const getClient = (id) => {
    return dispatch => {
        dispatch(getClientStart());
        $.get(url.url + `getClients?id=${id}`, (result) => {
            if(result) {
                dispatch(getClientSuccess(result));
            }
        })
    }
}