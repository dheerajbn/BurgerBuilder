import React from 'react';
import classes from './Burger.module.css';
import BurgerIngedient from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngedient key={igKey + i} type={igKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngedient type='bread-top' />
            {transformedIngredients}
            <BurgerIngedient type='bread-bottom' />
        </div>
    );
}

export default burger;