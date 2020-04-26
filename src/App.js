import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import { autoSignin } from './store/actions';
import { connect } from 'react-redux';

class App extends Component {

  componentWillMount() {
    this.props.autoSignIn();
  }

  render() {
    return (
      <div >
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/login" exact component={Login} />
            <Route path="/logout" exact component={Logout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    autoSignIn: () => dispatch(autoSignin()),
  }
}

export default connect(null, mapDispatchToProps)(App);
