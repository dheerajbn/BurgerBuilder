import * as actionTypes from './actionTypes';
import axios from '../../axiosInstances';

const fetchOrdersSuccess = (payload) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: { ...payload },
    }
}

const fetchOrdersFail = (payload) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: { ...payload },
    }
}

export const fetchOrders = (auth, userId) => {
    return dispatch => {
        const queryParams = 'auth=' + auth + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json?' + queryParams).then(res => {
            const fetchedOrders = [];

            for (let key in res.data) {
                fetchedOrders.push({ ...res.data[key], id: key });
            }

            dispatch(fetchOrdersSuccess({ orders: fetchedOrders }));
        }).catch(err => {
            dispatch(fetchOrdersFail({ error: err }));
        });
    }
}