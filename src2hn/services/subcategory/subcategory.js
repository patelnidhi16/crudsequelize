import url from './../../Development.json';
import Http from '../../security/Http'
import * as action from '../../store/actions'
import ToastMe from '../../components/common/ToastMe';
import { successResponse } from 'components/helpers/response';
// const BaseUrl = process.env.REACT_APP_API_HOST;

const SubCategoryService = {


    getCategory: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.get_category)
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
    
    getMainCategory: (data) => {
        return dispatch => (

            new Promise((resolve, reject) => {
                Http.callApi(url.get_eat_category)
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


    // add category
    addSubCategory: (data, mainCategory) => {
        return dispatch => (
            new Promise((resolve, reject) => {

                var urlInfo = ""
                if(data.category_id!=""){
                    urlInfo=url.update_category
                }else{
                    urlInfo=url.add_category
                }
                
                var dataInfo = {
                    'parentId': mainCategory,
                    'name': data.name,
                    'type': 1,
                    'category_id': data.category_id,
                }
                Http.callApi(urlInfo, dataInfo)
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


    // delete category
    delete_Category: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.delete_category, data)
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

    }
}

export default SubCategoryService;