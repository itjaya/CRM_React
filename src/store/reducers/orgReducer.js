import { ADD_ORGANIZATION_START, ADD_ORGANIZATION_SUCCESS, ADD_ORGANIZATION_FAIL,
        GET_ORGANIZATION_START, GET_ORGANIZATION_SUCCESS, GET_ORGANIZATION_FAIL
} from '../actions/orgActions';

const initialState = {

    addLoading : false,
    orgLoading : false,
    orgData : [],
    addResult : {},
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


        default: {
            return state
        }
    }

}

export default orgReducer;