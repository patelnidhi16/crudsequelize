import {
    errorResponse,
    successResponse,
    isError,
  
  } from "../../../src/components/helpers/response";
import url from './../../Development.json';
import Http from '../../security/Http'
import * as action from '../../store/actions'
import ToastMe from '../../components/common/ToastMe';
const BaseUrl = process.env.REACT_APP_API_HOST;

  
export function login(credentials) {

    credentials['username']={
        2: credentials.email
    }

    return dispatch => (
        new Promise((resolve, reject) => {
              Http.callApi(url.login, credentials)
                .then(function (res) {
                    localStorage.setItem('token', res.data.accessToken);
                    successResponse(res)
                    dispatch(action.authLogin(res));
                    return resolve(res);
                })
                .catch(function (error) {
                    console.log(error)
                    // ToastMe(error.response.data.message,'danger');
                    const data = {
                        errorData: error.response.data.errors,
                        statusCode: error.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function register(credentials) {

    return dispatch => (
        new Promise((resolve, reject) => {
              Http.callApi('post',BaseUrl + '/registration', credentials)
                .then(res => {
                    ToastMe(res.data.message);
                    dispatch(action.authLogin(res));
                    return resolve(res);
                })
                .catch(err => {
                    ToastMe(err.response.data.message,'danger');                   
                    const data = {
                        errorData: err.response.data.errors,
                        statusCode: err.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function emailExists(credentials) {
    if (credentials) {
        return dispatch => (
            new Promise((resolve, reject) => {
                  Http.callApi('post',BaseUrl + '/email-exists', credentials)
                    .then(res => {
                        return resolve(res.data);
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
    }
}

export function emailUserExists(credentials) {
    if (credentials) {
        return dispatch => (
            new Promise((resolve, reject) => {
                  Http.callApi('post',BaseUrl + '/email-userExists', credentials)
                    .then(res => {
                        return resolve(res.data);
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
    }
}

export function mobileExists(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
              Http.callApi('post',BaseUrl + '/mobile-exists', credentials)
                .then(res => {
                    return resolve(res.data);
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
}

export function domainExists(credentials) {

    return dispatch => (
        new Promise((resolve, reject) => {
              Http.callApi('post',BaseUrl + '/domain-exists', credentials)
                .then(res => {
                    return resolve(res.data);
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
}

export function verifyOtp(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
              Http.callApi('post',BaseUrl + '/verify-otp', data)
                .then(function (res) {
                    dispatch(action.authVerify(res));
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
}

export function otpResend(type) {
    return dispatch => (
        new Promise((resolve, reject) => {
              Http.callApi('post',BaseUrl + '/resend-otp', { 'env': 'test', 'type': type })
                .then(function (res) {
                    // handle success 
                    if (type == 1) {
                        ToastMe('Please check your email, We have sent an email.','success');                        
                    }else{
                        ToastMe('We have sent an otp on your mobile.','success');
                    }  
                    return resolve(res.data);
                })
                .catch(function (err) {
                    // handle error
                    ToastMe(err.response.data.message,'danger');
                    // const statusCode = err.response.status;
                    const data = {
                        errorData: err.response.data.errors,
                        statusCode: err.response.status,
                    };
                    return reject(data);
                })

        })
    )
}

export function forgotPassword(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
              Http.callApi('post',BaseUrl + '/forgot-password', data)
                .then(function (res) {
                    // handle success         
                    // ToastMe('Please check your email, We have sent an email.','success');
                    dispatch(action.authForgot(res));
                    return resolve(res);
                })
                .catch(function (err) {
                    ToastMe(err.response.data.message,'danger');
                    const data = {
                        errorData: err.response.data.errors,
                        statusCode: err.response.status,
                    };
                    return reject(data);
                })

        })
    )
}

export function recoverPassword(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('patch',BaseUrl + '/reset-password', data)
                .then(function (res) {
                    // handle success         
                    ToastMe('Password successfully Recoverd.','success');
                    return resolve(res.data);
                })
                .catch(function (err) {
                    ToastMe(err.response.data.message,'danger');
                    const data = {
                        errorData: err.response.data.errors,
                        statusCode: err.response.status,
                    };
                    return reject(data);
                })

        })
    )
}

export function verifyStatus(subDomain) {
    return dispatch => (
        new Promise((resolve, reject) => {
              Http.callApi('post',BaseUrl + '/check-verification-status', { subDomain })
                .then(result => {
                    dispatch(action.authVerifyStatus(result.data))
                    return resolve(result);
                })
                .catch(err => {
                    let data = {
                        errors: '',
                        statusCode: '',
                        data: ''
                    };
                    if (err.response) {
                        data = {
                            errors: err.response.data.errors,
                            statusCode: err.response.status,
                            data: err.response.data
                        };
                    }
                    return reject(data);
                })
        })
    )
}

