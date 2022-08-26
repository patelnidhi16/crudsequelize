import Http from '../../Http'
import * as action from '../../store/actions'
import ToastMe from '../../common/elements/ToastMe';

export function uploadAvatar(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('/api/timeline/avatar/update', data)
            .then(function (res) {
                // handle success
                ToastMe(res.data.message);
                return resolve(res.data);
              })
              .catch(function (err) {
                // handle error
                ToastMe(err.response.data.message);
                const statusCode = err.response.status;
                const data = {
                    error: null,
                    statusCode,
                };
                if (statusCode === 401 || statusCode === 422) {
                    // status 401 means unauthorized
                    // status 422 means unprocessable entity
                    data.error = err.response.data.message;
                }
                return reject(data);
              })
                
        })
    )
}

export function uploadCover(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('/api/timeline/cover/update', data)
            .then(function (res) {
                // handle success
                ToastMe(res.data.message);
                return resolve(res.data);
              })
              .catch(function (err) {
                // handle error
                ToastMe(err.response.data.message);
                const statusCode = err.response.status;
                const data = {
                    error: null,
                    statusCode,
                };
                if (statusCode === 401 || statusCode === 422) {
                    // status 401 means unauthorized
                    // status 422 means unprocessable entity
                    data.error = err.response.data.message;
                }
                return reject(data);
              })
                
        })
    )
}

export function uploadPostMedia(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('/api/post/media', data)
            .then(function (res) {
                // ToastMe(res.data.message);
                // handle success
                return resolve(res.data);
              })
              .catch(function (err) {
                ToastMe(err.response.data.message);
                // handle error
                const statusCode = err.response.status;
                const data = {
                    error: null,
                    statusCode,
                };
                if (statusCode === 401 || statusCode === 422) {
                    // status 401 means unauthorized
                    // status 422 means unprocessable entity
                    data.error = err.response.data.message;
                }
                return reject(data);
              })
                
        })
    )
}