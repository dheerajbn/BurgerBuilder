import React from "react";
import { useEffectOnce } from 'react-use';
import Order from "../../components/Order/Order";
import axios from '../../axiosInstances';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

const Orders = props => {

    const { authData, onFetchOrders } = props;

    useEffectOnce(() => {
        let authId = null;
        let userId = null;
        if (authData) {
            authId = authData.idToken;
            userId = authData.localId;
        }
        onFetchOrders(authId, userId);

    });

    let data = <Spinner />
    if (!props.loading) {
        if (props.error) {
            data = <p>Couldn't retrieve orders.</p>
        } else {
            data =
                <div>
                    {props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />)}
                </div>
        }
    }

    return data;
}

const mapStateToProps = state => {
    return {
        orders: state.myOrders.orders,
        loading: state.myOrders.loading,
        error: state.myOrders.error,
        authData: state.auth.authData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (auth, userId) => dispatch(fetchOrders(auth, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));