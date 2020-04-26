import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router';

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        let data = <Spinner />;

        if (!this.props.authData) {
            data = <Redirect to="/" />;
        }

        return (
            <React.Fragment>
                {data}
            </React.Fragment>
        );
    }
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