import url from './../../Development.json';
import Http from '../../security/Http'
import * as action from '../../store/actions'
import ToastMe from '../../components/common/ToastMe';
import { successResponse } from 'components/helpers/response';
// const BaseUrl = process.env.REACT_APP_API_HOST;

const ExersiseService = {

    getData: (data) => {
        return dispatch => (

            new Promise((resolve, reject) => {
                Http.callApi(url.get_exersise)
                    .then(function (res) {
                        return resolve(res);
                    })
                    .catch(function (err) {
                        // handle error
                        let errorData, statusCode
                        if (err.response != undefined) {
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
    
    //get type
    getType: (data) => {
        return dispatch => (

            new Promise((resolve, reject) => {
                Http.callApi(url.get_ex_type)
                    .then(function (res) {
                        return resolve(res);
                    })
                    .catch(function (err) {
                        // handle error
                        let errorData, statusCode
                        if (err.response != undefined) {
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


    // add exersise
    addexersise: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {

                var dataInfo = {
                    'parent_id': data.parent_id || null,
                    'title': data.title,
                    'description': data.description || null,
                    'demo_video': data.demo_video || null,
                }
                Http.callApi(url.add_exersise, dataInfo)
                    .then(function (res) {
                        successResponse(res)
                        return resolve(res);
                    })
                    .catch(function (err) {
                        ToastMe(err.response.data.message, 'danger');

                        const statusCode = err.response.status;
                        const data = {
                            errors: err.response.data.errors,
                            statusCode,
                            data: err.response.data
                        };
                        return reject({ data });
                    })

            })
        )
    },
    
    // update exersise
    updateexersise: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {

                var dataInfo = {
                    'id': data.id,
                    'parent_id': data.parent_id || null,
                    'title': data.title,
                    'description': data.description || null,
                    'demo_video': data.demo_video || null,
                }
                    Http.callApi(url.update_exersise, dataInfo)
                    .then(function (res) {
                        successResponse(res)
                        return resolve(res);
                    })
                    .catch(function (err) {
                        ToastMe(err.response.data.message, 'danger');

                        const statusCode = err.response.status;
                        const data = {
                            errors: err.response.data.errors,
                            statusCode,
                            data: err.response.data
                        };
                        return reject({ data });
                    })

            })
        )
    },

    // delete exersise
    delete_exersise: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.delete_exersise, data)
                    .then(function (res) {
                        return resolve(res);
                    })
                    .catch(function (err) {
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

    //get exersise by id
    edit_exersise: (data) => {
        return dispatch => (

            new Promise((resolve, reject) => {
                Http.callApi(url.edit_exersise, data)
                    .then(function (res) {
                        return resolve(res);
                    })
                    .catch(function (err) {
                        // handle error
                        let errorData, statusCode
                        if (err.response != undefined) {
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
}


export default ExersiseService;