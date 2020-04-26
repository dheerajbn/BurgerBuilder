import * as actionTypes from './actionTypes';
import axios from '../../axiosInstances';

export const addIngredient = (payload) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: {...payload},
    }
}

export const removeIngredient = (payload) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: {...payload},
    }
}

export const setError = () => {
    return {
        type: actionTypes.SET_ERROR,
    }
}

const initIngredients = (payload) => {
    return {
        type: actionTypes.INIT_INGREDIENTS,
        payload: {...payload},
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get("/ingredients.json").then(res => {
            dispatch(initIngredients({ ingredients: res.data }));
        }).catch(err => {
            dispatch(setError());
        });
    }
}