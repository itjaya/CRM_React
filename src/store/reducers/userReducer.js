import { USER_ADD_START, USER_ADD_SUCCESS, 
        USER_LOGIN_SUCCESS, USER_LOGIN_START,
        GET_USERS_START, GET_USERS_SUCCESS, USER_LOGOUT,
        GET_ACTIVATE_USERS_START, GET_USERS_ACTIVATE_SUCCESS, GET_USERS_ACTIVATE_FAIL,
        UPDATE_USER_PASSWORD_START,UPDATE_USER_PASSWORD_SUCCESS,UPDATE_USER_PASSWORD_FAIL,
        FORGET_USER_PASSWORD_START,FORGET_USER_PASSWORD_SUCCESS,FORGET_USER_PASSWORD_FAIL
} from '../actions/userActions';

let user = JSON.parse(sessionStorage.getItem('userData'));

const intialState = {

    userLogin: user ? user : {},
    userRegister: {},
    allUsers : [],
    userLoading: false,
    loginLoading: false,
    registerLoading: false,
    userPassword : {},
    forgetPassword : {}

}

const userReducer = (state = intialState, action) => {

    switch (action.type) {
        // User Register
        case USER_ADD_START:
            return {
                ...state,
                registerLoading: true
            }
        case USER_ADD_SUCCESS:
            return {
                ...state,
                userRegister: action.payload,
                registerLoading: false
            }

        // User Login
        case USER_LOGIN_START:
            return {
                ...state,
                loginLoading: true
            }

        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                userLogin: action.payload,
                loginLoading: false
            }

        // Get All Users
        case GET_USERS_START:
            return {
                ...state,
                userLoading: true
            }

        case GET_USERS_SUCCESS:
            return {
                ...state,
                allUsers: action.payload,
                userLoading: false
            }

        // User logout
        case USER_LOGOUT:
            return {
                ...intialState,
            }
                    // Activate VENDORS
        case GET_ACTIVATE_USERS_START:

            return {
                ...state,
                orgLoading: true
            }


        case GET_USERS_ACTIVATE_SUCCESS:

            return {
                ...state,
                orgLoading: false,
                clientDelData: action.payload
            }

        case GET_USERS_ACTIVATE_FAIL:

            return {
                ...state,
                orgLoading: false,
            }
            
            // Update Password

            case UPDATE_USER_PASSWORD_START:

            return {
                ...state,
                orgLoading: true
            }


        case UPDATE_USER_PASSWORD_SUCCESS:

            return {
                ...state,
                orgLoading: false,
                userPassword: action.payload
            }

        case UPDATE_USER_PASSWORD_FAIL:

            return {
                ...state,
                orgLoading: false,
            }
             // forget Password

             case FORGET_USER_PASSWORD_START:

             return {
                 ...state,
                 orgLoading: true
             }
 
 
         case FORGET_USER_PASSWORD_SUCCESS:
 
             return {
                 ...state,
                 orgLoading: false,
                 forgetPassword: action.payload
             }
 
         case FORGET_USER_PASSWORD_FAIL:
 
             return {
                 ...state,
                 orgLoading: false,
             }
        default: {
            return state
        }
    }
}

export default userReducer;