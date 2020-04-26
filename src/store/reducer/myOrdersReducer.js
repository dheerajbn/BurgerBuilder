import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: true,
    error: false,
}

const myOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders,
                error: false,
            }

        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            }
        default:
            return state
    }
}

export default myOrdersReducer;