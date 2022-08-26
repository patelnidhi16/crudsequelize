import url from "./../../Development.json";
import Http from "../../security/Http";
import * as action from "../../store/actions";
import ToastMe from "../../components/common/ToastMe";
import { successResponse } from "components/helpers/response";

const EapService = {
    
  //get data
  getData: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.get_eap)
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
  
  // add/update EAP
  addEap: (data) => {
    console.log(data);
   
    return (dispatch) =>
      new Promise((resolve, reject) => {
        console.log(123);
        const descData = Object.values(data.options);
        console.log(descData);
        //update eap
        console.log(data);
        if (data.id) {
          var dataInfo = {
            id: data.id,
            image: data.image,
            mobile: data.mobile,
            options: descData ?? null,
          };
          Http.callApi(url.update_eap, dataInfo)
            .then(function (res) {
              successResponse(res);
              return resolve(res);
            })
            .catch(function (err) {
              ToastMe(err.response.data.message, "danger");

              const statusCode = err.response.status;
              const data = {
                errors: err.response.data.errors,
                statusCode,
                data: err.response.data,
              };
              return reject({ data });
            });
        } else {
          console.log("add");
          //add eap
          var dataInfo = {
            image: data.image,
            mobile: data.mobile,
            options: descData ?? null,
          };
          Http.callApi(url.add_eap, dataInfo)
            .then(function (res) {
              successResponse(res);
              return resolve(res);
            })
            .catch(function (err) {
              ToastMe(err.response.data.message, "danger");

              const statusCode = err.response.status;
              const data = {
                errors: err.response.data.errors,
                statusCode,
                data: err.response.data,
              };
              return reject({ data });
            });
        }
      });
  },
};

export default EapService;
