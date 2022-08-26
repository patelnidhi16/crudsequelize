import url from './../../Development.json';
import Http from '../../security/Http'
import * as action from '../../store/actions'
import ToastMe from '../../components/common/ToastMe';
import { successResponse } from 'components/helpers/response';
// const BaseUrl = process.env.REACT_APP_API_HOST;

const ExchangeService = {

    getExchange: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.get_exchange)
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
    addExchange: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                var urlInfo=""
                if(data.exchange_id!=""){
                    urlInfo=url.update_exchange
                }else{
                    urlInfo=url.add_exchange
                }
                Http.callApi(urlInfo, data)
                    .then(function (res) {
                        successResponse(res)
                        return resolve(res);
                    })
                    .catch(function (err) {
                    ToastMe(err.response.data.message,'danger');

                        const statusCode = err.response.status;
                        const data = {
                            errors: err.response.data.errors,
                            statusCode,
                            data: err.response.data 
                        };
                        return reject({data});
                    })

            })
        )
    },


    // delete category
    delete_exchange: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.delete_exchange,data)
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

export default ExchangeService;