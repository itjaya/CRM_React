import { ADD_VENDOR_START, ADD_VENDOR_SUCCESS, ADD_VENDOR_FAIL,
    GET_VENDOR_START, GET_VENDOR_SUCCESS, GET_VENDOR_FAIL,
    DELETE_VENDOR_START, DELETE_VENDOR_SUCCESS, DELETE_VENDOR_FAIL

} from '../actions/vendor';

const initialState = {

addLoading : false,
orgLoading : false,
vendorData : [],
addResult : {},
vendorDELData : {}
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

        // delete VENDORS
    case DELETE_VENDOR_START:

    return {
        ...state,
        orgLoading: true
    }


case DELETE_VENDOR_SUCCESS:

    return {
        ...state,
        orgLoading: false,
        vendorDELData: action.payload
    }

case DELETE_VENDOR_FAIL:

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