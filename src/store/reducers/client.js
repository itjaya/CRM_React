import {
    ADD_CLIENT_START, ADD_CLIENT_SUCCESS, ADD_CLIENT_FAIL,
    GET_CLIENT_START, GET_CLIENT_SUCCESS, GET_CLIENT_FAIL,
    DELETE_CLIENT_START, DELETE_CLIENT_SUCCESS, DELETE_CLIENT_FAIL,
} from '../actions/client';

const initialState = {

    addLoading: false,
    orgLoading: false,
    clientData: [],
    addResult: {},
    clientDelData: {}
}

const clientReducer = (state = initialState, action) => {
    switch (action.type) {

        // CLIENT Add
        case ADD_CLIENT_START:

            return {
                ...state,
                addLoading: true
            }


        case ADD_CLIENT_SUCCESS:

            return {
                ...state,
                addLoading: false,
                addResult: action.payload
            }

        case ADD_CLIENT_FAIL:

            return {
                ...state,
                addLoading: false,
            }

        // Get CLIENTS
        case GET_CLIENT_START:

            return {
                ...state,
                orgLoading: true
            }


        case GET_CLIENT_SUCCESS:

            return {
                ...state,
                orgLoading: false,
                clientData: action.payload
            }

        case GET_CLIENT_FAIL:

            return {
                ...state,
                orgLoading: false,
            }
        // delete VENDORS
        case DELETE_CLIENT_START:

            return {
                ...state,
                orgLoading: true
            }


        case DELETE_CLIENT_SUCCESS:

            return {
                ...state,
                orgLoading: false,
                clientDelData: action.payload
            }

        case DELETE_CLIENT_FAIL:

            return {
                ...state,
                orgLoading: false,
            }

        default: {
            return state
        }
    }

}

export default clientReducer;