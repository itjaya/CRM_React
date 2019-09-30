import * as url from '../../urlConstants';
import axios from 'axios';
import Auth from '../../helpers/Auth';

export const ADD_PROJECT_START = "ADD_PROJECT_START";
export const ADD_PROJECT_SUCCESS = "ADD_PROJECT_SUCCESS";
export const ADD_PROJECT_FAIL = "ADD_PROJECT_FAIL";

export const GET_PROJECT_START = "GET_PROJECT_START";
export const GET_PROJECT_SUCCESS = "GET_PROJECT_SUCCESS";
export const GET_PROJECT_FAIL = "GET_PROJECT_FAIL";

export const GET_USER_PROJECT_START = "GET_USER_PROJECT_START";
export const GET_USER_PROJECT_SUCCESS = "GET_USER_PROJECT_SUCCESS";
export const GET_USER_PROJECT_FAIL = "GET_USER_PROJECT_FAIL";

export const DELETE_PROJECT_START = "DELETE_PROJECT_START";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAIL = "DELETE_PROJECT_FAIL";

let handleAuth = new Auth();

// Add and Edit Project

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
        handleAuth.getToken().then(value => {
            axios.post(url.url + "addProject", data, value)
                .then((result) => {
                    dispatch(projectAddSuccess(result.data))
                })
        })

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
        handleAuth.getToken().then(value => {
            axios.get(url.url + `getProjects?id=${id}`, value)
            .then((result) => {
                if(result) {
                    dispatch(getProjectSuccess(result.data));
                }
            })
        })   
    }
}

 // Get User Projects
 export const getUserProjectStart = () => {
    return { type : GET_USER_PROJECT_START }
}

export const getUserProjectSuccess = (result) => {
    return { type: GET_USER_PROJECT_SUCCESS, payload : result }
}

export const getUserProjectFail = () => {
    return { type: GET_USER_PROJECT_FAIL }
}

export const getUserProjects = (id) => {
    return dispatch => {
        dispatch(getUserProjectStart());
        handleAuth.getToken().then(value => {
            axios.get(url.url + `getUserProjects?id=${id}`, value)
            .then((result) => {
                dispatch(getUserProjectSuccess(result.data));
            })
        })
    }
}

// Delete Project
export const deleteProjectStart = () => {
    return { type : DELETE_PROJECT_START }
}

export const deleteProjectSuccess = (result) => {
    return { type: DELETE_PROJECT_SUCCESS, payload : result }
}

export const deleteProjectFail = () => {
    return { type: DELETE_PROJECT_FAIL }
}

export const deleteProject = (id) => {
    return dispatch => {
        dispatch(deleteProjectStart());
        handleAuth.getToken().then(value => {
            axios.post(url.url + `deleteProject?id=${id}`, value)
            .then((result) => {
                if(result) {
                    dispatch(deleteProjectSuccess(result.data));
                }
            })
        })   
    }
}