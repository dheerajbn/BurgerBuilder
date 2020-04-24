import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        cheese: 0,
        salad: 0,
        meat: 0,
        bacon: 0,
    },
    price: 14,
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
                }
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                price: state.price - INGREDIENT_PRICE[action.payload.ingredientName],
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1,
                }
            };
        case actionTypes.CLEAR_INGREDIENTS:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}

export default reducer;