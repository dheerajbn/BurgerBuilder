import React from 'react';
import { useEffectOnce } from 'react-use';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

const Logout = props => {

    useEffectOnce(() => {
        props.onLogout();
    });

    let data = <Spinner />;

    if (!props.authData) {
        data = <Redirect to="/" />;
    }

    return (
        <React.Fragment>
            {data}
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        authData: state.auth.authData != null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);