import Http from '../../security/Http';
import * as action from '../../store/actions'
import ToastMe from './../../components/common/ToastMe';

export function create(data) {
    
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(process.env.API_HOST+'/document', data)
            .then(function (res) {
                return resolve(res);
              })
              .catch(function (err) {
                let errorData, statusCode    
                if(err.response != undefined) {
                    errorData = err.response.data.errors
                    statusCode = err.response.status                
                }
                return reject({errorData,statusCode});
              })
                
        })
    )
}

export function edit(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.put(process.env.API_HOST+'/document', data)
            .then(function (res) {
                // handle success
                return resolve(res);
              })
              .catch(function (err) {
                // handle error
                let errorData, statusCode    
                if(err.response != undefined) {
                    errorData = err.response.data.errors
                    statusCode = err.response.status                
                }
                return reject({errorData,statusCode});
              })
                
        })
    )
}

export function getDocuments(search = '', page = 1, page_limit = 0) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(process.env.API_HOST+'/get-document?search='+search+'&page='+page+'&page_limit='+page_limit)
            .then(function (res) {
                // handle success
                return resolve(res);
              })
              .catch(function (err) {
                // handle error
                let errorData, statusCode    
                if(err.response != undefined) {
                    errorData = err.response.data.errors
                    statusCode = err.response.status                
                }
                return reject({errorData,statusCode});
              })
                
        })
    )
}

export function getFormJsonData(document_id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(process.env.API_HOST+'/get-form-json?document_id='+document_id)
            .then(function (res) {
                // handle success
                return resolve(res.data);
              })
              .catch(function (err) {
                // handle error
                let errorData, statusCode    
                if(err.response != undefined) {
                    errorData = err.response.data.errors
                    statusCode = err.response.status                
                }
                return reject({errorData,statusCode});
              })
                
        })
    )
}

export function saveFormJsonData(data) {
    
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(process.env.API_HOST+'/form-json', data)
            .then(function (res) {
                // handle success
                return resolve(res);
              })
              .catch(function (err) {
                // handle error
                let errorData, statusCode    
                if(err.response != undefined) {
                    errorData = err.response.data.errors
                    statusCode = err.response.status                
                }
                return reject({errorData,statusCode});
              })
                
        })
    )
}

export function getDocument(data) {
    
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post(process.env.API_HOST+'/get-document', data)
            .then(function (res) {
                // handle success
                return resolve(res);
              })
              .catch(function (err) {
                // handle error
                let errorData, statusCode    
                if(err.response != undefined) {
                    errorData = err.response.data.errors
                    statusCode = err.response.status                
                }
                return reject({errorData,statusCode});
              })
                
        })
    )
}

export function changeStatus(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.patch(process.env.API_HOST+'/document', data)
            .then(function (res) {
                return resolve();
            })
            .catch(function (err) {
                // handle error
                // ToastMe(err.response.data.message,'error');
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
}

export function deleteForm(data){
    return dispatch => (
        new Promise((resolve, reject) => {                
            Http.del(process.env.API_HOST+'/form',data)
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


