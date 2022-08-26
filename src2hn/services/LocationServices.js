import Http from '../Http'
import * as action from '../store/actions'
import ToastMe from '../common/ToastMe';

const LocationServices = {
    locationGetUserId : (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.post(process.env.API_HOST+'/location',data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(err => {
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

    add : (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.post(process.env.API_HOST+'/user-assign-location', data)
                .then(function (res) {                  
                    ToastMe("User Assign Location Successfully",'success');
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
    },
    getAssignUsersLocation(search = '', page = 1, page_limit = 0 , user_id = '') {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.get(process.env.API_HOST+'/user-asssing-location?search='+search+'&page='+page+'&page_limit='+page_limit+'&user_id='+user_id)
                .then(function (res) {
                    // handle success
                    return resolve(res);
                  })
                  .catch(function (err) {
                    // handle error
                    let errorData, statusCode;  
                    if(err.response != undefined) {
                        errorData = err.response.data.errors
                        statusCode = err.response.status                
                    }
                    return reject({errorData,statusCode});
                  })
                    
            })
        )
    },

    deleteAssignLocation(data){
        return dispatch => (
            new Promise((resolve, reject) => {                
                Http.del(process.env.API_HOST+'/user-assign-location',data)
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
    },
    changeAssignLocation(data){
        return dispatch => (
            new Promise((resolve, reject) => {                
                Http.patch(process.env.API_HOST+'/user-assign-location',data)
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
    

}

export default LocationServices;