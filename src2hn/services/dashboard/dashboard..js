import url from "./../../Development.json";
import Http from "../../security/Http";
import * as action from "../../store/actions";
import ToastMe from "../../components/common/ToastMe";
import { successResponse } from "components/helpers/response";

const DashboardService = {
    
  //get data
  getData: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.get_dashboard)
          .then(function (res) {
            return resolve(res);
          })
          .catch(function (err) {
            // handle error
            let errorData, statusCode;
            if (err.response != undefined) {
              errorData = err.response.data.errors;
              statusCode = err.response.status;
            }
            return reject({
              errorData,
              statusCode,
            });
          });
      });
  },

  getLogDetail: (data) => {
    
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.get_log_detail, data)
          .then(function (res) {
            return resolve(res);
          })
          .catch(function (err) {
            // handle error
            let errorData, statusCode;
            if (err.response != undefined) {
              errorData = err.response.data.errors;
              statusCode = err.response.status;
            }
            return reject({
              errorData,
              statusCode,
            });
          });
      });
  },
  
};



export default DashboardService;
