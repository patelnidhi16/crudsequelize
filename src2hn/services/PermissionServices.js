import Http from '../Http'
import * as action from '../store/actions'
import ToastMe from '../view/common/ToastMe';

const BaseUrl = process.env.REACT_APP_API_HOST;

const PermissionService = {
    get : () => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi('get', BaseUrl+'/permissionPage')
                .then(function (res) {
                    // handle success
                    Object.keys(res.data).forEach(function(key) {
                        if(res.data[key] === null) {
                            res.data[key] = '';
                        }
                    })
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
                    dispatch(action.setAlert({ type : "danger", message: err.response.data.message }));
    
                    setTimeout(()=>{
                        dispatch(action.setAlert({}));
                    },3000);
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
    },

    add : (data) => {
        data.env = 'test';
        return dispatch => (
            new Promise((resolve, reject) => {
                let config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    }
                }
                Http.callApi('post', BaseUrl+'/role', data,config)
                .then(function (res) {
                    // handle success      
                    ToastMe("Role & Permission Added Successfully",'success');
                    return resolve();
                })
                .catch(function (err) {
                    // handle error
                    ToastMe(err.response.data.message,'error');
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
    },

    update : (data) => {
        data.env = 'test';
        return dispatch => (
            new Promise((resolve, reject) => {
                let config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    }
                }
                Http.callApi('post', BaseUrl+'/role-update', data,config)
                .then(function (res) {
                    // handle success  
                    
                    ToastMe("Role & Permission Updated Successfully",'success');
                    // window.location.href = '/users';
                    return resolve();
                })
                .catch(function (err) {

                    // handle error
                    ToastMe(err.response.data.message,'error');
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
    },

    getRoles : () => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi('get', BaseUrl+'/roles')
                .then(function (res) {
                    // handle success
                    Object.keys(res.data).forEach(function(key) {
                        if(res.data[key] === null) {
                            res.data[key] = '';
                        }
                    })
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
                    const statusCode = err.response.status;
                    const data = {
                        errors: err.response.data.errors,
                        statusCode,
                        data: err.response.data
                    };
                    return reject(data);
                })
                    
            })
        )
    },
    
    getRoleByID : (id) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi('get', BaseUrl+'/role/'+id)
                .then(function (res) {
                    // handle success
                    Object.keys(res.data).forEach(function(key) {
                        if(res.data[key] === null) {
                            res.data[key] = '';
                        }
                    })
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
                    dispatch(action.setAlert({ type : "danger", message: err.response.data.message }));
    
                    setTimeout(()=>{
                        dispatch(action.setAlert({}));
                    },3000);
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
    },
    getRoleUsers : (id) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.get(process.env.API_HOST+'/role-users/'+id)
                .then(function (res) {                    
                    return resolve(res);
                })
                .catch(function (err) {
                    dispatch(action.setAlert({ type : "danger", message: err.response.data.message }));
    
                    setTimeout(()=>{
                        dispatch(action.setAlert({}));
                    },3000);
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
    },

    changeStatus : (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.patch(process.env.API_HOST+'/role', data)
                .then(function (res) {
                    return resolve();
                  })
                  .catch(function (err) {
                    // handle error
                    ToastMe(err.response.data.message,'error');
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
}

export default PermissionService;