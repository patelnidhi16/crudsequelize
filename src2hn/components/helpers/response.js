import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
toast.configure({
  // autoClose: 500,
});

function customStylesDataTable() {
  const customStyles = {
    headCells: {
      style: {
        "&:last-child": {
          justifyContent: "center",
        },
      },
    },
    cells: {
      style: {
        "&:first-child": {
          justifyContent: "center",
        },
        "&:last-child": {
          justifyContent: "center",
        },
      },
    },
  };
  return customStyles;
}
function isLoginResponse(navigate) {
  const isLogin = localStorage.getItem("accessToken") || false;
  if (isLogin === null) {
    navigate("/admin/login");
  }
  if (isLogin === false) {
    navigate("/admin/login");
  }
}
function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function isErrorMessage(name, message, empty) {
  var el = document.createElement("span");
  el.classList.add("errorMsg");
  if (empty) {
    el.innerHTML = message;
  } else {
    el.innerHTML = humanize(name) + " " + message;
  }
  var div = document.getElementById(name);
  div.classList.add("is-invalid");
  insertAfter(div, el);
}
function humanize(str) {
  var i,
    frags = str.split("_");
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
}
function isError(error) {
  var errors_entries = Object.entries(error);
  if (errors_entries) {
    var allDivsCollections = document.getElementsByClassName("errorMsg");
    var arr = Array.from(allDivsCollections);
    arr.forEach((singleElement) => {
      singleElement.previousSibling.classList.remove("is-invalid");
      singleElement.remove();
    });

    errors_entries.forEach((errorAll) => {
      if (Array.isArray(errorAll[1])) {
        errorAll[1].forEach((errObj) => {
          if (
            Object.keys(errObj).indexOf("title") > -1 ||
            Object.keys(errObj).indexOf("description") > -1
          ) {
            Object.keys(errObj).forEach((errorObj) => {
              let type = errObj[errorObj].type;
              let name = errObj[errorObj].ref.name;
              let message = "";
              let empty = "";
              if (type === "required") {
                if (errObj[errorObj].message) {
                  message = errObj[errorObj].message;
                  empty = errObj[errorObj].message;
                } else {
                  message = "is required.";
                }
                isErrorMessage(name, message, empty);
              } else if (type === "pattern") {
                message = errObj[errorObj].message;
                empty = errObj[errorObj].message;
                isErrorMessage(name, message, empty);
              } else {
                message = "required.";
                isErrorMessage(name, message);
              }
            });
          }
        });
      } else {
        let type = errorAll[1].type;
        let name = errorAll[1].ref.name;

        let message = "";
        let empty = "";
        if (type === "required") {
          if (errorAll[1].message) {
            message = errorAll[1].message;
            empty = errorAll[1].message;
          } else {
            message = "is required.";
          }
          isErrorMessage(name, message, empty);
        } else if (type === "minLength") {
          message = errorAll[1].message;
          empty = errorAll[1].message;
          isErrorMessage(name, message, empty);
        } else if (type === "maxLength") {
          message = errorAll[1].message;
          isErrorMessage(name, message);
        } else if (type === "validate") {
          if (errorAll[1].message) {
            message = errorAll[1].message;
            empty = errorAll[1].message;
          } else {
            message = "Confirm Password Field is requeid";
          }
          isErrorMessage(name, message, empty);
        } else if (type === "min") {
          message = "min number is 0";
          isErrorMessage(name, message);
        } else if (type === "max") {
          // message = "max number is 100";
          isErrorMessage(name, message);
        } else if (type === "validate") {
          message = errorAll[1].message;
          isErrorMessage(name, message);
        } else if (type === "pattern") {
          message = errorAll[1].message;
          empty = errorAll[1].message;
          isErrorMessage(name, message, empty);
        } else if (type === "acceptedFormats") {
          if (errorAll[1].message) {
            message = errorAll[1].message;
            empty = errorAll[1].message;
          } else {
            message = "is allowed only";
          }
          isErrorMessage(name, message, empty);
        } else {
          message = "required.";
          isErrorMessage(name, message);
        }
      }
    });
  }
}
function configHeaderAxios() {
  const config = {
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ` + localStorage.getItem("accessToken"),
      env: "test",
    },
  };
  return config;
}

function configOptionType(type, callback, errorcallback) {
  let urlcall =
    process.env.REACT_APP_BASE_URL + "option-type" + "?type=" + type;
  const config = configHeaderAxios();
  axios
    .get(urlcall, config)
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {});
}

function errorResponse(error) {
  if (error.response.status === 422) {
    let errorData = error.data.errors;
    if (errorData) {
      var errors = Object.values(errorData);
      if (errors) {
        errors.forEach((err) => {
          toast.error(err.name);
        });
      }
    }
  } else if (error.response.status === 401) {
    let errorData = error.response.data.Unauthorized;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("admin_profile");
    toast.error(errorData);
    window.location.reload();
  } else if (error.response.data.message) {
    toast.error(error.response.data.message);
  }
}

function successResponse(response) {
  if (response.status === 200) {
    toast.success(response.data.message);
  }
}

export {
  errorResponse,
  successResponse,
  isLoginResponse,
  configHeaderAxios,
  isError,
  customStylesDataTable,
  configOptionType,
};
