import Http from '../../Http'
import ToastMe from '../../view/common/ToastMe';
const BaseUrl = process.env.REACT_APP_API_HOST;

const SubmissionService = {
    getForms: (search = '', page = 1, page_limit = 0, slug, form_id='') => {
        return dispatch => (
            new Promise((resolve, reject) => {
                const url = BaseUrl + '/submission-froms?search=' + search + '&page=' + page + '&page_limit=' + page_limit + '&slug=' + slug+ '&form_id=' + form_id;
                Http.callApi('get', url)
                    .then(function (res) {
                        return resolve(res);
                    })
                    .catch(function (err) {
                        // handle error
                        let errorData, statusCode
                        if (err.response != undefined) {
                            errorData = err.response.data.errors
                            statusCode = err.response.status
                        }
                        return reject({
                            errorData,
                            statusCode
                        });
                    })

            })
        )
    },

    getByID: (id) => {
        return dispatch => (
            new Promise((resolve, reject) => {

                Http.get(process.env.API_HOST + '/user/' + id)
                    .then(function (res) {
                        // handle success          
                        return resolve(res);
                    })
                    .catch(function (err) {
                        // handle error
                        ToastMe(err.response.data.message, 'error');
                        const statusCode = err.response.status;
                        const data = {
                            errorData: null,
                            statusCode,
                            message: null,
                        };
                        if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
                            // status 401 means unauthorized
                            // status 422 means unprocessable entity
                            data.errorData = err.response.data.errors;
                            data.message = err.response.data.message;
                        }

                        return reject(data);
                    })
            })
        )
    },

    deleteSubmitedForm: (form_id) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi('delete', BaseUrl + '/delete-submited-form',form_id)
                    .then(function (res) {
                        return resolve(res);
                    })
                    .catch(function (err) {
                        ToastMe(err.response.data.message);
                        const data = {
                            errorData: err.response.data.errors,
                            statusCode: err.response.status,
                        };
                        return reject(data);
                    })
            })
        )
    },

    deleteSubmission: (id) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.del(process.env.API_HOST + '/submission/' + id)
                    .then(function (res) {
                        return resolve(res);
                    })
                    .catch(function (err) {
                        ToastMe(err.response.data.message);
                        const data = {
                            errorData: err.response.data.errors,
                            statusCode: err.response.status,
                        };
                        return reject(data);
                    })
            })
        )
    },

    changeStatus: (data) => {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.patch(process.env.API_HOST + '/submission-status', data)
                    .then(function (res) {
                        return resolve();
                    })
                    .catch(function (err) {
                        // handle error
                        ToastMe(err.response.data.message, 'error');
                        const statusCode = err.response.status;
                        const data = {
                            errorData: null,
                            statusCode,
                            message: null,
                        };
                        if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
                            // status 401 means unauthorized
                            // status 422 means unprocessable entity
                            data.errorData = err.response.data.errors;
                            data.message = err.response.data.message;
                        }

                        return reject(data);
                    })

            })
        )
    },
    getCategoryWiseForm(id) {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi('get', BaseUrl + '/category-froms?id=' + id)
                    .then(function (res) {
                        // handle success
                        if (res.status == 200) {
                            return resolve(res);
                        }
                    })
                    .catch(function (err) {
                        // handle error
                        let errorData, statusCode
                        if (err.response != undefined) {
                            errorData = err.response.data.errors
                            statusCode = err.response.status
                        }
                        return reject({ errorData, statusCode });
                    })

            })
        )
    },
    getAllSubCategory() {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi('get', BaseUrl + '/get-sub-category')
                    .then(function (res) {
                        // handle success
                        if (res.status == 200) {
                            return resolve(res);
                        }
                    })
                    .catch(function (err) {
                        // handle error
                        let errorData, statusCode
                        if (err.response != undefined) {
                            errorData = err.response.data.errors
                            statusCode = err.response.status
                        }
                        return reject({ errorData, statusCode });
                    })

            })
        )
    },
    submissionCategories() {
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi('get', BaseUrl + '/submission-categories')
                    .then(function (res) {
                        // handle success
                        if (res.status == 200) {
                            return resolve(res);
                        }
                    })
                    .catch(function (err) {
                        // handle error
                        let errorData, statusCode
                        if (err.response != undefined) {
                            errorData = err.response.data.errors
                            statusCode = err.response.status
                        }
                        return reject({ errorData, statusCode });
                    })

            })
        )
    },
    addForm(data) {
        data.env = 'test';
        return dispatch => (
            new Promise((resolve, reject) => {
                Http.callApi('post', BaseUrl + '/add-category-wise-form', data)
                    .then(function (res) {
                        // handle success
                        return resolve(res);
                    })
                    .catch(function (err) {

                        // handle error
                        let errorData, statusCode
                        if (err.response != undefined) {
                            errorData = err.response.data.errors
                            statusCode = err.response.status
                        }
                        return reject({ errorData, statusCode });
                    })

            })
        )
    }
}

export default SubmissionService;