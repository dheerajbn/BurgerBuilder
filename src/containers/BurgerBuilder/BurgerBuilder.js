import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosInstances';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onFetchIngredient();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => { return sum + el }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.authData) {
            this.setState({ purchasing: true });
        } else {
            if (this.props.buildingBurger) {
                this.props.onInitPurchase();
                this.props.setRedirectPath("/checkout");
            }
            this.props.history.push("/login");
        }
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

        // axios.post('/orders.json', order)
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

        this.props.onInitPurchase();
        this.props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        });
    }


    render() {

        let orderSummary = null;
        if (this.props.ingredients) {
            orderSummary = <OrderSummary ingredients={this.props.ingredients} price={this.props.price}
                cancel={this.purchaseCancelHandler} continue={this.purchaseSuccessHandler} />;
        }

        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

        if (this.props.ingredients) {
            burger =
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BurgerControls
                        price={this.props.price}
                        ingredients={this.props.ingredients}
                        addIngredient={this.props.onAddIngredient}
                        removeIngredient={this.props.onRemoveIngredient}
                        authData={this.props.authData}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        click={this.purchaseHandler} />
                </Auxiliary>
        }

        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} click={this.modalClosedHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.price,
        error: state.burgerBuilder.error,
        authData: state.auth.authData,
        buildingBurger: state.burgerBuilder.building,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch(actionCreators.addIngredient({ ingredientName: name })),
        onRemoveIngredient: (name) => dispatch(actionCreators.removeIngredient({ ingredientName: name })),
        onFetchIngredient: () => dispatch(actionCreators.fetchIngredients()),
        onInitPurchase: () => dispatch(actionCreators.initPurchase()),
        setRedirectPath: (path) => dispatch(actionCreators.setRedirectPath(path)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));