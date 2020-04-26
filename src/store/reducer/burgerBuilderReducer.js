import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    price: 14,
    error: false,
    building: false,
}

const INGREDIENT_PRICE = {
    salad: 2,
    cheese: 1,
    bacon: 1.5,
    meat: 3.4,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                price: state.price + INGREDIENT_PRICE[action.payload.ingredientName],
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1,
                },
                building: true,
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                price: state.price - INGREDIENT_PRICE[action.payload.ingredientName],
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1,
                },
                building: true,
            };
        case actionTypes.INIT_INGREDIENTS:
            return {
                ...initialState,
                ingredients: action.payload.ingredients,
                price: initialState.price,
                error: false,
                building: false,
            };
        case actionTypes.SET_ERROR:
            return {
                ...initialState,
                error: true,
                building: false,
            };
        default:
            return state;
    }
}

export default reducer;