
import * as url from '../../urlConstants';
import $ from 'jquery';
import Auth from '../../helpers/Auth';

export const USER_ADD_START = 'USER_ADD_START';
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS'; 

export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'; 

export const GET_USERS_START = 'GET_USERS_START';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'; 

export const GET_ACTIVATE_USERS_START = "GET_ACTIVATE_USERS_START";
export const GET_USERS_ACTIVATE_SUCCESS = "GET_USERS_ACTIVATE_SUCCESS";
export const GET_USERS_ACTIVATE_FAIL = "GET_USERS_ACTIVATE_FAIL";


export const USER_LOGOUT = 'USER_LOGOUT';

let handleAuth = new Auth();

// User Register

export const userAddStart = () => {
    return { type: USER_ADD_START };
}

export const userAddSuccess = (userData) => {
    return { type: USER_ADD_SUCCESS, payload: userData };
}

export const userRegister = (data) => {
    return dispatch => {
        dispatch(userAddStart())
        return (
            $.post(url.url + "userRegister", data, (result) => {
                dispatch(userAddSuccess(result))
            })
        )
    }
 }

 // User logout

 export const userLogOut = () => {
     return { type : USER_LOGOUT }
 }


 // User Login

 export const userLoginStart = () => {
    return { type: USER_LOGIN_START };
}

export const userLoginSuccess = (userLogin) => {
    return { type: USER_LOGIN_SUCCESS, payload: userLogin };
}

export const userLogin = (data) => {
    return dispatch => {
        dispatch(userLoginStart())
        handleAuth.login(data)
        .then(result => {
            dispatch(userLoginSuccess(result))
        })
        .catch(error => {
            console.log("error", error)
        })
    }
 }

 // Get Users

 export const getUsersStart = () => {
    return { type: GET_USERS_START };
}

export const getUsersSuccess = (allUsers) => {
    return { type: GET_USERS_SUCCESS, payload: allUsers };
}

export const getUsers = (id) => {
    return dispatch => {
        dispatch(getUsersStart())
        return (
            $.get(url.url + `getUsers?id=${id}`, (result) => {
                dispatch(getUsersSuccess(result))
            })
        )
    }
 }
// Activate/Deactivate User

export const userActivatStart = () => {
    return { type: GET_ACTIVATE_USERS_START };
}

export const userActivateSuccess = (userActivate) => {
    return { type: GET_USERS_ACTIVATE_SUCCESS, payload: userActivate };
}

export const userActivateFail = () => {
    return { type: GET_USERS_ACTIVATE_FAIL }
}

export const userActivate = (id) => {
    return dispatch => {
        dispatch(userActivatStart())
        return (
            $.get(url.url + `userAcitivate?id=${id}`, (result) => {
                dispatch(userActivateSuccess(result))
            })
        )
    }
 }
