import Http from '../../Http'
import * as action from '../../store/actions'
import ToastMe from '../../view/common/ToastMe';

const BaseUrl = process.env.REACT_APP_API_HOST;


export function create(data) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/form', data)
                .then(function (res) {
                    // handle success
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
                    let errorData, statusCode
                    if (err.response != undefined) {
                        errorData = err.response.data.errors
                        statusCode = err.response.status
                    }
                    return reject({ errorData, statusCode });
                })

        })
    )
}

export function edit(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put', BaseUrl + '/form', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
                    let errorData, statusCode
                    if (err.response != undefined) {
                        errorData = err.response.data.errors
                        statusCode = err.response.status
                    }
                    return reject({ errorData, statusCode });
                })

        })
    )
}

export function getForms(search = '', page = 1, page_limit = 0, form_type = '', status='', statustype='') {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/get-form?search=' + search + '&page=' + page + '&page_limit=' + page_limit + '&form_type=' + form_type + '&status=' + status + '&statustype=' + statustype)
                .then(function (res) {
                    // handle success
                    if (res.status==200) {
                        return resolve(res);                        
                    }
                })
                .catch(function (err) {
                    // handle error
                    let errorData, statusCode
                    if (err.response != undefined) {
                        errorData = err.response.data.errors
                        statusCode = err.response.status
                    }
                    return reject({ errorData, statusCode });
                })

        })
    )
}


export function getFormTemplate() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/get-templates')
                .then(function (res) {
                    // handle success
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
                    let errorData, statusCode
                    if (err.response != undefined) {
                        errorData = err.response.data.errors
                        statusCode = err.response.status
                    }
                    return reject({ errorData, statusCode });
                })

        })
    )
}

export function getFormJsonData(form_id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/get-form-json?form_id=' + form_id)
                .then(function (res) {
                    // handle success
                    return resolve(res.data);
                })
                .catch(function (err) {
                    // handle error
                    let errorData, statusCode
                    if (err.response != undefined) {
                        errorData = err.response.data.errors
                        statusCode = err.response.status
                    }
                    return reject({ errorData, statusCode });
                })

        })
    )
}

export function saveFormJsonData(data) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/form-json', data)
                .then(function (res) {
                    // handle success
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
                    let errorData, statusCode
                    if (err.response != undefined) {
                        errorData = err.response.data.errors
                        statusCode = err.response.status
                    }
                    return reject({ errorData, statusCode });
                })

        })
    )
}

export function getForm(data) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/get-form', data)
                .then(function (res) {
                    // handle success
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
                    let errorData, statusCode
                    if (err.response != undefined) {
                        errorData = err.response.data.errors
                        statusCode = err.response.status
                    }
                    return reject({ errorData, statusCode });
                })

        })
    )
}

export function changeStatus(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('patch', BaseUrl + '/form', data)
                .then(function (res) {
                    return resolve();
                })
                .catch(function (err) {
                    // handle error
                    // ToastMe(err.response.data.message,'error');
                    dispatch(action.setAlert({ type: "danger", message: err.response.data.message }));

                    setTimeout(() => {
                        dispatch(action.setAlert({}));
                    }, 3000);

                    const statusCode = err.response.status;
                    const data = {
                        errorData: null,
                        statusCode,
                        message: null,
                    };
                    if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
                        // status 401 means unauthorized
                        // status 422 means unprocessable entity
                        data.errorData = err.response.data.errors;
                        data.message = err.response.data.message;
                    }

                    return reject(data);
                })

        })
    )
}

export function deleteForm(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.del(BaseUrl + '/form', data)
                .then(function (res) {
                    // handle success          
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
                    ToastMe(err.response.data.message);
                    const data = {
                        errorData: err.response.data.errors,
                        statusCode: err.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function getNotes(application_id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/application-notes?application_id=' + application_id)
                .then(function (res) {
                    // handle success               
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
                    ToastMe(err.response.data.message, 'error');
                    const statusCode = err.response.status;
                    const data = {
                        errorData: null,
                        statusCode,
                        message: null,
                    };
                    if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
                        // status 401 means unauthorized
                        // status 422 means unprocessable entity
                        data.errorData = err.response.data.errors;
                        data.message = err.response.data.message;
                    }

                    return reject(data);
                })
        })
    )
}

export function geStatusHistory(form_id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/status-history?form_id=' + form_id)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (err) {
                    const statusCode = err.response.status;
                    const data = {
                        errorData: null,
                        statusCode,
                        message: null,
                    };
                    if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
                        // status 401 means unauthorized
                        // status 422 means unprocessable entity
                        data.errorData = err.response.data.errors;
                        data.message = err.response.data.message;
                    }

                    return reject(data);
                })
        })
    )
}

export function storeNoteReply(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/store-note-reply', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (err) {
                    const statusCode = err.response.status;
                    const data = {
                        errorData: null,
                        statusCode,
                        message: null,
                    };
                    if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
                        data.errorData = err.response.data.errors;
                        data.message = err.response.data.message;
                    }
                    return reject(data);
                })

        })
    )
}


