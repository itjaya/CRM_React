import { TIMESHEET_ADD_START, TIMESHEET_ADD_SUCCESS, TIMESHEETS_GET_START, TIMESHEETS_GET_SUCCESS,
    TIMESHEETS_DOWNLOAD_START,TIMESHEETS_DOWNLOAD_SUCCESS
} from '../actions/timesheet';

const intialState = {

    timesheetResult : {},
    dataLoading: false,
    allEvents : [],
    eventsLoading : false
}

const timesheetReducer = (state = intialState, action) => {

    switch (action.type) {
        // Add Timesheets
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

         // Get Timesheets
         case TIMESHEETS_GET_START:
            return {
                ...state,
                eventsLoading: true
            }
        case TIMESHEETS_GET_SUCCESS:
            return {
                ...state,
                allEvents: action.payload,
                eventsLoading: false
            }
              // Download Timesheets
         case TIMESHEETS_DOWNLOAD_START:
            return {
                ...state,
                eventsLoading: true
            }
        case TIMESHEETS_DOWNLOAD_SUCCESS:
            return {
                ...state,
                allEvents: action.payload,
                eventsLoading: false
            }
        default: {
            return state
        }
    }
}

export default timesheetReducer;