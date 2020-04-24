import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosInstances';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
    }

    componentDidMount() {
        // axios.get("/ingredients.json").then(res => {
        //     alert(res.data);
        //     this.setState({ ingredients: res.data });
        // }).catch(err => {
        //     this.setState({ error: true });
        // });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => { return sum + el }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseSuccessHandler = () => {
        // alert('You purchased');
        // this.setState({ purchasing: false });

        // this.setState({ loading: true });

        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.price,
        //     customer: {
        //         name: 'Nkn',
        //         address: {
        //             street: 'Nkn street',
        //             zipCode: '696969',
        //             country: 'Nkn Country',
        //         }
        //     },
        //     deliveryMethod: 'fastest',
        // };

        // axios.post('/orders.jn', order)
        //     .then(res => {
        //         this.setState({ loading: false, purchasing: false });
        //     })
        //     .catch(err => {
        //         this.setState({ loading: false });
        //     });


        // const queryParams = [];

        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }

        // queryParams.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.state.price));

        // const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        });
    }


    render() {

        let orderSummary = <OrderSummary ingredients={this.props.ingredients} price={this.props.price}
            cancel={this.purchaseCancelHandler} continue={this.purchaseSuccessHandler} />;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} click={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ingredients} />
                <BurgerControls
                    price={this.props.price}
                    ingredients={this.props.ingredients}
                    addIngredient={this.props.onAddIngredient}
                    removeIngredient={this.props.onRemoveIngredient}
                    purchasable={this.updatePurchaseState(this.props.ingredients)}
                    click={this.purchaseHandler} />
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.price,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch({ type: actionTypes.ADD_INGREDIENT, payload: { ingredientName: name } }),
        onRemoveIngredient: (name) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: { ingredientName: name } }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));