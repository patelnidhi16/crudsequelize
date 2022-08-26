import Http from '../../Http'
import * as action from '../../store/actions'
import ToastMe from '../../common/ToastMe';

export function getProfile() {
  return dispatch => (
   new Promise((resolve, reject) => {
     Http.get(process.env.API_HOST+'/get-profile')
      .then(function (res) {
        // handle success
        Object.keys(res.data).forEach(function(key) {
          if(res.data[key] === null) {
            res.data[key] = '';
          }
        })
        localStorage.setItem('userdata',res.data);
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

export function editProfile(data) {
  
  return dispatch => (
   new Promise((resolve, reject) => {
     Http.post(process.env.API_HOST+'/update-profile', data)
      .then(function (res) {
        // handle success
        
        dispatch(action.setUserData(res));
        ToastMe("Profile Updated successfully",'success');
        return resolve(res.data);
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

export function getUsers(search = '', page = 1, page_limit = 0) {
  return dispatch => (
   new Promise((resolve, reject) => {
    //  Http.get(process.env.API_HOST+'/users?limit='+data['limit']+'&offset='+data['offset'])
     Http.get(process.env.API_HOST+'/users?search='+search+'&page='+page+'&page_limit='+page_limit)
      .then(function (res) {
        // handle success
        
        //ToastMe("Organisation Users Fetch successfully",'success');
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

export function addOrganisationUser(data){
  
  return dispatch => (
   new Promise((resolve, reject) => {
     Http.post(process.env.API_HOST+'/user', data)
      .then(function (res) {
        ToastMe("Organisation User added successfully",'success');
        window.location.href = '/users';
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

