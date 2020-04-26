import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    authError: null,
    authData: null,
    redirectPath: "/",
}

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                authData: action.payload.authData,
                authError: null,
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                authError: action.payload.error,
            }
        case actionTypes.LOGOUT:
            return {
                ...state,
                authData: null,
                authError: null
            }
        case actionTypes.SET_REDIRECT_PATH:
            return {
                ...state,
                redirectPath: action.path,
                authData: null,
                authError: null,
            }
        default:
            return state
    }
}

export default loginReducer;