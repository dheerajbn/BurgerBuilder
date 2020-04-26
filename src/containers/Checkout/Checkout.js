import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

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
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />;

        if (this.props.ingredients) {
            const purchaseFinished = this.props.purchased ? <Redirect to="/" /> : null;
            summary = <div>
                {purchaseFinished}
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />

                <Route path={this.props.match.path + '/contact-data'}
                    // render={(props) => <ContactData ingredients={this.props.ingredients} price={this.props.price} {...props} />} />
                    component={ContactData} />
            </div>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actionCreators.initPurchase()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);