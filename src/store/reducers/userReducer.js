import { USER_ADD_START, USER_ADD_SUCCESS, 
        USER_LOGIN_SUCCESS, USER_LOGIN_START,
        GET_USERS_START, GET_USERS_SUCCESS, USER_LOGOUT 
} from '../actions/userActions';

const intialState = {

    userLogin: {},
    userRegister: {},
    allUsers : [],
    userLoading: false,
    loginLoading: false,
    registerLoading: false

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
        default: {
            return state
        }
    }
}

export default userReducer;