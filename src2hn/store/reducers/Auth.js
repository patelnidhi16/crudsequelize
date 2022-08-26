import * as ActionTypes from '../action-types'
import Http from '../../security/Http'

const initialState = {
    isAuthenticated : false,
    adminData:{}
};

const Auth = (state= initialState,{type,payload = null}) => {
    switch(type){
        case ActionTypes.AUTH_LOGIN:
            return authLogin(state,payload);
        case ActionTypes.AUTH_CHECK:
            return checkAuth(state);
        case ActionTypes.AUTH_LOGOUT:
            return logout(state);
        case ActionTypes.AUTH_VERIFY:
            return authVerify(state, payload);
        case ActionTypes.AUTH_VERIFY_STATUS:
            return checkVerificationStatus(state, payload);
        case ActionTypes.AUTH_FORGOT:
            return authForgot(state, payload);
        case ActionTypes.SET_ALERT:
            return setAlert(state, payload);
        case ActionTypes.SET_USERDATA:
            return setUserData(state, payload);
        default:
            return state;
    }
};

const authLogin = (state,payload) => {    
    const jwtToken = payload.data.accessToken;

    localStorage.setItem('accessToken',jwtToken);
    // localStorage.setItem('jwt_type',jwtType);
    
    Http.setBearerToken(jwtToken);
    // if(jwtType == 'auth') {
    // } else {
    //     Http.setVerifyToken(jwtToken);
    // }
    state = Object.assign({}, state, {
        isAuthenticated : true,
        accessToken:jwtToken,
        adminData: payload.data.data,
    });
    return state;

};

const authForgot = (state, payload) => {
    const jwtToken = payload.data.token;
    const jwtType = payload.data.token_type;
    
    localStorage.setItem('accessToken',jwtToken);
    localStorage.setItem('jwt_type',jwtType);

    if(jwtType === 'auth') {
        Http.setBearerToken(jwtToken);
    } else {
        Http.setVerifyToken(jwtToken);
    }

    state = Object.assign({}, state, {
        isAuthenticated: true,
        isVerify: false,
        token: payload.data.token,
    });
    return state;

};



const checkAuth = (state) =>{
    if(state.isAuthenticated){
        Http.setBearerToken(`${localStorage.getItem('accessToken')}`);
    }
    state =Object.assign({},state,{
        isAuthenticated : !!localStorage.getItem('accessToken'),
        accessToken : localStorage.getItem('accessToken'),
    });
    return state;
};

const logout = (state) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('persist:root')
    localStorage.clear();
    state = Object.assign({},state,initialState);
    return state;
};

const authVerify = (state, payload) => {
    if(localStorage.getItem('jwt_type') === 'verify') {
        const jwtToken = payload.data.token;
        const jwtType = payload.data.token_type;
        
        localStorage.setItem('accessToken',jwtToken);
        localStorage.setItem('jwt_type',jwtType);
    
        if(jwtType === 'auth') {
            Http.setBearerToken(jwtToken);
        } else {
            Http.setVerifyToken(jwtToken);
        }
    
        state = Object.assign({}, state, {
            isVerify: true,
            needToVerify: payload.data.is_verify ? false : true,
            userData: payload.data,
        });
    
    } else if (localStorage.getItem('jwt_type') === 'change_mobile') {
    
        const jwtToken = payload.data.token;
        const jwtType = payload.data.token_type;

        localStorage.setItem('accessToken', jwtToken);
        localStorage.setItem('jwt_type', jwtType);

        if (jwtType === 'auth') {
            Http.setBearerToken(jwtToken);
        } else {
            Http.setVerifyToken(jwtToken);
        }

        state = Object.assign({}, state, {
            isVerify: true,
            needToVerify: payload.data.is_verify ? false : true,
            userData: payload.data,
        });

    } else {
        state = Object.assign({}, state, {
            isVerify: false,
        });
    }
    return state;
};

const checkVerificationStatus = (state, payload) => {
    let updatedValue = {};
    if(payload){
        updatedValue = {
            isVerify: true
        }
    }else{
        updatedValue = {
            isVerify: false,
            isAuthenticated: true
        }
    }
    state = {...state,...updatedValue};
    return state;
};

const setAlert = (state, payload) =>{

    state =Object.assign({},state,{
        hasAlert : !!payload.message,
        alertMessage : payload.message,
        alertType : payload.type,
    });

    return state;
};

const setUserData = (state,payload) => {
    state = Object.assign({}, state, {
        userData: payload.data,
    });
    return state;
}

export default Auth;
