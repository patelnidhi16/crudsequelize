import {
    errorResponse,
    successResponse,
    isError,

} from "../../components/helpers/response";
import url from './../../Development.json';
import Http from '../../security/Http'
import * as action from '../../store/actions'
import ToastMe from '../../components/common/ToastMe';


const Product = {

    getProductData: () => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.get_product)
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
    // imageUpload: (formData) => {
    //     return dispatch => (
    //         new Promise((resolve, reject) => {

    //             Http.callApi(url.upload_image, formData)
    //                 .then((response) => {
    //                     return resolve(response.data);

    //                 })
    //                 .catch(err => {
    //                     const statusCode = err.response.status;
    //                     const data = {
    //                         errors: err.response.data.errors,
    //                         statusCode,
    //                         data: err.response.data
    //                     };
    //                     return reject(data);
    //                 });
    //         })
    //     )
    // },

    // addInterest: (data) => {
    //     return dispatch => (
    //         new Promise((resolve, reject) => {
    //             var urlInfo = ""
    //             if (data.interest_id != "") {
    //                 urlInfo = url.update_interest
    //             } else {
    //                 urlInfo = url.add_interest
    //             }
    //             Http.callApi(urlInfo, data)
    //                 .then(res => {
    //                     successResponse(res)
    //                     return resolve(res);
    //                 })
    //                 .catch(err => {
    //                     const statusCode = err.response.status;
    //                     const data = {
    //                         errors: err.response.data.errors,
    //                         statusCode,
    //                         data: err.response.data
    //                     };
    //                     return reject(data);
    //                 })
    //         })
    //     )
    // },
    // interestStatusChange: (data) => {
    //     return dispatch => (
    //         new Promise((resolve, reject) => {
    //             Http.callApi(url.interest_status, data)
    //                 .then(res => {
    //                     successResponse(res)
    //                     return resolve(res);
    //                 })
    //                 .catch(err => {
    //                     const statusCode = err.response.status;
    //                     const data = {
    //                         errors: err.response.data.errors,
    //                         statusCode,
    //                         data: err.response.data
    //                     };
    //                     return reject(data);
    //                 })
    //         })
    //     )
    // },
    // deleteInterest: (data) => {
    //     return dispatch => (
    //         new Promise((resolve, reject) => {
    //             Http.callApi(url.interest_delete, data)
    //                 .then(res => {
    //                     successResponse(res)
    //                     return resolve(res);
    //                 })
    //                 .catch(err => {
    //                     const statusCode = err.response.status;
    //                     const data = {
    //                         errors: err.response.data.errors,
    //                         statusCode,
    //                         data: err.response.data
    //                     };
    //                     return reject(data);
    //                 })
    //         })
    //     )
    // }
}


export default Product;