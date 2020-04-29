import * as actionTypes from './actionTypes';
import Axios from 'axios';

const loginSuccess = (payload) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload: { ...payload }
    }
}

const loginFail = (payload) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        payload: { ...payload }
    }
}

const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    return {
        type: actionTypes.LOGOUT,
    }
}

const checkAuthTimeout = (timeout) => {
    return dispatch => {
        setTimeout(() => { dispatch(logout()) }, timeout * 1000);
    }
}

export const setRedirectPath = (path) => {
    return {
        type: actionTypes.SET_REDIRECT_PATH,
        path: path,
    }
}

export const authenticateUser = (email, password, signUp) => {
    return dispatch => {
        dispatch(loginStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key={YOUR API KEY}";

        if (!signUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={YOUR API KEY}"
        }

        Axios.post(url, authData)
            .then(res => {
                const expirationTime = new Date(new Date().getTime() + (res.data.expiresIn * 1000));
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('expirationTime', expirationTime);
                dispatch(loginSuccess({ authData: res.data }));
                dispatch(checkAuthTimeout(res.data.expiresIn));
            })
            .catch(err => {
                dispatch(loginFail({ error: err.response.data.error }));
            })
    }
}

export const autoSignin = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if (expirationTime > new Date()) {
                const userId = localStorage.getItem('userId');
                const email = localStorage.getItem('email');

                const authData = {
                    idToken : token,
                    localId: userId,
                    email: email,
                    expiresIn: Math.floor((expirationTime.getTime() /1000) - (new Date().getTime() /1000))
                }

                dispatch(loginSuccess({ authData: authData }));
                dispatch(checkAuthTimeout(authData.expiresIn));
            } else {
                dispatch(logout());
            }
        }
    }
}