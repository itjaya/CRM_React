import * as url from '../../urlConstants';
import axios from 'axios';
import $ from 'jquery';
import Auth from '../../helpers/Auth';

export const TIMESHEET_ADD_START = 'TIMESHEET_ADD_START';
export const TIMESHEET_ADD_SUCCESS = 'TIMESHEET_ADD_SUCCESS'; 

export const TIMESHEETS_GET_START = 'TIMESHEETS_GET_START';
export const TIMESHEETS_GET_SUCCESS = 'TIMESHEETS_GET_SUCCESS'; 

export const TIMESHEETS_UPLOAD_START = 'TIMESHEETS_UPLOAD_START';
export const TIMESHEETS_UPLOAD_SUCCESS = 'TIMESHEETS_UPLOAD_SUCCESS';

export const TIMESHEETS_DOWNLOAD_START  = 'TIMESHEETS_DOWNLOAD_START';
export const TIMESHEETS_DOWNLOAD_SUCCESS = 'TIMESHEETS_DOWNLOAD_SUCCESS';

let handleAuth = new Auth();

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
        handleAuth.getToken().then(value => {
            axios.post(url.url + "addTimesheet", data, value)
                .then((result) => {
                    dispatch(timesheetAddSuccess(result.data))
                })
        })

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
        handleAuth.getToken().then(value => {
            axios.get(url.url + "allEvents", data, value)
                .then((result) => {
                    console.log("result", result)
                    dispatch(timesheetGetSuccess(result.data))
                })
        })

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
    let userData = JSON.parse(sessionStorage.getItem("userData"));
    let userId = userData.userData._id;
    return dispatch => {
        dispatch(timesheetUploadStart())
        handleAuth.getToken().then(value => {
            return (
                $.ajax({
                    url: url.url + `upload?id=${userId}&type=${type.value}&navigatedDate=${navigatedDate}`,
                    type: "POST",
                    data: data,
                    processData: false,
                    contentType: false,
                    value,
                    success: (result) => {
                        dispatch(timesheetUploadSuccess(result))
                    }
                })
            )
        })
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
        handleAuth.getToken().then(value => {
            return (
                axios.post(url.url + "downloadtimesheet", data, value)
                    .then((result) => {
                        dispatch(timesheetDownloadSuccess(result))
                    })
            )
        })
    }
}