import * as url from '../../urlConstants';
import $ from 'jquery';

export const ADD_ADDRESS_START = "ADD_ADDRESS_START";
export const ADD_ADDRESS_SUCCESS = "ADD_ADDRESS_SUCCESS";
export const ADD_ADDRESS_FAIL = "ADD_ADDRESS_FAIL";

export const GET_USER_DEATILS_START = "GET_USER_DEATILS_START";
export const GET_USER_DEATILS_SUCCESS = "GET_USER_DEATILS_SUCCESS";
export const GET_USER_DEATILS_FAIL = "GET_USER_DEATILS_FAIL";

// export const DELETE_CLIENT_START = "DELETE_CLIENT_START";
// export const DELETE_CLIENT_SUCCESS = "DELETE_CLIENT_SUCCESS";
// export const DELETE_CLIENT_FAIL = "DELETE_CLIENT_FAIL";

// Add CLIENT
export const addAddressStart = () => {
    return { type : ADD_ADDRESS_START }
}

export const addAddressSuccess = (result) => {
    return { type: ADD_ADDRESS_SUCCESS, payload : result }
}

export const addAddressFail = () => {
    return { type: ADD_ADDRESS_FAIL }
}

export const addAddress = (data) => {
    return dispatch => {
        dispatch(addAddressStart());
        $.post(url.url + "addAddress", data, (result) => {
                dispatch(addAddressSuccess(result));
        })
    }
}

// Get Address
export const getUserDetailsStart = () => {
    return { type : GET_USER_DEATILS_START }
}

export const getUserDetailsSuccess = (result) => {
    return { type: GET_USER_DEATILS_SUCCESS, payload : result }
}

export const getUserDetailsFail = () => {
    return { type: GET_USER_DEATILS_FAIL }
}

export const getUserDetailes = (id) => {
    return dispatch => {
        dispatch(getUserDetailsStart());
        $.get(url.url + `getusersDetails?id=${id}`, (result) => {
            if(result) {
                dispatch(getUserDetailsSuccess(result));
            }
        })
    }
}

// Delete Vendor

// export const deleteClientStart = () => {
//     return { type : DELETE_CLIENT_START }
// }

// export const deleteClientSuccess = (result) => {
//     return { type: DELETE_CLIENT_SUCCESS, payload : result }
// }

// export const deleteClientFail = () => {
//     return { type: DELETE_CLIENT_FAIL }
// }

// export const deleteClient = (id) => {
//     return dispatch => {
//         dispatch(deleteClientStart());
//         $.get(url.url + `deleteClients?id=${id}`, (result) => {
//             if(result) {
//                 dispatch(deleteClientSuccess(result));
//             }
//         })
//     }
// }