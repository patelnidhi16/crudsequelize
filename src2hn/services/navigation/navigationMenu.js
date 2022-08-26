import Http from '../../Http'
import * as action from '../../store/actions'
import ToastMe from '../../view/common/ToastMe'

const BaseUrl = process.env.REACT_APP_API_HOST;

export function getNavigationMenu() {

   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('get', BaseUrl + '/navigation-menu')
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

export function addNavigationMenu(data) {

   return dispatch => (
      new Promise((resolve, reject) => {
         Http.callApi('post', BaseUrl + '/add-navigationMenu', data)
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