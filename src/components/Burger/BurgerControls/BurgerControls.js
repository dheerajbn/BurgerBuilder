import React from 'react';
import classes from './BurgerControls.module.css';
import BurgerControl from './BurgerControl/BurgerControl';

const controls = [
    { label: 'Cheese', type: 'cheese' },
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
];

const burgerControls = (props) => (
    <div className={classes.BurgerControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            return <BurgerControl key={ctrl.label} label={ctrl.label}
                add={() => props.addIngredient(ctrl.type)}
                remove={() => props.removeIngredient(ctrl.type)}
                disabled={props.ingredients[ctrl.type] <= 0} />
        })}
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.click}>{props.authData ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default burgerControls;