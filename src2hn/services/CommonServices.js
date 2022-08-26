import Http from '../Http'
import * as action from '../store/actions'
import ToastMe from '../view/common/ToastMe';
const BaseUrl = process.env.REACT_APP_API_HOST;

const CommonServices = {
    uploadImage : (data) => {
        data.env = 'test';
        return dispatch => (
            new Promise((resolve, reject) => {
                let config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    }
                }
                Http.callApi('post',BaseUrl+'/uploadFile', data,config)
                .then(function (res) {
                    // handle success                
                   // ToastMe("Role & Permission Added Successfully",'success');
                    //dispatch(action.authLogin(res));
                    //window.location.href = '/users';
                    return resolve(res);
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
    
    uploadAdminImage : (data) => {
        data.env = 'test';
        return dispatch => (
            new Promise((resolve, reject) => {
                let config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                    }
                }
                Http.post(process.env.ADMIN_API_HOST+'/uploadFile', data,config)
                .then(function (res) {
                    // handle success                
                    // ToastMe("Role & Permission Added Successfully",'success');
                    //dispatch(action.authLogin(res));
                    //window.location.href = '/users';
                    return resolve(res);
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
}

export default CommonServices;