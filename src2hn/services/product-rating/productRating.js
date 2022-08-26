import {
    errorResponse,
    successResponse,
    isError,

} from "../../components/helpers/response";
import url from './../../Development.json';
import Http from '../../security/Http'
import * as action from '../../store/actions'
import ToastMe from '../../components/common/ToastMe';


const ProductRating = {
    getProductRatingData: () => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi(url.get_product_rating)
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
}


export default ProductRating;