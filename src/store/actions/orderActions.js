import * as actionTypes from './actionTypes';
import axios from '../../axiosInstances';

export const purchaseBurgerSuccess = (payload) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload: {...payload},
    }
}

export const purchaseBurgerFail = (payload) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        payload: {...payload},
    }
}

export const setLoading = () => {
    return {
        type: actionTypes.SET_LOADING,
    }
}

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE,
    }
}

export const tryPuchaseBurger = (order, auth) => {
    return dispatch => {
        dispatch(setLoading());
        const queryParams = "auth=" + auth;
        axios.post('/orders.json?' + queryParams, order)
            .then(res => {
                dispatch(purchaseBurgerSuccess({id: res.data.name, order: order}));
                // this.setState({ loading: false });
                // this.props.onClearIngredients();
                // this.props.history.replace('/');
            })
            .catch(err => {
                dispatch(purchaseBurgerFail(err));
                // this.setState({ loading: false });
            });
    }

}