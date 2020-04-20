import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
        });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancel}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continue}>PAY RS : {this.props.price.toFixed(2)}</Button>
            </Auxiliary>
        );
    }

}

export default OrderSummary;