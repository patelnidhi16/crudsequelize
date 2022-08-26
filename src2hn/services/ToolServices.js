import Http from './../Http'
import * as action from './../store/actions'
import ToastMe from '../view/common/ToastMe';
const BaseUrl = process.env.REACT_APP_API_HOST;

const ToolService = {
    getTools: (search, standard_field_id = '', page = 1, page_limit = 0) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                let url = BaseUrl+'/get-tools?search='+search+'&page='+page+'&page_limit='+page_limit+( standard_field_id != '' ? ('&standard_field_id='+standard_field_id) : '');
                let data = [];
                let options = {};
                Http.callApi('get',url,data,options)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (err) {
                    let errorData, statusCode
                    if(err.response != undefined) {
                        errorData = err.response.data.errors
                        statusCode = err.response.status
                    }
                    return reject({errorData,statusCode});
                })

            })
        )
    },
}

export default ToolService;
