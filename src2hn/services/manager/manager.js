import url from "./../../Development.json";
import Http from "../../security/Http";
const ManagerService = {
  // getData
  getManager: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.get_manager)
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

export default ManagerService;
