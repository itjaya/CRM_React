import * as url from '../../urlConstants';
import axios from 'axios';
import Auth from '../../helpers/Auth';

export const ADD_ADDRESS_START = "ADD_ADDRESS_START";
export const ADD_ADDRESS_SUCCESS = "ADD_ADDRESS_SUCCESS";
export const ADD_ADDRESS_FAIL = "ADD_ADDRESS_FAIL";

export const GET_USER_DEATILS_START = "GET_USER_DEATILS_START";
export const GET_USER_DEATILS_SUCCESS = "GET_USER_DEATILS_SUCCESS";
export const GET_USER_DEATILS_FAIL = "GET_USER_DEATILS_FAIL";

let handleAuth = new Auth();

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
        handleAuth.getToken().then(value => {
            axios.post(url.url + "addAddress", data, value)
            .then((result) => {
                dispatch(addAddressSuccess(result.data));
            })
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
        handleAuth.getToken().then(value => {
            axios.get(url.url + `getusersDetails?id=${id}`, value)
            .then((result) => {
                if(result) {
                    dispatch(getUserDetailsSuccess(result.data));
                }
            })
        })
       
    }
}
