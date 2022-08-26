import url from './../../Development.json';
import Http from '../../security/Http'
import * as action from '../../store/actions'
import ToastMe from '../../components/common/ToastMe';
const BaseUrl = process.env.REACT_APP_API_HOST;



export function getFormCategories() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/form-categories')
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
}

export function getCountries() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/get-countries')
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
}

export function getRoles() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/roles')
                .then(function (res) {
                    // handle success
                    Object.keys(res.data).forEach(function (key) {
                        if (res.data[key] === null) {
                            res.data[key] = '';
                        }
                    })
                    return resolve(res);
                })
                .catch(function (err) {
                    // handle error
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
}

export function getCategories() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/categories')
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
}

export function getStates(country_ids) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/get-states', country_ids)
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
}
export function getCity(state_id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/get-citys', state_id)
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
}

export function getTimezone(country_id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/get-timezone', country_id)
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
}

export function getDashboardData() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/dashboard')
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
}

export function getOrganizationNotification() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/organization-notification')
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
}

export function getColumnSequence(data) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(BaseUrl + '/get-column-sequence?module=' + data)
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
}

export function getDatabaseColumn(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/get-database-column', data)
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
}

export function addColumnSequence(param) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post',BaseUrl + '/add-column', param)
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

export function editColumnSequence(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('put',BaseUrl + '/edit-column', data)
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

export function getNavigationMenu() {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/navigation-menu')
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

export function addNavigationMenu(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/add-navigation-menu', data)
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
                    return reject({ errorData, statusCode });
                })

        })
    )
}

export function updateNavigationMenu(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/update-navigation-menu', { 'menus': data })
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
                    return reject({ errorData, statusCode });
                })

        })
    )
}

export function getSubscriptionPlans() {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/subscription-plans')
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (err) {
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

export function addOrganizationPlan(data) {

    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('post', BaseUrl + '/add-organization-plan', data)
                .then(function (res) {
                    return resolve(res);
                })
                .catch(function (err) {
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

export function getSize() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.callApi('get', BaseUrl + '/get-sizes')
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
}

