import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from '../../axiosInstances';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { fetchOrders } from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {

    componentDidMount() {
        let authId = null;
        let userId = null;
        if (this.props.authData) {
            authId = this.props.authData.idToken;
            userId = this.props.authData.localId;
        }
        this.props.onFetchOrders(authId, userId);
    }

    render() {
        let data = <Spinner />
        if (!this.props.loading) {
            if (this.props.error) {
                data = <p>Couldn't retrieve orders.</p>
            } else {
                data =
                    <div>
                        {this.props.orders.map(order => <Order key={order.id} ingredients={order.ingredients} price={+order.price} />)}
                    </div>
            }
        }

        return data;
    }
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