import url from './../../Development.json';
import Http from '../../security/Http'
import * as action from '../../store/actions'
import ToastMe from '../../components/common/ToastMe';
import { successResponse } from 'components/helpers/response';
// const BaseUrl = process.env.REACT_APP_API_HOST;

const CmsService = {

    // getData
    getData: (data) => {
        return dispatch => (

            new Promise((resolve, reject) => {
                Http.callApi(url.get_cms)
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
    
    // add cms 
    addcms: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {

                var dataInfo = {
                    'parent_id': data.parent_id || null,
                    'title': data.title,
                    'content': data.content || null,
                }
                Http.callApi(url.add_cms, dataInfo)
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

    //update cms
    updatecms: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {

                var dataInfo = {
                    'id': data.id,
                    'title': data.title,
                    'content': data.content||null,
                    
                }
                Http.callApi(url.add_cms, dataInfo)
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

    // delete cms
    delete_cms: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.delete_cms, data)
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

    // edit cms
    edit_cms: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.get_cms, data)
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


export default CmsService;