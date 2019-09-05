import * as url from '../../urlConstants';
import $ from 'jquery';

export const ADD_PROJECT_START = "ADD_PROJECT_START";
export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
export const ADD_PROJECT_FAIL = "ADD_PROJECT_FAIL";

export const GET_PROJECT_START = "GET_PROJECT_START";
export const GET_PROJECT_SUCCESS = "GET_PROJECT_SUCCESS";
export const GET_PROJECT_FAIL = "GET_PROJECT_FAIL";

// Add Project

export const projectAddStart = () => {
    return { type: ADD_PROJECT_START };
}

export const projectAddSuccess = (projectData) => {
    return { type: ADD_PROJECT_SUCCESS, payload: projectData };
}

export const projectAddFail = () => {
    return { type: ADD_PROJECT_FAIL };
}

export const addProject = (data) => {
    return dispatch => {
        dispatch(projectAddStart())
        return (
            $.post(url.url + "addProject", data, (result) => {
                if(result._id) {
                    dispatch(projectAddStart(result))
                }
                else {
                    dispatch(projectAddFail())
                }
            })
        )
    }
 }

 // Get Projects
export const getProjectStart = () => {
    return { type : GET_PROJECT_START }
}

export const getProjectSuccess = (result) => {
    return { type: GET_PROJECT_SUCCESS, payload : result }
}

export const getProjectFail = () => {
    return { type: GET_PROJECT_FAIL }
}

export const getProjects = (id) => {
    return dispatch => {
        dispatch(getProjectStart());
        $.get(url.url + `getProjects?id=${id}`, (result) => {
            if(result) {
                dispatch(getProjectSuccess(result));
            }
        })
    }
}
