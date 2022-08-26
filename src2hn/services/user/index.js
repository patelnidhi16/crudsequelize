import url from './../../Development.json';
import Http from '../../security/Http'

// const BaseUrl = process.env.REACT_APP_API_HOST;

const UserService = {


    getUsers: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.get_user)
                    .then(function (res) {
                        return resolve(res);
                    })
                    .catch(function (err) {
                        // handle error
                        let errorData, statusCode
                        if (err.response !== undefined) {
                            errorData = err.response.data.errors
                            statusCode = err.response.status
                        }
                        return reject({
                            errorData,
                            statusCode
                        });
                    })

            })
        )
    },

    verify:(data) =>{
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.verify_user, data)
                    .then(res => {
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
}

export default UserService;