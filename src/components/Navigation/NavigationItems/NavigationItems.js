import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import { connect } from 'react-redux';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuth ? <NavigationItem link="/orders" >Orders</NavigationItem> : null}
        {props.isAuth ? <NavigationItem link="/logout" >Logout</NavigationItem> : <NavigationItem link="/login" >Login</NavigationItem>}
    </ul>
);

const mapStateToProps = state => {
    return {
        isAuth: state.auth.authData !== null
    }
}

export default connect(mapStateToProps)(navigationItems);