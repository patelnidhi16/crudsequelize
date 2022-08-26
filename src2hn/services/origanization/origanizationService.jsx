import Http from "../../Http"
import ToastMe from "../../view/common/ToastMe"

const BaseUrl = process.env.REACT_APP_API_HOST;

export function getOrg() {
   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('get', BaseUrl + '/origanization-data')
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

export function updateOrg(data) {
   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('put', BaseUrl + '/update-org', data)
            .then(function (res) {
               // handle success
               ToastMe("Updated your organization successfully", "success");
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

export function getStates(data) {
   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('post', BaseUrl + '/get-state', data)
            .then(function (res) {
               // handle success
               return resolve(res);
            })
            .catch(function (err) {
               // handle error
               const data = {
                  errorData: err.response.data.errors,
                  statusCode: err.response.status,
               };
               return reject(data);
            })
      })
   )
}

export function getCitys(data) {
   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('post', BaseUrl + '/get-city', data)
            .then(function (res) {
               // handle success
               return resolve(res);
            })
            .catch(function (err) {
               // handle error
               const data = {
                  errorData: err.response.data.errors,
                  statusCode: err.response.status,
               };
               return reject(data);
            })
      })
   )
}

export function getLocation(search = '', page = 1, page_limit = 0, status='') {
   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('get', BaseUrl + '/location?search=' + search + '&page=' + page + '&page_limit=' + page_limit + '&status=' + status)
            .then(function (res) {
               // handle success
               return resolve(res);
            })
            .catch(function (err) {
               // handle error
               const data = {
                  errorData: err.response.data.errors,
                  statusCode: err.response.status,
               };
               return reject(data);
            })
      })
   )
}

export function deleteLocation(data) {
   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('delete', BaseUrl + '/delete-location', data)
            .then(function (res) {
               // handle success
               return resolve(res);
            })
            .catch(function (err) {
               // handle error
               const data = {
                  errorData: err.response.data.errors,
                  statusCode: err.response.status,
               };
               return reject(data);
            })
      })
   )
}

export function addLocation(data) {
   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('post', BaseUrl + '/add-location', data)
            .then(function (res) {
               // handle success
               return resolve(res);
            })
            .catch(function (err) {
               // handle error
               // ToastMe(err.response.data.message);
               const data = {
                  errorData: err.response.data.errors,
                  statusCode: err.response.status,
               };
               return reject(data);
            })
      })
   )
}