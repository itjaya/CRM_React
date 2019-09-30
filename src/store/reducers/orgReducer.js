import {
    ADD_ORGANIZATION_START, ADD_ORGANIZATION_SUCCESS, ADD_ORGANIZATION_FAIL,
    GET_ORGANIZATION_START, GET_ORGANIZATION_SUCCESS, GET_ORGANIZATION_FAIL,
    GET_ORGDETAIL_START, GET_ORGDETAIL_SUCCESS, GET_ORGDETAIL_FAIL,
    DELETE_ORGANIZATION_START, DELETE_ORGANIZATION_SUCCESS, DELETE_ORGANIZATION_FAIL
} from '../actions/orgActions';

let orgData = sessionStorage.getItem("orgId");

const initialState = {

    addLoading: false,
    orgLoading: false,
    orgData: [],
    addResult: {},
    orgResult: {},
    deleteResult : {}
}

const orgReducer = (state = initialState, action) => {

    switch (action.type) {

        // Organization Add
        case ADD_ORGANIZATION_START:

            return {
                ...state,
                addLoading: true
            }


        case ADD_ORGANIZATION_SUCCESS:

            return {
                ...state,
                addLoading: false,
                addResult: action.payload
            }

        case ADD_ORGANIZATION_FAIL:

            return {
                ...state,
                addLoading: false,
            }

        // Get Organizations
        case GET_ORGANIZATION_START:

            return {
                ...state,
                orgLoading: true
            }


        case GET_ORGANIZATION_SUCCESS:

            return {
                ...state,
                orgLoading: false,
                orgData: action.payload
            }

        case GET_ORGANIZATION_FAIL:

            return {
                ...state,
                orgLoading: false,
            }

        // Get Organizations By Name
        case GET_ORGDETAIL_START:

            return {
                ...state,
                addLoading: true
            }

        case GET_ORGDETAIL_SUCCESS:

            return {
                ...state,
                addLoading: false,
                orgResult: action.payload ? action.payload : orgData
            }

        case GET_ORGDETAIL_FAIL:

            return {
                ...state,
                addLoading: false,
                orgResult : {}
            }

         // Delete Organization
         case DELETE_ORGANIZATION_START:

            return {
                ...state,
            }

        case DELETE_ORGANIZATION_SUCCESS:

            return {
                ...state,
                deleteResult: action.payload
            }

        case DELETE_ORGANIZATION_FAIL:

            return {
                ...state,
            }
        default: {
            return state
        }
    }

}

export default orgReducer;