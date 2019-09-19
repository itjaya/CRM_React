import * as url from '../../urlConstants';
import $ from 'jquery';

export const TIMESHEET_ADD_START = 'TIMESHEET_ADD_START';
export const TIMESHEET_ADD_SUCCESS = 'TIMESHEET_ADD_SUCCESS'; 

export const TIMESHEETS_GET_START = 'TIMESHEETS_GET_START';
export const TIMESHEETS_GET_SUCCESS = 'TIMESHEETS_GET_SUCCESS'; 

export const TIMESHEETS_UPLOAD_START = 'TIMESHEETS_UPLOAD_START';
export const TIMESHEETS_UPLOAD_SUCCESS = 'TIMESHEETS_UPLOAD_SUCCESS';

export const TIMESHEETS_DOWNLOAD_START  = 'TIMESHEETS_DOWNLOAD_START';
export const TIMESHEETS_DOWNLOAD_SUCCESS = 'TIMESHEETS_DOWNLOAD_SUCCESS';

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

// Upload Timesheet Files

export const timesheetUploadStart = () => {
    return { type: TIMESHEETS_UPLOAD_START };
}

export const timesheetUploadSuccess = (result) => {
    return { type: TIMESHEETS_UPLOAD_SUCCESS, payload: result };
}

export const uploadTimesheets = (data, type, navigatedDate) => {
    console.log("Data", type)
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    let userId = userData.userData._id;
    return dispatch => {
        dispatch(timesheetUploadStart())
        return (
            $.ajax({
                url: url.url + `upload?id=${userId}&type=${type.value}&navigatedDate=${navigatedDate}`,
                type: "POST",
                data: data,
                processData: false,
                contentType: false,
                success: (result) => {
                    dispatch(timesheetUploadSuccess(result))
                }

            })
            // $.post(url.url + "upload", data, (result) => {
            //     console.log("Result", result)
            //     // dispatch(timesheetUploadSuccess(result))
            // })
        )
    }
}

// Download Timesheet Files

export const timesheetDownloadStart = () => {
    return { type: TIMESHEETS_DOWNLOAD_START };
}

export const timesheetDownloadSuccess = (result) => {
    return { type: TIMESHEETS_DOWNLOAD_SUCCESS, payload: result };
}

export const downloadTimesheets = (data) => {
    return dispatch => {
        dispatch(timesheetDownloadStart())
        return (
            $.post(url.url + "downloadtimesheet", data, (result) => {
                dispatch(timesheetDownloadSuccess(result))
            })
        )
    }
  
}