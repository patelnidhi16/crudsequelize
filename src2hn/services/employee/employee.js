import url from "./../../Development.json";
import Http from "../../security/Http";

const EmployeeService = {
  // getData
  getEmployee: (data) => {
    return (dispatch) =>
      new Promise((resolve, reject) => {
        Http.callApi(url.get_employee)
          .then(function (res) {
            return resolve(res);
          })
          .catch(function (err) {
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

export default EmployeeService;
