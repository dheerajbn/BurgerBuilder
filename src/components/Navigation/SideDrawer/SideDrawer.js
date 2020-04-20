import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

const sideDrawer = (props) => {

    let attachClasses = [classes.SideDrawer, classes.Close];

    if (props.open) {
        attachClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <Auxiliary>
            <Backdrop show={props.open} click={props.closed} />
            <div className={attachClasses.join(' ')}>
                <div style={{ height: '11%', marginBottom: '32px' }}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Auxiliary>

    );

};

export default sideDrawer;