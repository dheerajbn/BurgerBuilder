import React, { Component } from 'react';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import { autoSignin } from './store/actions';
import { connect } from 'react-redux';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})
const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})
const asyncLogin = asyncComponent(() => {
  return import('./containers/Login/Login');
})
const asyncLogout = asyncComponent(() => {
  return import('./containers/Logout/Logout');
})

class App extends Component {

  componentWillMount() {
    this.props.autoSignIn();
  }

  render() {

    let props = <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/login" exact component={asyncLogin} />
      <Redirect to="/" />
    </Switch>

    if (this.props.isAuth) {
      props =
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" exact component={asyncOrders} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/login" exact component={asyncLogin} />
          <Route path="/logout" exact component={asyncLogout} />
          <Redirect to="/" />
        </Switch>
    }

    return (
      <div >
        <Layout>
          {props}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.authData != null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoSignIn: () => dispatch(autoSignin()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
