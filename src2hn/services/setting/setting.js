import url from "./../../Development.json";
import Http from "../../security/Http";
import ToastMe from "../../components/common/ToastMe";
import { successResponse } from "components/helpers/response";

const SettingService = {
  //get setting
  getData: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.get_setting)
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

  // add Setting
  addSetting: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        var dataInfo = {
          id: data.id || null,
          pdf_url: data.pdf_url,
          audio_url: data.audio_url,
          image_url: data.image_url,
          reminder_time: data.reminder_time,
          android_version: data.android_version,
          ios_version: data.ios_version,
        };

        Http.callApi(url.add_setting, dataInfo)
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
      });
  },
};

export default SettingService;
