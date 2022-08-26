import url from "./../../Development.json";
import Http from "../../security/Http";
import * as action from "../../store/actions";
import ToastMe from "../../components/common/ToastMe";
import { successResponse } from "components/helpers/response";
// const BaseUrl = process.env.REACT_APP_API_HOST;

//get all eatwell data
const EatwellService = {
  getData: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.get_eatwell)
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

  getMainCategory: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.get_eat_type)
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
  getType: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.get_eat_type)
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

  //add eatwell
  addEatWell: (data, mainCategory, image, pdf) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        var descData = "";
        if (data.description) {
          descData = Object.values(data.description);
        }
        var dataInfo = {
          title: data.title,
          kilojoules: data.kilojoules,
          servings: data.servings,
          ingredients: data.ingredients,
          parent_id: data.parent_id || null,
          description: descData || null,
          pdf: pdf || null,
          receipe_info: data.receipe_info || null,
          image: image || null,
          type: data.type || null,
        };
        Http.callApi(url.create_eatwell, dataInfo)
          .then(function (res) {
            successResponse(res);
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
      });
  },

  //upadte eatwell
update_EatWell: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        var descData = "";
        if (data.description) {
          descData = data.description ;
        }
        var dataInfo = {
          id: data.id,
          title: data.title,
          kilojoules: data.kilojoules,
          servings: data.servings,
          ingredients: data.ingredients,
          parent_id: data.parent_id || null,
          description: descData || null,
          receipe_info: data.receipe_info || null,
          type: data.type || null,
          image: data.image || null,
          pdf: data.pdf || null,
        };
        Http.callApi(url.update_eatwell, dataInfo)
          .then(function (res) {
            successResponse(res);
            return resolve(res);
          })
          .catch(function (err) {
            ToastMe(err.response.data.message, 'danger');

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

  // delete eatwell
  delete_eatwell: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.delete_eatwell, data)
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

  //upload image
  upload_file: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", data);
        Http.callApi(url.upload_file, formData, {
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

  //upload pdf
  upload_pdf: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("pdf", data);
        Http.callApi(url.upload_pdf, formData, {
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

  // edit eatwell
  edit_eatwell: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.edit_eatwell, data)
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

export default EatwellService;
