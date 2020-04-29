import React, { useEffect, Suspense } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch, Redirect } from 'react-router-dom';
import { autoSignin } from './store/actions';
import { connect } from 'react-redux';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})
const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
})
const Login = React.lazy(() => {
  return import('./containers/Login/Login');
})
const Logout = React.lazy(() => {
  return import('./containers/Logout/Logout');
})

const App = props => {

  const { isAuth, autoSignIn } = props;

  useEffect(() => {
    autoSignIn();
  }, [autoSignIn]);

  let content = <Switch>
    <Route path="/" exact component={BurgerBuilder} />
    <Route path="/login" exact render={(props) => <Login {...props}/>} />
    <Redirect to="/" />
  </Switch>

  if (isAuth) {
    content =
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props}/>} />
        <Route path="/orders" exact render={(props) => <Orders {...props}/> } />
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/login" exact render={(props) => <Login {...props}/>} />
        <Route path="/logout" exact render={(props) => <Logout {...props}/> } />
        <Redirect to="/" />
      </Switch>
  }

  return (
    <div >
      <Layout>
        <Suspense fallback={<p>Loading...</p>} >{content}</Suspense>
      </Layout>
    </div>
  );
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
