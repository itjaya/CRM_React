import * as url from '../../urlConstants';
import $ from 'jquery';

export const TIMESHEET_ADD_START = 'TIMESHEET_ADD_START';
export const TIMESHEET_ADD_SUCCESS = 'TIMESHEET_ADD_SUCCESS'; 

export const TIMESHEETS_GET_START = 'TIMESHEETS_GET_START';
export const TIMESHEETS_GET_SUCCESS = 'TIMESHEETS_GET_SUCCESS'; 

// Add Timesheet

export const timesheetAddStart = () => {
    return { type: TIMESHEET_ADD_START };
}

export const timesheetAddSuccess = (result) => {
    return { type: TIMESHEET_ADD_SUCCESS, payload: result };
}

export const updateTimesheets = (data) => {
    console.log("data", data)
    return dispatch => {
        dispatch(timesheetAddStart())
        return (
            $.post(url.url + "addTimesheet", data, (result) => {
                dispatch(timesheetAddSuccess(result))
            })
        )
    }
}

// Get Timesheets

export const timesheetGetStart = () => {
    return { type: TIMESHEETS_GET_START };
}

export const timesheetGetSuccess = (result) => {
    return { type: TIMESHEETS_GET_SUCCESS, payload: result };
}

export const getTimesheets = (data) => {
    return dispatch => {
        dispatch(timesheetGetStart())
        return (
            $.get(url.url + "allEvents", data, (result) => {
                dispatch(timesheetGetSuccess(result))
            })
        )
    }
}