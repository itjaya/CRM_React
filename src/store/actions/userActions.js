
import * as url from '../../urlConstants';
import $ from 'jquery';
import Auth from '../../helpers/Auth';
import axios from 'axios';

export const USER_ADD_START = 'USER_ADD_START';
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS'; 

export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'; 

export const GET_USERS_START = 'GET_USERS_START';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'; 

export const GET_ACTIVATE_USERS_START = "GET_ACTIVATE_USERS_START";
export const GET_USERS_ACTIVATE_SUCCESS = "GET_USERS_ACTIVATE_SUCCESS";
export const GET_USERS_ACTIVATE_FAIL = "GET_USERS_ACTIVATE_FAIL";

export const UPDATE_USER_PASSWORD_START = "UPDATE_USER_PASSWORD_START";
export const UPDATE_USER_PASSWORD_SUCCESS = "UPDATE_USER_PASSWORD_SUCCESS";
export const UPDATE_USER_PASSWORD_FAIL = "UPDATE_USER_PASSWORD_FAIL";

export const FORGET_USER_PASSWORD_START = "FORGET_USER_PASSWORD_START";
export const FORGET_USER_PASSWORD_SUCCESS = "FORGET_USER_PASSWORD_SUCCESS";
export const FORGET_USER_PASSWORD_FAIL = "FORGET_USER_PASSWORD_FAIL";

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
        handleAuth.getToken().then(value => {
            return (
                axios.get(url.url + `getUsers?id=${id}`, value)
                    .then((result) => {
                        dispatch(getUsersSuccess(result.data))
                    })
            )
        })
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
        dispatch(userActivatStart());
        handleAuth.getToken().then(value => {
            return (
                axios.get(url.url + `userAcitivate?id=${id}`, value)
                .then((result) => {
                    dispatch(userActivateSuccess(result.data))
                })
            )
        })
    }
 }

 // Update User Password

export const userUpdatePasswordStart = () => {
    return { type: UPDATE_USER_PASSWORD_START };
}

export const userUpdatePasswordSuccess = (userPassword) => {
    return { type: UPDATE_USER_PASSWORD_SUCCESS, payload: userPassword };
}

export const userUpdatePasswordFail = () => {
    return { type: UPDATE_USER_PASSWORD_FAIL }
}

export const userUpdatePassword = (data) => {
    return dispatch => {
        dispatch(userUpdatePasswordStart())
        return (
            $.post(url.url + "passwordUpdate",data, (result) => {
                dispatch(userUpdatePasswordSuccess(result))
            })
        )
    }
 }

 // Forget Password

 export const userForgetPasswordStart = () => {
    return { type: FORGET_USER_PASSWORD_START };
}

export const userForgetPasswordSuccess = (forgetPassword) => {
    return { type: FORGET_USER_PASSWORD_SUCCESS, payload: forgetPassword };
}

export const userForgetPasswordFail = () => {
    return { type: FORGET_USER_PASSWORD_FAIL }
}

export const userForgetPassword = (data) => {
    return dispatch => {
        dispatch(userForgetPasswordStart())
        return (
            $.post(url.url + "forgetPassword",data, (result) => {
                dispatch(userForgetPasswordSuccess(result))
            })
        )
    }
 }