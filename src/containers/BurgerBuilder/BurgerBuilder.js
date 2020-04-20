import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 2,
    cheese: 1,
    bacon: 1.5,
    meat: 3.4,
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            cheese: 0,
            salad: 0,
            meat: 0,
            bacon: 0,
        },
        price: 14,
        purchasable: false,
        purchasing: false,
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => { return sum + el }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        var newCount = this.state.ingredients[type] + 1;

        var updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = newCount;

        var newPrice = INGREDIENT_PRICE[type] + this.state.price;

        this.setState({ price: newPrice, ingredients: updatedIngredients });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] > 0) {
            var newCount = this.state.ingredients[type] - 1;

            var updatedIngredients = {
                ...this.state.ingredients
            };

            updatedIngredients[type] = newCount;

            var newPrice = this.state.price - INGREDIENT_PRICE[type];

            this.setState({ price: newPrice, ingredients: updatedIngredients });

            this.updatePurchaseState(updatedIngredients);
        }
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseSuccessHandler = () => {
        alert('You purchased');
        this.setState({ purchasing: false });
    }


    render() {
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} click={this.modalClosedHandler}>
                    <OrderSummary ingredients={this.state.ingredients} price={this.state.price}
                        cancel={this.purchaseCancelHandler} continue={this.purchaseSuccessHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls
                    price={this.state.price}
                    ingredients={this.state.ingredients}
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    purchasable={this.state.purchasable}
                    click={this.purchaseHandler} />
            </Auxiliary>
        );
    }
}

export default BurgerBuilder;