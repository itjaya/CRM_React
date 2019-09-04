import { ADD_VENDOR_START, ADD_VENDOR_SUCCESS, ADD_VENDOR_FAIL,
    GET_VENDOR_START, GET_VENDOR_SUCCESS, GET_VENDOR_FAIL
} from '../actions/vendor';

const initialState = {

addLoading : false,
orgLoading : false,
vendorData : [],
addResult : {},
}

const vendorReducer = (state = initialState, action) => {
switch (action.type) {

    // VENDOR Add
    case ADD_VENDOR_START:

        return {
            ...state,
            addLoading: true
        }


    case ADD_VENDOR_SUCCESS:

        return {
            ...state,
            addLoading: false,
            addResult: action.payload
        }

    case ADD_VENDOR_FAIL:

        return {
            ...state,
            addLoading: false,
        }

    // Get VENDORS
    case GET_VENDOR_START:

        return {
            ...state,
            orgLoading: true
        }


    case GET_VENDOR_SUCCESS:

        return {
            ...state,
            orgLoading: false,
            vendorData: action.payload
        }

    case GET_VENDOR_FAIL:

        return {
            ...state,
            orgLoading: false,
        }


    default: {
        return state
    }
}

}

export default vendorReducer;