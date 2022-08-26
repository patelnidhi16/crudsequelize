import url from "./../../Development.json";
import Http from "../../security/Http";
import * as action from "../../store/actions";
import ToastMe from "../../components/common/ToastMe";
import { successResponse } from "components/helpers/response";
// const BaseUrl = process.env.REACT_APP_API_HOST;

const MindfulnessService = {
    
  // get data
  getData: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.get_mindfulness)
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

  // upload audio
  upload_audio: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("audio", data);
        Http.callApi(url.upload_audio, formData, {
          Accept: "multipart/form-data",
        })
          .then(function (res) {
            return resolve(res);
          })
          .catch(function (err) {
            const statusCode = err.response.status;
            const data = {
              errors: err.response.data.errors,
              statusCode,
              data: err.response.data,
            };
            return reject(data);
          });
      });
  },

  // add mindfulness
  addMindfulness: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        var dataInfo = {
          title: data.title,
          image: data.image || null,
          audio: data.audio || null,
          play_duration: data.play_duration || null,
        };
        Http.callApi(url.add_mindfulness, dataInfo)
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

  //delete mindfulness
  delete_mindfulness: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.delete_mindfulness, data)
          .then(function (res) {
            return resolve(res);
          })
          .catch(function (err) {
            const statusCode = err.response.status;
            const data = {
              errors: err.response.data.errors,
              statusCode,
              data: err.response.data,
            };
            return reject(data);
          });
      });
  },
  // edit mindfulness
  edit_mindfulness: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.edit_mindfulness, data)
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

  // update mindfulness

  update_Mindfulness: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        var dataInfo = {
          id: data.id,
          title: data.title,
          image: data.image,
          play_duration: data.play_duration,
          audio: data.audio,
        };
        Http.callApi(url.update_mindfulness, dataInfo)
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

export default MindfulnessService;
