import React, { useState, useCallback } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {

    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = useCallback(() => {
        setShowSideDrawer(false);
    }, []);

    const sideDrawerOpenHandler = useCallback(() => {
        setShowSideDrawer(prevState => !prevState);
    }, []);

    return (
        <React.Fragment>
            <Toolbar open={sideDrawerOpenHandler} />
            <SideDrawer open={showSideDrawer} closed={sideDrawerClosedHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default Layout;