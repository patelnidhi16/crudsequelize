import {
    errorResponse,
    successResponse,
    isError,

} from "../../../src/components/helpers/response";
import url from './../../Development.json';
import Http from '../../security/Http'
import * as action from '../../store/actions'
import ToastMe from '../../components/common/ToastMe';


const Interest = {

    getInterestData: () => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.get_interest)
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
    },
    imageUpload: (formData) => {
        return dispatch => (
            new Promise((resolve, reject) => {

                Http.callApi(url.upload_image, formData)
                    .then((response) => {
                        return resolve(response.data.image);

                    })
                    .catch(err => {
                        const statusCode = err.response.status;
                        const data = {
                            errors: err.response.data.errors,
                            statusCode,
                            data: err.response.data
                        };
                        return reject(data);
                    });
            })
        )
    },

    addInterest: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                var urlInfo = ""
                if (data.interest_id != "") {
                    urlInfo = url.update_interest
                } else {
                    urlInfo = url.add_interest
                }
                Http.callApi(urlInfo, data)
                    .then(res => {
                        successResponse(res)
                        return resolve(res);
                    })
                    .catch(err => {
                    ToastMe(err.response.data.message,'danger');

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
    interestStatusChange: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.interest_status, data)
                    .then(res => {
                        successResponse(res)
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
    },
    deleteInterest: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.interest_delete, data)
                    .then(res => {
                        successResponse(res)
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


export default Interest;