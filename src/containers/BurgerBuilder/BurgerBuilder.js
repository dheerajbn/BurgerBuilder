import React, { useState } from 'react';
import { useEffectOnce } from 'react-use';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosInstances';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';

const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false);

    const ingredients = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.price);
    const error = useSelector(state => state.burgerBuilder.error);
    const authData = useSelector(state => state.auth.authData);
    const buildingBurger = useSelector(state => state.burgerBuilder.building);

    const dispatch = useDispatch();

    const onAddIngredient = (name) => dispatch(actionCreators.addIngredient({ ingredientName: name }));
    const onRemoveIngredient = (name) => dispatch(actionCreators.removeIngredient({ ingredientName: name }));
    const onFetchIngredient = () => dispatch(actionCreators.fetchIngredients());
    const onInitPurchase = () => dispatch(actionCreators.initPurchase());
    const setRedirectPath = (path) => dispatch(actionCreators.setRedirectPath(path));


    useEffectOnce(() => {
        onFetchIngredient();
    });

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map((igKey) => {
            return ingredients[igKey];
        }).reduce((sum, el) => { return sum + el }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (authData) {
            setPurchasing(true);
        } else {
            if (buildingBurger) {
                onInitPurchase();
                setRedirectPath("/checkout");
            }
            props.history.push("/login");
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseSuccessHandler = () => {
        // alert('You purchased');
        // this.setState({ purchasing: false });

        // this.setState({ loading: true });

        // const order = {
        //     ingredients: ingredients,
        //     price: price,
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

        // for (let i in ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(ingredients[i]));
        // }

        // queryParams.push(encodeURIComponent('price') + '=' + encodeURIComponent(price));

        // const queryString = queryParams.join('&');

        onInitPurchase();
        props.history.push({
            pathname: '/checkout',
            // search: '?' + queryString
        });
    }

    let orderSummary = null;
    if (ingredients) {
        orderSummary = <OrderSummary ingredients={ingredients} price={price}
            cancel={purchaseCancelHandler} continue={purchaseSuccessHandler} />;
    }

    let burger = error ? <p>Ingredients cannot be loaded</p> : <Spinner />;

    if (ingredients) {
        burger =
            <React.Fragment>
                <Burger ingredients={ingredients} />
                <BurgerControls
                    price={price}
                    ingredients={ingredients}
                    addIngredient={onAddIngredient}
                    removeIngredient={onRemoveIngredient}
                    authData={authData}
                    purchasable={updatePurchaseState(ingredients)}
                    click={purchaseHandler} />
            </React.Fragment>
    }

    return (
        <React.Fragment>
            <Modal show={purchasing} click={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
}

export default (withErrorHandler(BurgerBuilder, axios));