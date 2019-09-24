import {
    ADD_ADDRESS_START, ADD_ADDRESS_SUCCESS, ADD_ADDRESS_FAIL,
    GET_USER_DEATILS_START,GET_USER_DEATILS_SUCCESS,GET_USER_DEATILS_FAIL
} from '../actions/address';

const initialState = {

    addLoading: false,
    orgLoading: false,
    clientData: [],
    userDetails: {},
    clientDelData: {}
}

const addressReducer = (state = initialState, action) => {
    // console.log("ASHOK", action.payload)
    switch (action.type) {

        // ADDRESS Add
        case ADD_ADDRESS_START:

            return {
                ...state,
                addLoading: true
            }


        case ADD_ADDRESS_SUCCESS:

            return {
                ...state,
                addLoading: false,
                addResult: action.payload
            }

        case ADD_ADDRESS_FAIL:

            return {
                ...state,
                addLoading: false,
            }

              // user details get

        case GET_USER_DEATILS_START:

        return {
            ...state,
            addLoading: true
        }


    case GET_USER_DEATILS_SUCCESS:

        return {
            ...state,
            addLoading: false,
            userDetails: action.payload
        }

    case GET_USER_DEATILS_FAIL:

        return {
            ...state,
            addLoading: false,
        }

        default: {
            return state
        }
    }

}

export default addressReducer;