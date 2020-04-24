import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { CLEAR_INGREDIENTS } from '../../store/actions';

class Checkout extends Component {

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};

    //     let price = 0;

    //     for (let param of query.entries()) {
    //         if (param[0] !== 'price') {
    //             ingredients[param[0]] = +param[1];
    //         } else {
    //             price = +param[1];
    //         }
    //     }

    //     this.setState({ ingredients: ingredients, price: price });
    // }

    checkoutCancelledHandler = () => {
        this.props.onClearIngredients();
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />

                <Route path={this.props.match.path + '/contact-data'}
                    // render={(props) => <ContactData ingredients={this.props.ingredients} price={this.props.price} {...props} />} />
                    component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearIngredients: () => dispatch({type: CLEAR_INGREDIENTS}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);