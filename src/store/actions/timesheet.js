import * as url from '../../urlConstants';
import $ from 'jquery';

export const TIMESHEET_ADD_START = 'TIMESHEET_ADD_START';
export const TIMESHEET_ADD_SUCCESS = 'TIMESHEET_ADD_SUCCESS'; 

// Add Timesheet

export const timesheetAddStart = () => {
    return { type: TIMESHEET_ADD_START };
}

export const timesheetAddSuccess = (result) => {
    return { type: TIMESHEET_ADD_SUCCESS, payload: result };
}

export const updateTimesheets = (data) => {
    return dispatch => {
        dispatch(timesheetAddStart())
        return (
            $.post(url.url + "addTimesheet", data, (result) => {
                dispatch(timesheetAddSuccess(result))
            })
        )
    }
}