import { TIMESHEET_ADD_START, TIMESHEET_ADD_SUCCESS } from '../actions/timesheet';

const intialState = {

    timesheetResult : {},
    dataLoading: false
}

const timesheetReducer = (state = intialState, action) => {

    switch (action.type) {
        // User Register
        case TIMESHEET_ADD_START:
            return {
                ...state,
                dataLoading: true
            }
        case TIMESHEET_ADD_SUCCESS:
            return {
                ...state,
                timesheetResult: action.payload,
                dataLoading: false
            }
        default: {
            return state
        }
    }
}

export default timesheetReducer;