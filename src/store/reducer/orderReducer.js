import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.INIT_PURCHASE):
            return {
                ...state,
                purchased: false,
            }
        case (actionTypes.PURCHASE_BURGER_SUCCESS):
            const newOrder = {
                ...action.payload.order,
                id: action.payload.id,
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder),
            }
        case (actionTypes.PURCHASE_BURGER_FAIL):
            return {
                ...state,
                loading: false,
            }
        case (actionTypes.SET_LOADING):
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}

export default reducer;