import Http from '../../Http'
import ToastMe from '../../view/common/ToastMe';

const BaseUrl = process.env.REACT_APP_API_HOST;

export function listUpdateDisclosure(search = '', page = 1, page_limit = 0, status = '', form = '') {

   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('get', BaseUrl + '/list-updateDisclosure?search=' + search + '&page=' + page + '&page_limit=' + page_limit + '&status=' + status + '&form=' + form)
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

export function statusUpdateDisclosure(data) {
   data.env = 'test'
   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('post', BaseUrl + '/status-updateDisclosure', data)
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

export function deleteDisclosure(data) {
   data.env = 'test'
   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('delete', BaseUrl + '/delete-disclosure', data)
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