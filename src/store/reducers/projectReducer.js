import {
    ADD_PROJECT_START, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAIL,
    GET_PROJECT_START, GET_PROJECT_SUCCESS, GET_PROJECT_FAIL
} from '../actions/projectActions';

const initialState = {

    addLoading: false,
    addProjectResult: {},
    prjLoading : false,
    projects : []
}

const projectReducer = (state = initialState, action) => {
    switch (action.type) {

        // CLIENT Add
        case ADD_PROJECT_START:

            return {
                ...state,
                addLoading: true
            }


        case ADD_PROJECT_SUCCESS:

            return {
                ...state,
                addLoading: false,
                addProjectResult: action.payload
            }

        case ADD_PROJECT_FAIL:

            return {
                ...state,
                addLoading: false,
            }

        // Get Projects
        case GET_PROJECT_START:

            return {
                ...state,
                prjLoading: true
            }


        case GET_PROJECT_SUCCESS:

            return {
                ...state,
                prjLoading: false,
                projects: action.payload
            }

        case GET_PROJECT_FAIL:

            return {
                ...state,
                prjLoading: false,
            }


        default: {
            return state
        }
    }

}

export default projectReducer;