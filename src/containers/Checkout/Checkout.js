import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

const Checkout = props => {

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

    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />;

    if (props.ingredients) {
        const purchaseFinished = props.purchased ? <Redirect to="/" /> : null;
        summary = <div>
            {purchaseFinished}
            <CheckoutSummary
                ingredients={props.ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler} />

            <Route path={props.match.path + '/contact-data'}
                // render={(props) => <ContactData ingredients={this.props.ingredients} price={this.props.price} {...props} />} />
                component={ContactData} />
        </div>
    }
    return summary;

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